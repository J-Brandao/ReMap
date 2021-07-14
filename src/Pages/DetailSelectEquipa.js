import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import '../Styles/LandingPage.css';
import '../Styles/DetailSelectEquipa.css'
import styled from 'styled-components';
import Background from '../Images/Background.png';
import Scroll from '../Images/scroll.svg';
import SetaSelectEquipa from '../Images/SetaSelectEquipa.svg';
import Architect from '../Images/architect.svg';
import Photographer from '../Images/photographer.svg';
import Loading from '../Components/Geral/Loading';
import { atualizaUtilizador, getUtilizadorById } from '../Store/Utilizadores/Actions';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthentication from '../Firebase/useAuthentication';
import ModalPerfilCriado from "../Components/Modal/ModalPerfilCriado";

const Home = styled.div`
    flex-grow: 1;
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: 100% auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
`;

const BackgroundDiv = styled.div`
    margin: auto;
    background-color: #F8A46F;
    border-radius: 50%;
    min-height: 246px;
    width: 246px;
    line-height: 246px;
`;

const BackgroundDiv2 = styled.div`
    margin: auto;
    background-color: #92D1DF;
    border-radius: 50%;
    min-height: 246px;
    width: 246px;
    line-height: 246px;
`;

const BackgroundDiv3 = styled.div`
    margin: auto;
    background-color: #CCE6C1;
    border-radius: 50%;
    min-height: 246px;
    width: 246px;
    line-height: 246px;
`;

function DetailSelectEquipa(props) {

    const [equipa, setEquipa] = useState(props.location.state.numero);
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const ownUser = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const isLoadingUser = useSelector(({Utilizadores}) => Utilizadores.isLoadingSelf)
    const { user, isLoading, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && !isLoading && isAuthenticated) {
            dispatch(getUtilizadorById(user.email))
        }
    },[user])

    const onConfirm = (docId, userId, imagemUser, nomeUtilizador, biografia, cidade, progresso, equipa) => {
        onAtualizaUtilizador(docId, userId, imagemUser, nomeUtilizador, biografia, cidade, progresso, equipa)
        setShowModal(true)
    }
    const onClose = () => {
        setShowModal(false);
        history.push(`/homepage`);
    }

    const onAtualizaUtilizador = (docId, userId, imagemUser, nomeUtilizador, biografia, cidade, progresso, equipa) => {
        console.log(docId, userId, imagemUser, nomeUtilizador, biografia, cidade, progresso, equipa)
        dispatch(atualizaUtilizador(docId, userId, imagemUser, nomeUtilizador, biografia, cidade, progresso, equipa));
    }

    useAuthentication()

   
    if(isLoading || isLoadingUser) {
        return (
            <Loading />
        )
    }

    const mudaEquipa = ((valor) => {
        let equipaNovo;
        if(valor == "menos") {
            equipaNovo = equipa - 1;
            if(equipaNovo <= 0) {
                equipaNovo = 3;
                setEquipa(equipaNovo);
            } else {
                setEquipa(equipaNovo);
            }
        }
        if(valor == "mais") {
            equipaNovo = equipa + 1;
            if(equipaNovo >= 4) {
                equipaNovo = 1;
                setEquipa(equipaNovo);
            } else {
                setEquipa(equipaNovo);
            }
        }
      })

    return(
        <>
        <Home>
            {equipa === 1 ?
                <h1 className="tituloEquipa">Historiadores</h1>
                :
                equipa === 2 ?
                <h1 className="tituloEquipa">Fotógrafos</h1>
                :
                <h1 className="tituloEquipa">Arquitetos</h1>
            }
            <section className="row m-0 p-0 w-100 mb-3">
                <span className="col-2 m-0 p-0 my-auto text-center" onClick={() => mudaEquipa("menos")}>
                    <img className="m-auto" src={SetaSelectEquipa}/>
                </span>
                <span className="col-8 m-0 p-0">
                    {equipa === 1 ?
                        <BackgroundDiv className="text-center">
                            <img className="m-auto mainImage" src={Scroll}/>
                        </BackgroundDiv>
                        :
                        equipa === 2 ?
                        <BackgroundDiv2 className="text-center">
                            <img className="m-auto mainImage" src={Photographer}/>
                        </BackgroundDiv2>
                        :
                        <BackgroundDiv3 className="text-center">
                            <img className="m-auto mainImage" src={Architect}/>
                        </BackgroundDiv3>
                    }
                </span>
                <span className="col-2 m-0 p-0 my-auto text-center" onClick={() => mudaEquipa("mais")}>
                    <img className="m-auto setinha" src={SetaSelectEquipa}/>
                </span>
            </section>
            <section className="w-100 m-0 p-0 text-center">
                {equipa === 1 ?
                    <button onClick={()=>onConfirm(ownUser.id, user.email, ownUser.imagemUser, ownUser.nomeUtilizador, ownUser.biografia, ownUser.cidade, ownUser.progresso, "Historiadores")} className="btn butEscolhe">Escolher</button>
                    :
                    equipa === 2 ?
                    <button onClick={()=>onConfirm(ownUser.id, user.email, ownUser.imagemUser, ownUser.nomeUtilizador, ownUser.biografia, ownUser.cidade, ownUser.progresso, "Fotógrafos")} className="btn butEscolhe">Escolher</button>
                    :
                    <button onClick={()=>onConfirm(ownUser.id, user.email, ownUser.imagemUser, ownUser.nomeUtilizador, ownUser.biografia, ownUser.cidade, ownUser.progresso, "Arquitetos")} className="btn butEscolhe">Escolher</button>
                }
            </section>
            <section className="w-100 m-0 p-0 text-center">
                {equipa === 1 ?
                    <p className="textoEquipa m-auto">A história faz parte de ti! Não consegues passar por um edifício sem pegar no telemóvel para investigar mais sobre o seu passado</p>
                    :
                    equipa === 2 ?
                    <p className="textoEquipa m-auto">Para ti, o ato de capturar a essência de um edifício traz-te júbilo. Estás sempre com uma câmara em punho pronto para capturar estas obras</p>
                    :
                    <p className="textoEquipa m-auto">Para ti, imaginar o que um edifício se poderá tornar é o principal. Estás sempre com a imaginação a trabalhar!</p>
                }
            </section>
        </Home>
        <ModalPerfilCriado show={showModal} onHide={onClose}/>
        </>
    )
}

export default DetailSelectEquipa;