import React, {useState}  from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Background from '../Images/Background2.svg';
import imgPlaceholder from '../Images/Placeholder.jpg';
import '../Styles/EditarUtilizador.css';
import { createNovoUtilizador } from '../Store/Utilizadores/Actions';
import { storage } from '../Firebase/FbConfig';
import Loading from '../Components/Geral/Loading';
import useAuthentication from '../Firebase/useAuthentication';

const TiposAceites = 'image/x-png, image/png, image/jpg, image/jpeg';
const arrayTiposAceites = TiposAceites.split(",").map((item) => {
    return item.trim()
});

const Fundo = styled.div`
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: 100% auto;
    margin: 0;
    padding: 0;
`;

const Div = styled.div`
    padding: 40px 30px 0 30px;
`;

const ProfilePicture = styled.div`
    margin: 0 auto 50px auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: solid 3px #227093;
`;

function EditarUtilizador () {

    const { user, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const [valores, setValores] = useState({
        imagemUser: '',
        nomeUtilizador: '',
        biografia: '',
        pais: 'Portugal',
        cidade: 'Porto',
    });
    const [imagem, setImagem] = useState(null)

    const verificarFicheiro = (file) => {
        if (file.type && !arrayTiposAceites.includes(file.type)) {
            alert("Este ficheiro não é permitido. Por favor seleciona uma imagem.");
            return false
        } else {
            return true
        }
    };

    const handleChange = tipo => conteudo => {
        if (tipo !== 'imagemUser') {
            valores[tipo] = conteudo.target.value;
            setValores({...valores});
        } else {
            const verificar = verificarFicheiro(conteudo.target.files[0]);
            if (verificar){
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    setImagem(reader.result);
                }, false);
                reader.readAsDataURL(conteudo.target.files[0]);
                valores[tipo] = conteudo.target.files[0];
                setValores({...valores});
            }
        }
    };

    const onCreateNovoUtilizador = (userID, imagemUser, nomeUtilizador, biografia, pais, cidade) => {

        let date = new Date();
        let timestamp = date.getTime();
        let newName = imagemUser.name + "_imagem_" + timestamp;

        dispatch(createNovoUtilizador(userID, newName, nomeUtilizador, biografia, pais, cidade));

        const uploadTask = storage.ref(`imagensUtilizadores/${newName}`).put(imagemUser);
        uploadTask.on(
        "state_changed",
        snapshot => {
        },
        error => {
            console.log(error);
        });
    }

    useAuthentication()

    if(isLoading) {
        return (
            <Loading/>
        )
    }

    return(
        <Fundo>
            <Div>
                <section className="m-0 p-0 w-100">
                    <label for="imgPerfil" className="imagemPerfil mb-0"><ProfilePicture style={{backgroundImage: `url(${imagem ? imagem : imgPlaceholder})`}}/></label>
                    <input className="form-control" id="imgPerfil" type="file" aria-label="Search" onChange={handleChange('imagemUser')}/>
                </section>
                <section className="row col-12 m-0 p-0 w-100">
                    <span className="col-12 m-0 mb-2 p-0">
                        <span className="nomeForm">Nome<span className="obrigatorio">*</span></span>
                        <input 
                            className="form-control forms mb-3" 
                            type="text" aria-label="name" 
                            onChange={handleChange('nomeUtilizador')}/>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Biografia</span>
                        <textarea 
                            className="form-control forms mb-3" 
                            type="text" aria-label="biografia"
                            onChange={handleChange('biografia')}/>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Pais<span className="obrigatorio">*</span></span>
                        <select 
                            className="form-control forms mb-3" 
                            type="text" aria-label="pais"
                            onChange={handleChange('pais')}>
                                <option>batata</option>
                        </select>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Cidade<span className="obrigatorio">*</span></span>
                        <select 
                            className="form-control forms mb-3" 
                            type="text" aria-label="cidade"
                            onChange={handleChange('cidade')}>
                                <option>batata</option>
                        </select>
                    </span>
                    <span className="col-12 text-center mb-2 m-0 p-0">
                        {
                            valores.nomeUtilizador !== '' && valores.cidade !== '' && valores.pais !== '' ?
                            <button 
                            className="botaoSubmeter mt-4"
                            onClick={() => onCreateNovoUtilizador(user.sub, valores.imagemUser, valores.nomeUtilizador, valores.biografia, valores.pais, valores.cidade)} 
                            >Confirmar</button>
                            :
                            <button 
                            className="botaoSubmeterDisabled mt-4"
                            disabled>Confirmar</button>

                        }     
                    </span>
                </section>
            </Div>
        </Fundo>
    )
}

export default EditarUtilizador;