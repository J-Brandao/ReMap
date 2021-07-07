import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Perfil from '../Images/Perfil.jpg';
import '../Styles/Gamehub.css';
import {ProgressBar} from 'react-bootstrap';
import Trofeus from '../Components/Perfil/Trofeus';
import Ideia from '../Images/Ideia.svg';
import BrokenHouseGH from '../Images/BrokenHouse.svg';
import CameraGH from '../Images/CameraStats.svg';
import FootstepsGH from '../Images/FootstepsGH.svg';
import CommentsGH from '../Images/Comments.svg';
import Alert from '../Images/Alert.svg';
import CheckMark from '../Images/CheckMark.svg';
import Spray from '../Images/Spray.svg';
import BackArrow from '../Components/Geral/BackArrow';
import Architect from '../Images/architect.svg';
import ArrowTeam from '../Images/Arrow2.svg';
import '../Styles/Perfil.css'
import Placeholder from '../Images/Placeholder.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { getUtilizadorById} from '../Store/Utilizadores/Actions';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Components/Geral/Loading';
import { storage } from '../Firebase/FbConfig';
import { Link } from 'react-router-dom';
import badgeEdificio_0 from '../Images/badges/badgeEdificio_0.svg';
import badgeComentario_0 from '../Images/badges/badgeComentario_0.svg';
import badgeAmigo_0 from '../Images/badges/badgeAmigo_0.svg';
import badgeSugestao_0 from '../Images/badges/badgeSugestao_0.svg';


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
    min-height: 70px;
    width: 70px;
`;

function Gamehub() {

    const utilizador = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const isLoadingUtilizador = useSelector(({Utilizadores})=> Utilizadores.isLoadingSelf)
    const dispatch = useDispatch();
    const { user, isLoading, isAuthenticated} = useAuth0();
    const [imagem, setImagem] = useState(null)


    
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
    }, [utilizador])
    

    if(isLoading || isLoadingUtilizador) {
        return (
            <Loading/>
        )
    }

    return(
        <div className="m-0 p-0">
            {console.log(utilizador.progresso.comentarios.badge)}
            <Div>
                <section className="row col-12 m-0 p-0">
                    <span className="col-2 m-0 p-0">
                        <BackArrow isGoingBack={true}/>
                    </span>
                    <span className="col-8 tituloPagina offset-2 text-center m-0 p-0">
                        Gamehub
                    </span>
            </section>
            <section className="row col-12 m-0 mb-4 p-0">
                    <div className="col-3 p-0">
                        <ProfilePicture  style={{backgroundImage:`url(${imagem !== null ? imagem : Placeholder})`}}/>
                    </div>
                    <div className="col-9 pr-0">
                        <span className="row col-12 m-0 p-0">
                            <span className="spanNivel col-8 p-0">
                                <p className="mb-0 nomeUtilizador">{utilizador.nomeUtilizador}</p>
                                <p className="mb-0 nomeNivel">Principiante</p>
                            </span>
                            <span className="col-4 p-0 text-right">
                                <p className="nivel mb-0">{utilizador.progresso.nivel}</p>
                            </span>
                        </span>
                        <ProgressBar now={utilizador.progresso.exp/10} variant="custom"/>
                        <span>
                            <p className="mb-0 experienciaNivel">{utilizador.progresso.exp}/1000 XP</p>
                        </span>
                    </div>
            </section>
            <Trofeus/>
           </Div>

           <Link to="/equipas">
           <section className="row col-12 m-0 p-0 btnTeam">
               <span className="col-3 text-right m-auto p-0">
                    <img className="m-0" src={Architect}/>
               </span>
                <span className="nomeEquipa col-6 text-center m-auto p-0">Arquitetos</span>
                <span className="col-3 m-auto">
                    <img className="m-0" src={ArrowTeam}/>
               </span>
           </section>
           </Link>

           <section className="row col-12 m-0 mt-3 p-0">
                <h5 id="seccaoTitulo" className="subtituloGH">Estatísticas Principais</h5>
                <div className="bgSeccao">
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={BrokenHouseGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Edifícios Adicionados</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">{utilizador.progresso.edificios.nrEdificios}</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={Ideia}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Sugestões dadas</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">{utilizador.progresso.sugestao.nrSugestoes}</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={CommentsGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Comentários Publicados</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">{utilizador.progresso.comentarios.nrComentarios}</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={FootstepsGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Amigos Adicionados</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">{utilizador.progresso.amigos.nrAmigos}</p>
                    </span>
                </div>
           </section>

           <section className="row col-12 m-0 p-0 pt-4">
                <h5 id="seccaoTitulo" className="subtituloGH">Crachás</h5>
                <div className="bgSeccao">
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={badgeEdificio_0}/>
                            <ProgressBar now={utilizador.progresso.edificios.nrEdificios} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Edifícios Adicionados</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={badgeComentario_0}/>
                            <ProgressBar now={utilizador.progresso.comentarios.nrComentarios} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Comentários</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={badgeAmigo_0}/>
                            <ProgressBar now={utilizador.progresso.amigos.nrAmigos} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Amigos Adicionados</p>
                        </span>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={badgeSugestao_0}/>
                            <ProgressBar now={utilizador.progresso.sugestao.nrSugestoes} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Sugestões Dadas</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={Ideia}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Sugestões</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={CheckMark}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Verificado</p>
                        </span>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={Alert}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Fora da Lei</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={Spray}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Vandalizado</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={BrokenHouseGH}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Mapeador</p>
                        </span>
                    </span>
                </div>
           </section>


        <style>
            {`
            .progress {
                background-color: #000000;
                height: 7px;
              }
              
              .bg-custom {
                background-color: #ffa801;
                color: white;
              }
            `}
        </style>

        </div>
    )
}

export default Gamehub;