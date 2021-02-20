import React, {useState}  from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Background from '../Images/Background2.svg';
import imgPerfil from '../Images/Perfil.jpg';
import '../Styles/EditarUtilizador.css';
import { createNovoUtilizador } from '../Store/Utilizadores/Actions';

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
    background-image: url(${imgPerfil});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: solid 3px #227093;
`;

function EditarUtilizador (props) {

    const { user, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const [valores, setValores] = useState({
        imagemUser: '',
        nomeUtilizador: '',
        biografia: '',
        pais: 'Portugal',
        cidade: 'Porto',
    });

    if(isLoading) {
        return (
            <div className="row col-12 justify-content-center bgWhite">
                <h1>loading</h1>
            </div>
        )
    }

    const handleChange = tipo => conteudo => {
        valores[tipo] = conteudo.target.value;
        setValores({...valores});
    };

    const onCreateNovoUtilizador = (nomeUtilizador, biografia, pais, cidade) => 
        dispatch(createNovoUtilizador(nomeUtilizador, biografia, pais, cidade))

    return(
        <Fundo>
            <Div>
                {console.log(valores)}
                <section className="m-0 p-0 w-100">
                    <ProfilePicture/>
                </section>
                <section className="row col-12 m-0 p-0 w-100">
                    <span className="col-12 m-0 mb-2 p-0">
                        <span className="nomeForm">Nome</span>
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
                        <span className="nomeForm">Pais</span>
                        <select 
                            className="form-control forms mb-3" 
                            type="text" aria-label="pais"
                            onChange={handleChange('pais')}>
                                <option>batata</option>
                        </select>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Cidade</span>
                        <select 
                            className="form-control forms mb-3" 
                            type="text" aria-label="cidade"
                            onChange={handleChange('cidade')}>
                                <option>batata</option>
                        </select>
                    </span>
                    <span className="col-12 text-center mb-2 m-0 p-0">
                        <button 
                            className="botaoSubmeter mt-4"
                            onClick={() => onCreateNovoUtilizador(valores.nomeUtilizador, valores.biografia, valores.pais, valores.cidade)} 
                            >Confirmar</button>
                    </span>
                </section>
            </Div>
        </Fundo>
    )
}

export default EditarUtilizador;