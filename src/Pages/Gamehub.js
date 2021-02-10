import React from 'react';
import styled from 'styled-components';
import Back from '../Images/BackArrow.png';
import Perfil from '../Images/Perfil.jpg';
import '../Styles/Gamehub.css';
import {ProgressBar} from 'react-bootstrap';
import Trofeus from '../Components/Perfil/Trofeus';
import IdeiaGH from '../Images/IdeiaGH.png';
import BrokenHouseGH from '../Images/BrokenHouseGH.png';
import IdeiaCracha from '../Images/IdeiaCracha.png';
import BrokenHouseCracha from '../Images/BrokenHouseCracha.png';
import CameraGH from '../Images/CameraStats.png';
import FootstepsGH from '../Images/FootstepsGH.png';
import CommentsGH from '../Images/CommentsGH.png';
import Camera from '../Images/Camera.png';
import Bandeira from '../Images/Bandeira.png';
import Alert from '../Images/Alert.png';
import ArrowMap from '../Images/ArrowMap.png';
import Book from '../Images/Book.png';
import CheckMark from '../Images/CheckMark.png';
import Spray from '../Images/Spray.png';

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

function Gamehub () {
    return(
        <div className="m-0 p-0">
            <Div>
                <section className="row col-12 m-0 p-0">
                    <span className="col-2 m-0 p-0">
                        <img src={Back}/>
                    </span>
                    <span className="col-8 tituloPagina offset-2 text-center m-0 p-0">
                        Gamehub
                    </span>
            </section>
            <section className="row col-12 m-0 mb-4 p-0">
                    <div className="col-3 p-0">
                        <ProfilePicture/>
                    </div>
                    <div className="col-9 pr-0">
                        <span className="row col-12 m-0 p-0">
                            <span className="spanNivel col-8 p-0">
                                <p className="mb-0 nomeUtilizador">Pedro Alves</p>
                                <p className="mb-0 nomeNivel">Principiante</p>
                            </span>
                            <span className="col-4 p-0 text-right">
                                <p className="nivel mb-0">03</p>
                            </span>
                        </span>
                        <ProgressBar now={60} variant="custom"/>
                        <span>
                            <p className="mb-0 experienciaNivel">600/1000 XP</p>
                        </span>
                    </div>
            </section>
            <Trofeus/>
           </Div>

           <section className="row col-12 m-0 p-0">
                <h5 id="seccaoTitulo" className="subtituloGH">Estatísticas Principais</h5>
                <div className="bgSeccao">
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0" src={FootstepsGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Área de Influência</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0" src={BrokenHouseGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Edifícios Adicionados</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0" src={IdeiaGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Sugestões dadas</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0" src={CameraGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Fotografias Publicadas</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0" src={CommentsGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Comentários Publicados</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                </div>
           </section>

           <section className="row col-12 m-0 p-0 pt-4">
                <h5 id="seccaoTitulo" className="subtituloGH">Crachás</h5>
                <div className="bgSeccao">
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={ArrowMap}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Marco Importante</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={Camera}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Fotografo Nato</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={Book}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Historiador</p>
                        </span>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={Bandeira}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Edifícios Raros</p>
                        </span>
                        <span className="col-4 m-0 text-center">
                            <img className="m-0 imgCracha" src={IdeiaCracha}/>
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
                            <img className="m-0 imgCracha" src={BrokenHouseCracha}/>
                            <ProgressBar now={60} className="my-2" variant="custom"/>
                            <p className="m-0 p-0 nomeCracha">Mapeador</p>
                        </span>
                    </span>
                </div>
           </section>

        </div>
    )
}

export default Gamehub;