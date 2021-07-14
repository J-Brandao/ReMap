import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Back from '../Images/BackArrow.svg';
import More from '../Images/More.svg';
import Perfil from '../Images/Perfil.jpg';
import '../Styles/PaginaEdificio.css';
import Galeria from '../Components/PaginaEdificio/Galeria';
import Classificacao from '../Components/PaginaEdificio/Classificacao';
import BackArrow from '../Components/Geral/BackArrow';
import {useAuth0} from "@auth0/auth0-react";
import { getEdificio, apagaEdificio } from '../Store/Edificios/Actions';
import { getUtilizadorById } from '../Store/Utilizadores/Actions'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Components/Geral/Loading';
import Comentarios from '../Components/PaginaEdificio/Comentarios';
import Sugestoes from '../Components/PaginaEdificio/Sugestoes';
import { storage } from '../Firebase/FbConfig';
import { getComentariosListByBuilding } from '../Store/Comentarios/Actions';
import { getSugestoesListByBuilding } from '../Store/Sugestoes/Actions';
import UserEdificio from '../Components/PaginaEdificio/UserEdificio';
import ModalEliminarEdificio from '../Components/Modal/ModalEliminarEdificio';
import {useHistory} from "react-router-dom";
import Architect from '../Images/architect.svg';
import Photographer from '../Images/photographer.svg';
import Scroll from '../Images/scroll.svg';


const Div = styled.div`
    margin: 40px 30px 0 30px;
`;

const ProfilePicture = styled.div`
    margin: 0 auto;
    background-image: url(${Perfil});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    border: solid 3px #ffa801;
    min-height: 60px;
    width: 60px;
`;

const Button = styled.button`
    border: solid 2px #227093;
    border-radius: 0;
    height: 46px;
    font-size: 18px;
    color: #34495e;
`;

const ButtonS = styled.button`
    border: solid 2px #FFA801;
    background-color: rgba(255, 168, 1, 0.45);
    border-radius: 0;
    height: 46px;
    font-size: 18px;
    color: #34495e;
`;
const ButtonOP = styled.button`
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

const BackgroundDiv1 = styled.div`
    margin: 0 auto;
    background-color: rgba(34, 112, 147, 0.5);
    border-radius: 50%;
    min-height: 65px;
    width: 65px;
    line-height: 65px;
`;
const BackgroundDiv2 = styled.div`
    margin: auto 0 auto auto;
    background-color: #CCE6C1;
    border-radius: 50%;
    min-height: 55px;
    width: 55px;
    line-height: 55px;
`;
const BackgroundDiv3 = styled.div`
    margin: auto 0 auto auto;
    background-color: #F8A46F;
    border-radius: 50%;
    min-height: 55px;
    width: 55px;
    line-height: 55px;
`;

function PaginaEdificio(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user, isLoading, isAuthenticated, logout} = useAuth0()
    const [showDropdown, setShowDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [seccao, setSeccao] = useState('Sugestões');
    const ownUser = useSelector(({Utilizadores})=> Utilizadores.ownUser);
    const isLoadingUser = useSelector(({Utilizadores}) => Utilizadores.isLoadingSelf);
    const edificio = useSelector(({ Edificios }) => Edificios.dataSingle );
    const isLoadingEdificio = useSelector(({ Edificios }) => Edificios.isLoadingSingle);
    const sugestoes = useSelector(({ Sugestoes }) => Sugestoes.data);
    const isLoadingSugestoes = useSelector(({Sugestoes})=> Sugestoes.isLoading)
    
    const [imagens, setImagens] = useState([]);
    const [isLoadingImages, setIsLoadingImages] = useState(true);

    const isLoadingComment = useSelector(({ Comentarios }) => Comentarios.isLoading)
    const commentData = useSelector(({ Comentarios }) => Comentarios.data)

    const isLoadingCreationComment = useSelector(({Comentarios})=>Comentarios.isLoadingCreation)
    const isLoadingCreationSugestion = useSelector(({Sugestoes})=>Sugestoes.isLoadingCreation)

    useEffect(() => {
        dispatch(getEdificio(props.match.params.id));
        dispatch(getComentariosListByBuilding(props.match.params.id));
        dispatch(getSugestoesListByBuilding(props.match.params.id))
    }, [])
    useEffect(() => {
        if (user && !isLoading && isAuthenticated) {
            dispatch(getUtilizadorById(user.email))
        }
    }, [user])
    useEffect(() => {
        dispatch(getComentariosListByBuilding(props.match.params.id));
    }, [isLoadingCreationComment])
    useEffect(() => {
        dispatch(getSugestoesListByBuilding(props.match.params.id));
    }, [isLoadingCreationSugestion])


    useEffect(() => {
        if (edificio && !isLoadingEdificio && edificio.fotos) {
            if(edificio.id === props.match.params.id){
                edificio.fotos.map((item, index) => {
                    if (imagens.length < edificio.fotos.length) {
                    storage.ref('imagensEdificios').child(item).getDownloadURL().then((url) => {
                        const newArray = imagens
                        newArray.push(url)
                        setImagens(newArray)
                    });
                }
                    if (index === edificio.fotos.length - 1)
                        setTimeout(()=>setIsLoadingImages(false),300);
                })
            }
        }
    }, [edificio])

    const MudaSeccao = id => {        
        setSeccao(id);
    }

    if (isLoading || isLoadingEdificio || isLoadingUser || isLoadingImages) {
        return (
            <Loading />
        )
    }
    
    const showMenu = () => {
        setShowDropDown(true);
    }

    const handleShow = () => {
        setShowModal(true);
        setShowDropDown(false);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const deleteEdificio = () => {
        setShowModal(false);
        dispatch(apagaEdificio(edificio.id))
        history.push("/homepage")
    }

    const _editEdificio = () => {
        setShowDropDown(false);
        history.push(`/editarEdificio/${edificio.id}`)

    }

    const renderOptions = () => {
        if (showDropdown) {
               return (
            <DropDown style={{top:'35px'}}>
                        
               {ownUser.id ===edificio.userId && <><ButtonOptions onClick={_editEdificio}>Editar Edifício</ButtonOptions><Line /></>}
                
                <ButtonOptions onClick={handleShow} eliminar> Eliminar</ButtonOptions>
                            
        
            </DropDown>
        ) 
            } 
        
    }

    return (
        <>
        <div className="m-0 p-0">
            <Div>
                <section className="row col-12 m-0 p-0">
                    <BackArrow isGoingBack={true}/>
                    <UserEdificio userId={edificio.userId} data={edificio.date} userCheck={user.email}/>
                    <span className="col-2 text-right m-0 p-0">
                        {(ownUser.id === edificio.userId || ownUser.role === "admin") &&
                        <ButtonOP onClick={showMenu} className="text-right m-0 p-0">
                        <img className="m-0 p-0" style={{position: 'relative', top: '-18px'}} src={More} alt="Mais opções" />
                    </ButtonOP>
                     }
                    
                    {renderOptions()}
                    </span>
                </section>
                <h2 className="nomeEdificio p-0 pb-2">{edificio.nomeEdificio}</h2>
                <section className="col-12 m-0 p-0">
                        <h5 id="seccaoTitulo">Informações do Edifício</h5>
                        <p id="descricaoEdificio">{edificio.descricao}</p>
                </section>
                <section className="row col-12 m-0 p-0">
                        <h5 id="seccaoTitulo">Galeria de Imagens</h5>
                    
                        <Galeria fotos={imagens} />
                    
                        
                </section>

                <Classificacao vandalismo={edificio.vandalismo} degradacao={edificio.degradacao} seguranca={edificio.seguranca} acesso={edificio.acesso}/>

            </Div>

            <section className="row col-12 m-0 p-0 px-3 mt-3">
                        <h5 id="seccaoTitulo" className="col-12">Domínio</h5>
                        <span className="col-4 text-center m-0 p-0 m-auto d-flex">
                            <BackgroundDiv1>
                                <img className="m-auto" style={{height:`45px`}} src={Photographer}/>
                            </BackgroundDiv1>
                            <span className="m-auto pl-1 percent1">53%</span>
                        </span>
                        <span className="col-4 text-center m-0 p-0 m-auto d-flex">
                            <BackgroundDiv2>
                                <img className="m-auto" style={{height:`35px`}} src={Architect}/>
                            </BackgroundDiv2>
                            <span className="m-auto percent2">27%</span>
                        </span>
                        <span className="col-4 text-center m-0 p-0 m-auto d-flex">
                            <BackgroundDiv3>
                                <img className="m-auto" style={{height:`35px`}} src={Scroll}/>
                            </BackgroundDiv3>
                            <span className="m-auto percent3">20%</span>
                        </span>
            </section>

            {seccao === 'Sugestões' ?
            <div className="row col-12 m-0 mt-3 p-0">
                <ButtonS className="btn col-6 m-0 p-0">Sugestões</ButtonS>
                <Button className="btn col-6 m-0 p-0" onClick = {() => MudaSeccao('Comentários')}>Comentários</Button>
            </div>
            :
            <div className="row col-12 m-0 mt-3 p-0">
                <Button className="btn col-6 m-0 p-0" onClick = {() => MudaSeccao('Sugestões')}>Sugestões</Button>
                <ButtonS className="btn col-6 m-0 p-0">Comentários</ButtonS>
            </div>
            }
           
            {seccao === 'Sugestões' ?
                <Sugestoes utilizador={ownUser.id} edificio={edificio} isLoading={isLoadingSugestoes} sugestoes={sugestoes} userCheck={user.email}/>
                :
                    <Comentarios utilizador={ownUser.id} edificio={edificio} isLoading={isLoadingComment} comments={commentData} userCheck={user.email}/>
            }
            </div>
            <ModalEliminarEdificio show={showModal} onHide={handleClose} onDelete={deleteEdificio}/>    
        </>
    )
}

export default PaginaEdificio;