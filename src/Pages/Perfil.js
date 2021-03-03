import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../Styles/Perfil.css'
import Placeholder from '../Images/Placeholder.jpg';
import More from '../Images/More.svg';
import Trofeus from '../Components/Perfil/Trofeus';
import Interacoes from '../Components/Perfil/Interacoes';
import BackArrow from '../Components/Geral/BackArrow';
import { useSelector, useDispatch } from 'react-redux';
import { getUtilizadorById, atualizaUtilizador } from '../Store/Utilizadores/Actions';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Components/Geral/Loading';
import { storage } from '../Firebase/FbConfig';
import { useHistory } from "react-router-dom"
import ModalEliminarPerfil from "../Components/Modal/ModalEliminarPerfil"
import useAuthentication from "../Firebase/useAuthentication"

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

const Button = styled.button`
background: none;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    width:100%;
:focus{
    outline:0;
    boder:none
}
`
const ButtonOptions = styled.button`
background: none;
	border: none;
	padding:10px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    width:130px;
    text-align:left;
   :focus{
        background-color: ${props => props.eliminar ? "rgba(255,0,0, 0.3)" : "none"}
        outline:0;
   }
`
const DropDown = styled.div`
border:2px solid #ffa801;
text-align:left;
padding:0;
min-width:120px;
position:absolute;
background-color:white;
right:0;
z-index:5000;
`
const Line = styled.hr`
color:#ffa801;
margin:0;

`

function Perfil(props) {


    const [showModal, setShowModal] = useState(false);
    const { user, isLoading, isAuthenticated, logout } = useAuth0();
    const [imagem, setImagem] = useState(null)
    const [showDropdown, setShowDropDown] = useState(false);
    const utilizador = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const isLoadingUtilizador = useSelector(({Utilizadores})=> Utilizadores.isLoadingSelf)
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        if (user && !isLoading && isAuthenticated) {
            dispatch(getUtilizadorById(user.email))
        } 
    },[user])
    useEffect(() => {
        if (utilizador && !isLoading && isAuthenticated) {
            storage.ref('imagensUtilizadores').child(`${utilizador.imagemUser}`).getDownloadURL().then((url) => {
                setImagem(url)
            })
        }  
    },[utilizador])
    useAuthentication();
    
    
    if(isLoading || isLoadingUtilizador) {
        return (
            <Loading/>
        )
    }

    const showMenu = () => {
        setShowDropDown(!showDropdown);
    }
    const _logout = () => {
        logout();
        setShowDropDown(false);
    }

    const _editProfile = () => {
        setShowDropDown(false);
        history.push("/editar");

    }
    const handleShow = () => {
        setShowModal(true);
        setShowDropDown(false);
    }

    const handleClose = () => {
        console.log("fechar")
        setShowModal(false);

    }

    const deleteProfile = () => {
        setShowModal(false);
        dispatch(atualizaUtilizador(utilizador.id, utilizador.userId, utilizador.imagemUser, utilizador.nomeUtilizador, utilizador.biografia, utilizador.pais, utilizador.cidade, utilizador.role, false))
        logout();
    }
    
    const renderOptions = () => {
        if(showDropdown)
        return (
            <DropDown >
                        
                <ButtonOptions onClick={_editProfile}>Editar perfil</ButtonOptions>
                <Line/>
                <ButtonOptions onClick={_logout}>Logout</ButtonOptions>
                <Line />
                <ButtonOptions onClick={handleShow} eliminar> Eliminar conta </ButtonOptions>
                            
        
            </DropDown>
        )
    }

    return (
        <>
        <Div>
           <section className="row col-12 m-0 p-0">
                <BackArrow isGoingBack={true}/>
                <div className="col-8 text-center m-0 p-0">
                    <ProfilePicture style={{backgroundImage:`url(${imagem !== null ? imagem : Placeholder})`}}/>
                    <h5 id="NomeUser">{utilizador.nomeUtilizador}</h5>  
                    <p id="DataUser">Membro desde 2021</p>
                </div>
                <span className="col-2 text-right m-0 p-0">
                    <Button onClick={showMenu}>
                        <img className="m-0" src={More} alt="Mais opções" />
                    </Button>
                    {renderOptions()}
                    
                        
                    
                </span>
           </section>
           <section className="row col-12 m-0 p-0">
                <h5 id="seccaoTitulo" className="col-12 px-0">Biografia</h5>
                <p id="biografiaTexto" className="col-12 px-0">{utilizador.biografia}</p>
           </section>

           <Trofeus/>

           <Interacoes userId={utilizador.id} urlId={props.location.state.id}/>
            </Div>
            
            <ModalEliminarPerfil show={showModal} onHide={handleClose} onDelete={deleteProfile}/>
        </>
    )
}

export default Perfil;