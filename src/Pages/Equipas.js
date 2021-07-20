import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import '../Styles/Gamehub.css';
import Ideia from '../Images/Ideia.svg';
import BrokenHouseGH from '../Images/BrokenHouse.svg';
import CameraGH from '../Images/CameraStats.svg';
import FootstepsGH from '../Images/FootstepsGH.svg';
import CommentsGH from '../Images/Comments.svg';
import BackArrow from '../Components/Geral/BackArrow';
import Architect from '../Images/architect.svg';
import QuestionMark from '../Images/QuestionMark.svg';
import Photographer from '../Images/photographer.svg';
import Scroll from '../Images/scroll.svg';
import '../Styles/Perfil.css'
import { useSelector, useDispatch } from 'react-redux';
import { getUtilizadorById} from '../Store/Utilizadores/Actions';
import { getEquipasList } from '../Store/Equipas/Actions';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Components/Geral/Loading';
import { storage } from '../Firebase/FbConfig';
import { Link } from 'react-router-dom';
import CarouselEquipas from '../Components/Equipas/CarouselEquipas.js';


const Div = styled.div`
    margin: 40px 30px 0 30px;
`;

const BackgroundDiv1 = styled.div`
    margin: 0 auto;
    background-color: rgba(34, 112, 147, 0.5);
    border-radius: 50%;
    min-height: 65px;
    width: 65px;
    line-height: 65px;
`;
const BackgroundDiv2 = styled.div`
    margin: auto;
    background-color: #CCE6C1;
    border-radius: 50%;
    min-height: 109px;
    width: 109px;
    line-height: 109px;
`;
const BackgroundDiv3 = styled.div`
    margin: 0 auto;
    background-color: #F8A46F;
    border-radius: 50%;
    min-height: 65px;
    width: 65px;
    line-height: 65px;
`;

function Equipas(props) {

    const [team, setTeam] = useState(props.location.state.id);

    const utilizador = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const isLoadingUtilizador = useSelector(({Utilizadores})=> Utilizadores.isLoadingSelf)
    const equipas = useSelector(({Equipas})=> Equipas.data)
    const isLoadingEquipas = useSelector(({Equipas})=> Equipas.isLoading)
    const dispatch = useDispatch();
    const { user, isLoading, isAuthenticated} = useAuth0();

    const onChange = (e) => {
        setTeam(e);
    }
    
    useEffect(() => {
        if (user && !isLoading && isAuthenticated) {
            dispatch(getUtilizadorById(user.email));
        } 
    },[user])
    useEffect(() => {
        if (utilizador && !isLoading && isAuthenticated) {
            dispatch(getEquipasList());
        }  
    }, [utilizador])
    

    if(isLoading || isLoadingUtilizador || isLoadingEquipas) {
        return (
            <Loading/>
        )
    }

    return(
        <div className="m-0 p-0">
            <Div>
                <section className="row col-12 m-0 p-0">
                    <span className="col-2 m-0 p-0">
                        <BackArrow isGoingBack={true}/>
                    </span>
                    <span className="col-8 tituloPagina offset-2 text-center m-0 p-0">
                        Equipas
                    </span>
                    <Link to="/equipas/equipastut">
                        <span className="col-2 m-0 text-right">
                            <img className="m-auto" src={QuestionMark}/>
                        </span>
                    </Link>
            </section>

            {props.location.state.id === "Arquitetos" ?
                <CarouselEquipas onChange={onChange} value={1}/>
                :
                props.location.state.id === "Historiadores" ?
                <CarouselEquipas onChange={onChange} value={2}/>
                :
                <CarouselEquipas onChange={onChange} value={3}/>
            }

            <section className="row col-12 m-0 mt-2 p-0">
                {equipas.map((equipa) => {
                    if(equipa.teamName === team) {
                        return(
                            <>
                                <p className="nomeEquipa mb-2 col-12 text-center" style={{fontSize: "18px", color: "#34495e"}}>{equipa.teamName}</p>
                                <p className="nomeEquipa mb-0 col-12 text-center" style={{fontSize: "18px", color: "#34495e"}}><b>Pontuação: {equipa.points}</b></p>
                            </>
                        )
                    }
                })}
            </section>
           </Div>

           <section className="row col-12 m-0 mt-3 p-0">
                <h5 id="seccaoTitulo" className="subtituloGH">Estatísticas Principais</h5>
                {equipas.map((equipa) => {
                    if(equipa.teamName === team) {
                        return(
                            <>
                            <div className="bgSeccao">
                                <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                                    <span className="col-2 m-0 p-0 my-auto">
                                        <img className="m-0 imgStats" src={BrokenHouseGH}/>
                                    </span>
                                    <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Edifícios Adicionados</p>
                                    <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">{equipa.estatisticas.nrEdificios}</p>
                                </span>
                                <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                                    <span className="col-2 m-0 p-0 my-auto">
                                        <img className="m-0 imgStats" src={Ideia}/>
                                    </span>
                                    <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Sugestões dadas</p>
                                    <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">{equipa.estatisticas.nrSugestoes}</p>
                                </span>
                                <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                                    <span className="col-2 m-0 p-0 my-auto">
                                        <img className="m-0 imgStats" src={CameraGH}/>
                                    </span>
                                    <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Fotografias Publicadas</p>
                                    <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">{equipa.estatisticas.nrFotografias}</p>
                                </span>
                                <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                                    <span className="col-2 m-0 p-0 my-auto">
                                        <img className="m-0 imgStats" src={CommentsGH}/>
                                    </span>
                                    <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Comentários Publicados</p>
                                    <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">{equipa.estatisticas.nrComentarios}</p>
                                </span>
                            </div>
                            </>
                        )
                    }
                })}
           </section>
        </div>
    )
}

export default Equipas;