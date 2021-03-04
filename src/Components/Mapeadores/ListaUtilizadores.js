import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../Styles/Mapeadores.css';
import Placeholder from '../../Images/Placeholder.jpg';
import AdicionarAmigo from '../../Images/AdicionarAmigo.svg';
import {ProgressBar} from 'react-bootstrap';
import { storage } from '../../Firebase/FbConfig';
import { useSelector, useDispatch } from 'react-redux'
import FriendButton from '../Geral/FriendButton';
import { Link } from 'react-router-dom';
import useAuthentication from '../../Firebase/useAuthentication';
import More from '../../Images/More.svg';
import {atualizaUtilizador} from '../../Store/Utilizadores/Actions'




const ProfilePicture = styled.div`
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    min-height: 70px;
    width: 70px;
`;

const UserCard = styled.div`
margin: 20px 0 0 0;
`

const Self = styled.span`
font-size:0.65rem;
color: #555`

const Button = styled.button`
background: none;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    width:75%;
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
    height:70px;
    text-align:left;
   :focus{
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



function ListaUtilizadores(props) {

    const dispatch = useDispatch()
    const [imagem, setImagem] = useState(null);
    const [showDropdown, setShowDropDown] = useState(false);
    const isLoadingEdicao = useSelector(({Utilizadores})=>Utilizadores.isLoadingEdit) 

   

    useEffect(() => {
        if(props.user.imagemUser){
            storage.ref('imagensUtilizadores').child(`${props.user.imagemUser}`).getDownloadURL().then((url) => {
                if (imagem === null) {
                    setImagem(url)
                }
            })
        }
    }, [])
    useAuthentication()
    
    const showMenu = () => {
        setShowDropDown(!showDropdown);
    }

    const FriendCard=()=> {
        return (
            <span className="row col-12 m-0 mt-3 p-0 divUtilizador">
            <div className="col-3 p-0">
                <ProfilePicture style={{backgroundImage: `url(${imagem !== null ? imagem : Placeholder})`}}/>
            </div>
            <div className="col-9 pr-0">
                <span>
                        <p className="nomeUtilizador mb-0 pb-0">{props.user.nomeFriend}</p>
                </span>
                <span className="col-12 row m-0 p-0 divUtilizador">
                    <span className="col-9 m-0 pr-1 pl-0">
                        <ProgressBar now={60} variant="custom"/>
                    </span>
                    <span className="col-3 m-0 p-0">
                        <p className="nivelUtilizador mb-0 pb-0">niv. 14</p>
                    </span>
                </span>
            </div>
        </span>
        )
    }
    
    const AllCard = () => {
        
        return (
         
            <span className="row col-12 m-0 mt-3 p-0 divUtilizador">
                {console.log(props.user.role)}
            <div className="col-3 p-0">
                <ProfilePicture style={{backgroundImage: `url(${imagem !== null ? imagem : Placeholder})`}}/>
            </div>
            <div className="col-9 pr-0">
                <Link  to={`/mapeador/${props.user.id}`}>
                    <p className="nomeUtilizador mb-0 pb-0">{props.user.nomeUtilizador}</p>
                    </Link>  
                <span className="col-12 row m-0 p-0 divUtilizador">
                    <span className={props.ownUser.role==="admin"?"col-5 m-0 pr-1 pl-0":"col-7 m-0 pr-1 pl-0"}>
                        <ProgressBar now={60} variant="custom"/>
                    </span>
                        <span className="col-3 m-0 p-0">
                            <p className="nivelUtilizador mb-0 pb-0">niv. 14</p>
                            
                        </span>
                        
                            <span className="col-2 m-0 p-0 text-center">
                            <FriendButton friendId={props.user.id} userId={props.ownUser.id} friendName={props.user.nomeUtilizador} imageFriend={props.user.imagemUser} /></span>
                            {props.ownUser.role === "admin" &&
                            <span className="col-2 m-0 p-0">
                            
                                <><Button onClick={showMenu}>
                                <img className="m-0 w-100" src={More} alt="Mais opções" />
                                </Button>
                                {renderOptions()}</>
                            
                            
                            </span>
                            } 
                             
                    
                    
                    
                </span>
            </div>
        </span>
           
            
        )
    }
    
    const updateRole = (newRole) => {
        dispatch(atualizaUtilizador(props.user.id, props.user.userId, props.user.imagemUser, props.user.nomeUtilizador, props.user.biografia, props.user.pais, props.user.cidade, newRole))
    }

    const renderOptions = () => {
        if(showDropdown)
        return (
            <DropDown >
                {props.user.role === "admin" ?
                    <ButtonOptions onClick={()=>updateRole("normal")}>Demover utilizador</ButtonOptions>
                
            :
                    <ButtonOptions onClick={()=>updateRole("admin")}>Promover a administrador</ButtonOptions>
            }   
                
                            
        
            </DropDown>
        )
    }
    
    const OwnCard = () => {
        return (
            <span className="row col-12 m-0 mt-3 p-0 divUtilizador">
            <div className="col-3 p-0">
                <ProfilePicture style={{backgroundImage: `url(${imagem !== null ? imagem : Placeholder})`}}/>
            </div>
            <div className="col-9 pr-0">
                <span>
                    <p className="nomeUtilizador mb-0 pb-0">{props.user.nomeUtilizador} <Self>Eu!</Self></p>
                </span>
                <span className="col-12 row m-0 p-0 divUtilizador">
                    <span className="col-9 m-0 pr-1 pl-0">
                        <ProgressBar now={60} variant="custom"/>
                    </span>
                    <span className="col-3 m-0 p-0">
                        <p className="nivelUtilizador mb-0 pb-0">niv. 14</p>
                    </span>
                    
                </span>
            </div>
        </span>
        )
    }
    
    const getCard = () => {
        switch(props.tipo) {
            case "own":
                return <OwnCard />;
            case "Amigos":
                return <FriendCard/>;
            default:
                return <AllCard />
        }
    }

    return(
        <UserCard className="p-0 mb-5">
            
            {getCard()}
        </UserCard>
    )
}

export default ListaUtilizadores