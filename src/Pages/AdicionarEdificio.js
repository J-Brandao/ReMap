import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import '../Styles/AdicionarEdificio.css';
import { useDispatch, useSelector } from 'react-redux';
import AdicionarImagem from '../Images/GaleriaImagens.svg'
import BackArrow from '../Components/Geral/BackArrow';
import { createNovoEdificio, getEdificioList } from '../Store/Edificios/Actions';
import { storage } from '../Firebase/FbConfig';
import { useHistory } from 'react-router-dom';
import Loading from '../Components/Geral/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthentication from '../Firebase/useAuthentication';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import ModalEdificioNovo from "../Components/Modal/ModalEdificioNovo";
import ModalEdificioCoordenadas from '../Components/Modal/ModalEdificioCoordenadas'

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

function AdicionarEdificio (props) {

    const { user, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const history = useHistory();   
    const EdificioList = useSelector(({ Edificios }) => Edificios.data);
    const isLoadingEdificio = useSelector(({ Edificios }) => Edificios.isLoading);
    const [imagem, setImagem] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalVer, setShowModalVer] = useState(false);
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

    useEffect(() => {
        if(!props.location.state){
            setShowModalVer(true)
        } else {
            dispatch(getEdificioList())
            valores.localizacao = props.location.state.localizacao;
            setValores({...valores})
        }
    }, [])
    useEffect(() => {
        if(EdificioList) {
            EdificioList.map(edificio => {
                if(edificio.localizacao[0] === valores.localizacao[0] && edificio.localizacao[1] === valores.localizacao[1]){
                    setShowModalVer(true)
                }
            })
        }
    }, [EdificioList])

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
                valores[tipo] = [...valores[tipo], conteudo.target.files[0]]
                setValores({...valores});
            }
        }
    };

    const onCreateFavEdificio = (userId, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo) => {

        let arrayNomes = [];

        //Cria data
        let date = new Date();
        let newDate = new Date(date.toDateString());
        let dia  = newDate.getDate().toString();
        let diaF = (dia.length == 1) ? '0'+dia : dia;
        let mes  = (newDate.getMonth()+1).toString();
        let mesF = (mes.length == 1) ? '0'+mes : mes;
        let anoF = newDate.getFullYear();
        let dataFinal = `${diaF}/${mesF}/${anoF}`;
        
        //Cria nome único para a imagem
        fotos.map(imagem => {
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
        dispatch(createNovoEdificio(userId, dataFinal, nomeEdificio, descricao, arrayNomes, localizacao, degradacao, acesso, seguranca, vandalismo));
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
        history.push("/homepage")
    }
    const closeModalVer = () => {
        setShowModalVer(false)
        history.push("/homepage")
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
                            onChange={handleChange('nomeEdificio')}/>
                    </span>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Descrição do edifício<span className="obrigatorio">*</span></span>
                        <textarea 
                            className="form-control forms mb-3" 
                            rows="4" 
                            type="text" 
                            aria-label="Search" 
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
                        <MapContainer center={valores.localizacao !=='' ? [valores.localizacao[0], valores.localizacao[1]] : [0, 0]} zoom={15}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[valores.localizacao[0], valores.localizacao[1]]}></Marker>
                        </MapContainer>
                    </div>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Estado do edifício<span className="obrigatorio">*</span></span>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Degradação</span>
                            <input className="bar mb-2 w-100" type="range" min="0" max="5" step="1" aria-label="Search" onChange={handleChange('degradacao')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Acesso</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" aria-label="Search" onChange={handleChange('acesso')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Segurança</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" aria-label="Search" onChange={handleChange('seguranca')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Vandalismo</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" aria-label="Search" onChange={handleChange('vandalismo')}/>
                        </div>
                    </span>
                </form>
                <span className="col-12 text-right m-0 p-0">
                    {valores.nomeEdificio !== '' && valores.descricao !== '' && valores.localizacao !== '' && valores.fotos.length > 0 ?
                        <button 
                            className="botaoSubmeter mt-4" 
                            onClick={() => onCreateFavEdificio(props.location.state.id, valores.nomeEdificio, valores.descricao, valores.fotos, valores.localizacao, valores.degradacao, valores.acesso, valores.seguranca, valores.vandalismo)}
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
            <ModalEdificioNovo show={showModal} onHide={closeModal} />
            <ModalEdificioCoordenadas show={showModalVer} onHide={closeModalVer} />
        </>
    )
}

export default AdicionarEdificio