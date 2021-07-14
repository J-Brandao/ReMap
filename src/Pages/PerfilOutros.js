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
import { getUtilizadorForPerfil, getUtilizadorById } from '../Store/Utilizadores/Actions';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Components/Geral/Loading';
import { storage } from '../Firebase/FbConfig';
import FriendButton from '../Components/Geral/FriendButton';
import useAuthentication from '../Firebase/useAuthentication'; 
import {Link} from "react-router-dom";
import Architect from '../Images/architect.svg';
import Scroll from '../Images/scroll.svg';
import Photographer from '../Images/photographer.svg';


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

const BackgroundDiv2 = styled.div`
    margin: auto 0 auto auto;
    bottom: 35%;
    right: 15%;
    border-radius: 50%;
    min-height: 55px;
    width: 55px;
    line-height: 55px;
    position: absolute;
`;

function PerfilOutros(props) {

    const { user, isLoading, isAuthenticated } = useAuth0();
    const [imagem, setImagem] = useState(null)
    const utilizador = useSelector(({ Utilizadores }) => Utilizadores.user)
    const isLoadingSelf = useSelector(({ Utilizadores }) => Utilizadores.isLoadingSelf)
    const ownUser = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const dispatch = useDispatch();

    useEffect(() => {
        setImagem(null)
        dispatch(getUtilizadorForPerfil(props.match.params.id))    

        if (Object.keys(ownUser).length === 0) {
            if (!isLoading && user) {
                dispatch(getUtilizadorById(user.email))
            }
        } 
    }, [isLoading])
    useAuthentication()
    useEffect(() => {
        if (utilizador && !isLoading && isAuthenticated) {
            storage.ref('imagensUtilizadores').child(`${utilizador.imagemUser}`).getDownloadURL().then((url) => {
                setImagem(url)
            })
        }
        
    },[utilizador])
    
    if (isLoading || isLoadingSelf) {
        return (
            <Loading/>
        )
    }
    
    return(
        <Div>
           <section className="row col-12 m-0 p-0">
                <BackArrow isGoingBack={true}/>
                <div className="col-8 text-center m-0 p-0">
                    <span className="m-0 p-0">
                        <ProfilePicture style={{backgroundImage:`url(${imagem !== null ? imagem : Placeholder})`}}/>
                        <BackgroundDiv2 style={utilizador.equipa === "Arquitetos" ? {backgroundColor: "#CCE6C1"} : utilizador.equipa === "Historiadores" ? {backgroundColor: "#F8A46F"} : {backgroundColor: "#92d1df"}}>
                            <img className="m-auto" style={{height:`35px`}} src={utilizador.equipa === "Arquitetos" ? Architect : utilizador.equipa === "Historiadores" ? Scroll : Photographer}/>
                        </BackgroundDiv2>
                    </span>
                    <h5 id="NomeUser">{utilizador.nomeUtilizador}</h5>  
                    <p id="DataUser">{utilizador.active ? "Membro desde 2020" : "Inativo"}</p>
                </div>
                <span className="col-2 text-right m-0 p-0">
                    <FriendButton friendId={utilizador.id} userId={ownUser.id} friendName={utilizador.nomeUtilizador} imageFriend={utilizador.imagemUser} ownUser={ownUser}/>
                </span>
           </section>
           <section className="row col-12 m-0 p-0">
                <h5 id="seccaoTitulo" className="col-12 px-0">Biografia</h5>
                {utilizador.biografia === '' ? 
                    <p id="biografiaTexto" className="col-12 px-0">Este utilizador ainda não acrescentou biografia.</p>
                    :
                    <p id="biografiaTexto" className="col-12 px-0">{utilizador.biografia}</p>
                }
           </section>

            <Link style={{textDecoration: 'none', color:'#34495e'}} to={`/gamehub/${utilizador.id}`}>
            <Trofeus />
            </Link>

            <Interacoes userId={utilizador.id} urlId={props.match.params.id}/>
        </Div>
    )
}

export default PerfilOutros;