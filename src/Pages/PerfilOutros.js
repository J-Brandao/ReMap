import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../Styles/Perfil.css'
import IconeAmigo from '../Images/IconeAmigo.svg';
import Placeholder from '../Images/Placeholder.jpg';
import More from '../Images/More.svg';
import Trofeus from '../Components/Perfil/Trofeus';
import Interacoes from '../Components/Perfil/Interacoes';
import BackArrow from '../Components/Geral/BackArrow';
import { useSelector, useDispatch } from 'react-redux';
import { getUtilizadorForPerfil } from '../Store/Utilizadores/Actions';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Components/Geral/Loading';
import { storage } from '../Firebase/FbConfig';

const Div = styled.div`
    margin: 40px 30px 40px 30px;
`;

const ProfilePicture = styled.div`
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 125px;
    width: 125px;
    border-radius: 50%;
    border: solid 3px #ffa801;
`;

function PerfilOutros(props) {

    const { user, isLoading, isAuthenticated } = useAuth0();
    const [imagem, setImagem] = useState(null)
    const utilizador = useSelector(({Utilizadores})=> Utilizadores.user)
    const dispatch = useDispatch();

    useEffect(() => {
        setImagem(null)
        dispatch(getUtilizadorForPerfil(props.match.params.id))    
    }, [])
    useEffect(() => {
        if (utilizador && !isLoading && isAuthenticated) {
            storage.ref('imagensUtilizadores').child(`${utilizador.imagemUser}`).getDownloadURL().then((url) => {
                setImagem(url)
            })
        }
        
    },[utilizador])
    
    if(isLoading) {
        return (
            <Loading/>
        )
    }

    return(
        <Div>
           <section className="row col-12 m-0 p-0">
                <BackArrow />
                <div className="col-8 text-center m-0 p-0">
                    <ProfilePicture style={{backgroundImage:`url(${imagem !== null ? imagem : Placeholder})`}}/>
                    <h5 id="NomeUser">{utilizador.nomeUtilizador}</h5>  
                    <p id="DataUser">Membro desde 2021</p>
                </div>
                <span className="col-2 text-right m-0 p-0">
                    <img src={user.email === utilizador.userId ? More : IconeAmigo}/>
                </span>
           </section>
           <section className="row col-12 m-0 p-0">
                <h5 id="seccaoTitulo" className="col-12 px-0">Biografia</h5>
                <p id="biografiaTexto" className="col-12 px-0">{utilizador.biografia}</p>
           </section>

           <Trofeus/>

            <Interacoes userId={utilizador.id}/>
        </Div>
    )
}

export default PerfilOutros;