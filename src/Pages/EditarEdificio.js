import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import '../Styles/AdicionarEdificio.css';
import { useDispatch, useSelector } from 'react-redux';
import AdicionarImagem from '../Images/GaleriaImagens.svg'
import BackArrow from '../Components/Geral/BackArrow';
import { getEdificio, atualizaEdificio } from '../Store/Edificios/Actions';
import { storage } from '../Firebase/FbConfig';
import { useHistory } from 'react-router-dom';
import Loading from '../Components/Geral/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthentication from '../Firebase/useAuthentication';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import ModalEditarEdificio from '../Components/Modal/ModalEditarEdificio';

const TiposAceites = 'image/x-png, image/png, image/jpg, image/jpeg';
const arrayTiposAceites = TiposAceites.split(",").map((item) => {
    return item.trim()
});

const Div = styled.div`
    margin: 40px 30px 40px 30px;
`;

const Imagem = styled.div`
    height: 175px;
    width: 100%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

function EditarEdificio (props) {

    const { user, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const history = useHistory();   
    const edificio = useSelector(({ Edificios }) => Edificios.dataSingle);
    const isLoadingEdificio = useSelector(({ Edificios }) => Edificios.isLoadingSingle);
    const [imagem, setImagem] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [valores, setValores] = useState({
        nomeEdificio: '',
        descricao: '',
        fotos: [],
        localizacao: '',
        degradacao: '5',
        acesso: '5',
        seguranca: '5',
        vandalismo: '5'
    });
    const [novasImagens, setNovasImagens] = useState([])

    useEffect(() => {
        dispatch(getEdificio(props.match.params.id));
    }, [])
    useEffect(() => {
        if(!isLoadingEdificio){
            setValores({
                nomeEdificio: edificio.nomeEdificio,
                descricao: edificio.descricao,
                fotos: edificio.fotos,
                localizacao: edificio.localizacao,
                degradacao: edificio.degradacao,
                acesso: edificio.acesso,
                seguranca: edificio.seguranca,
                vandalismo: edificio.vandalismo
            })
            edificio.fotos.map((item, key) => {
                if (imagem.length < edificio.fotos.length) {
                    storage.ref('imagensEdificios').child(`${item}`).getDownloadURL().then((url) => {
                        const newArray = imagem;
                        newArray.push(url)
                        setImagem(newArray)
                    })
                }
            })
        }
    }, [isLoadingEdificio])

    const verificarFicheiro = (file) => {
        if (file.type && !arrayTiposAceites.includes(file.type)) {
            alert("Este ficheiro não é permitido. Por favor seleciona uma imagem.");
            return false
        } else {
            return true
        }
    };

    const handleChange = tipo => conteudo => {
        if (tipo !== 'fotos') {
            valores[tipo] = conteudo.target.value;
            setValores({...valores});
        } else {
            const verificar = verificarFicheiro(conteudo.target.files[0]);
            if (verificar){
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    setImagem([...imagem, reader.result]);
                }, false);
                reader.readAsDataURL(conteudo.target.files[0]);
                setNovasImagens([...novasImagens, conteudo.target.files[0]]);
            }
        }
    };

    const onAtualizaEdificio = (edificioId, userId, data, nomeEdificio, descricao, fotos, novasImagens, localizacao, degradacao, acesso, seguranca, vandalismo) => {

        let arrayNomes = [...valores.fotos];

        //Cria data
        let date = new Date();
        
        //Cria nome único para a imagem
        novasImagens.map(imagem => {
            let timestamp = date.getTime();
            let newName = imagem.name + "_imagem_" + timestamp;
            arrayNomes.push(newName);
            
            //Guarda a imagem na storage
            const uploadTask = storage.ref(`imagensEdificios/${newName}`).put(imagem);
            uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            });
        }) 

        //Envia Informação para a firebase
        dispatch(atualizaEdificio(edificioId, userId, data, nomeEdificio, descricao, arrayNomes, localizacao, degradacao, acesso, seguranca, vandalismo));
        setShowModal(true);
    }

    const onClose = () => {
        setShowModal(false);
        history.push({
            pathname: `/homepage`,
            });
    }


    useAuthentication();

    if(isLoading || isLoadingEdificio) {
        return(
            <Loading/>
        )
    }

    return (
        <>
        <Div>
            <section className="row col-12 m-0 p-0">
                <BackArrow isGoingBack={true}/>
                <span className="col-10 tituloPagina offset-2 text-center m-0 p-0">
                    Adicionar novo edifício
                </span>
            </section>
            <section className="row col-12 m-0 p-0">
                <form className="col-12 w-0 p-0">
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Identificação do edifício<span className="obrigatorio">*</span></span>
                        <input 
                            className="form-control forms mb-3" 
                            type="text" aria-label="Search" 
                            defaultValue={valores.nomeEdificio}
                            onChange={handleChange('nomeEdificio')}/>
                    </span>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Descrição do edifício<span className="obrigatorio">*</span></span>
                        <textarea 
                            className="form-control forms mb-3" 
                            rows="4" 
                            type="text" 
                            aria-label="Search" 
                            defaultValue={valores.descricao}
                            onChange={handleChange('descricao')}/>
                    </span>
                    {valores.fotos !== '' ?
                        <span className="col-12 m-0 p-0">
                            <span className="seccaoTitulo">Galeria de fotos<span className="obrigatorio">*</span></span>
                            {imagem.map(item => {
                                return(
                                    <Imagem className="m-0 mb-3 mt-1 p-0" style={{backgroundImage: `url(${item})`}}/>
                                )
                            })}
                            <label for="galeriaImgs" className="seccaoTitulo formsImagem"><img src={AdicionarImagem} className="mb-0"/></label>
                            <input className="form-control" id="galeriaImgs" type="file" aria-label="Search" onChange={handleChange('fotos')}/>
                        </span>
                            :
                        <span className="col-12 m-0 p-0">
                            <span className="seccaoTitulo">Galeria de fotos<span className="obrigatorio">*</span></span>                        
                            <label for="galeriaImgs" className="seccaoTitulo formsImagem mb-3"><img src={AdicionarImagem} className="mb-0"/></label>
                            <input className="form-control" id="galeriaImgs" type="file" aria-label="Search" onChange={handleChange('fotos')}/>
                        </span>
                    }
                    <div className="col-12 m-0 mb-5 p-0" style={{width: '100%', height: '175px'}}>
                        <span className="seccaoTitulo">Localização do edifício</span>
                        {valores.localizacao !=='' ?
                            <MapContainer center={valores.localizacao !=='' ? [valores.localizacao[0], valores.localizacao[1]] : [0, 0]} zoom={15}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[valores.localizacao[0], valores.localizacao[1]]}></Marker>
                            </MapContainer>
                        :
                        <></>
                        }
                    </div>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Estado do edifício<span className="obrigatorio">*</span></span>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Degradação</span>
                            <input className="bar mb-2 w-100" type="range" min="0" max="5" step="1" defaultValue={valores.degradacao} aria-label="Search" onChange={handleChange('degradacao')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Acesso</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" defaultValue={valores.acesso} aria-label="Search" onChange={handleChange('acesso')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Segurança</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" defaultValue={valores.seguranca} aria-label="Search" onChange={handleChange('seguranca')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Vandalismo</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" defaultValue={valores.vandalismo} aria-label="Search" onChange={handleChange('vandalismo')}/>
                        </div>
                    </span>
                </form>
                <span className="col-12 text-right m-0 p-0">
                    {valores.nomeEdificio !== '' && valores.descricao !== '' && valores.localizacao !== '' && valores.fotos.length > 0 ?
                        <button 
                            className="botaoSubmeter mt-4" 
                            onClick={() => onAtualizaEdificio(props.match.params.id, edificio.userId, edificio.date, valores.nomeEdificio, valores.descricao, valores.fotos, novasImagens, valores.localizacao, valores.degradacao, valores.acesso, valores.seguranca, valores.vandalismo)}
                            >Submeter</button>
                        :
                        <button 
                            className="botaoSubmeterDisabled mt-4" 
                            disabled
                            >Submeter</button>
                    }
                </span>
            </section>
            <style>
                {`
                .leaflet-container {
                    height: 175px;
                    width: 100%;
                    display: block;
                  }
                `}
            </style>
            </Div>
            <ModalEditarEdificio show={showModal} onHide={onClose}/>
        </>
    )
}

export default EditarEdificio