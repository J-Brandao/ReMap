import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Back from '../Images/BackArrow.svg';
import More from '../Images/More.svg';
import Perfil from '../Images/Perfil.jpg';
import '../Styles/PaginaEdificio.css';
import Galeria from '../Components/PaginaEdificio/Galeria';
import Classificacao from '../Components/PaginaEdificio/Classificacao';
import ArrowMap from '../Images/ArrowMap.svg';
import Book from '../Images/Book.svg';
import Camera from '../Images/Camera.svg';
import BackArrow from '../Components/Geral/BackArrow';
import {useAuth0} from "@auth0/auth0-react";
import { getEdificio } from '../Store/Edificios/Actions';
import { getUtilizadorById } from '../Store/Utilizadores/Actions'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Components/Geral/Loading';
import Comentarios from '../Components/PaginaEdificio/Comentarios';
import Sugestoes from '../Components/PaginaEdificio/Sugestoes';
import { storage } from '../Firebase/FbConfig';
import { getComentariosListByBuilding } from '../Store/Comentarios/Actions';
import { getSugestoesListByBuilding } from '../Store/Sugestoes/Actions';
import UserEdificio from '../Components/PaginaEdificio/UserEdificio';


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

function PaginaEdificio(props) {
    const dispatch = useDispatch();
    const {user, isLoading, isAuthenticated, logout} = useAuth0()
    
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
    const commentData = useSelector(({Comentarios}) => Comentarios.data)
    

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
    
    


    return(
        <div className="m-0 p-0">
            <Div>
                <section className="row col-12 m-0 p-0">
                    <BackArrow isGoingBack={true}/>
                    <UserEdificio userId={edificio.userId} data={edificio.date}/>
                    <span className="col-2 text-right m-0 p-0">
                        <img src={More}/>
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
                    
                        <span className="col-12 mx-0 px-0 text-right mt-2">
                            <button onClick={()=>logout()} className="botaoFotografia">Nova Fotografia</button>
                        </span>
                </section>

                <Classificacao vandalismo={edificio.vandalismo} degradacao={edificio.degradacao} seguranca={edificio.seguranca} acesso={edificio.acesso}/>

                <section className="row col-12 m-0 p-0 mt-3">
                        <h5 id="seccaoTitulo">Crachás</h5>
                        <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                            <span className="col-4 m-0 p-0 text-center">
                                <img className="m-0 imgCracha" src={ArrowMap}/>
                                <p className="m-0 p-0 nomeCracha">Marco Importante</p>
                            </span>
                            <span className="col-4 m-0 p-0 text-center">
                                <img className="m-0 imgCracha" src={Camera}/>
                                <p className="m-0 p-0 nomeCracha">Fotografo Nato</p>
                            </span>
                            <span className="col-4 m-0 p-0 text-center">
                                <img className="m-0 imgCracha" src={Book}/>
                                <p className="m-0 p-0 nomeCracha">Historiador</p>
                            </span>
                        </span>
                </section>
            </Div>
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
                <Sugestoes utilizador={ownUser.id} edificio={edificio.id} isLoading={isLoadingSugestoes} sugestoes={sugestoes}/>
                :
            <Comentarios utilizador={ownUser.id} edificio={edificio.id} isLoading={isLoadingComment} comments={commentData}/>
            }
        </div>
    )
}

export default PaginaEdificio;