import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import '../Styles/Gamehub.css';
import '../Styles/EquipasTut.css';
import BackArrow from '../Components/Geral/BackArrow';
import Architect from '../Images/architect.svg';
import Photographer from '../Images/photographer.svg';
import Scroll from '../Images/scroll.svg';
import '../Styles/Perfil.css'
import { useSelector, useDispatch } from 'react-redux';
import { getUtilizadorById} from '../Store/Utilizadores/Actions';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Components/Geral/Loading';
import { storage } from '../Firebase/FbConfig';


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

function EquipasTut() {

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
    /*useEffect(() => {
        if (utilizador && !isLoading && isAuthenticated) {
            storage.ref('imagensUtilizadores').child(`${utilizador.imagemUser}`).getDownloadURL().then((url) => {
                setImagem(url)
            })
        }  
    }, [utilizador])*/
    

    if(isLoading || isLoadingUtilizador) {
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
                </section>

                <section className="col-12 m-0 p-0">
                        <h5 id="seccaoTitulo">Como funciona</h5>
                        <p id="descricaoEdificio">Cada utilizador pode interagir com os edifícios garantindo que a sua equipa monopoliza o máximo de imóveis possíveis.
                        A pontuação altera consoante o número de edifícios de cada equipa.</p>
                </section>

                <section className="col-12 m-0 p-0">
                        <h5 id="seccaoTitulo" className="mb-2">Pontuações</h5>

                        <span className="row col-12 m-0 p-0 Arquitetos">
                            <span className="col-3 text-center m-auto p-0">
                                <img className="m-0" src={Architect}/>
                            </span>
                            <span className="nomeEquipa col-6 m-auto p-0">Arquitetos</span>
                            <span className="col-3 m-auto scoreEquipa">
                                <b>23k</b>
                            </span>
                        </span>

                        <span className="row col-12 m-0 mt-2 p-0 Fotografos">
                            <span className="col-3 text-center m-auto p-0">
                                <img className="m-0" src={Photographer}/>
                            </span>
                            <span className="nomeEquipa col-6 m-auto p-0">Fotógrafos</span>
                            <span className="col-3 m-auto scoreEquipa">
                                <b>20k</b>
                            </span>
                        </span>

                        <span className="row col-12 m-0 mt-2 p-0 Historiadores">
                            <span className="col-3 text-center m-auto p-0">
                                <img className="m-0" src={Scroll}/>
                            </span>
                            <span className="nomeEquipa col-6 m-auto p-0">Historiadores</span>
                            <span className="col-3 m-auto scoreEquipa">
                                <b>17k</b>
                            </span>
                        </span>
                </section>

                <section className="col-12 m-0 mt-3 p-0">
                        <h5 id="seccaoTitulo">Como aumentar o domínio</h5>
                        <p id="descricaoEdificio">Ao deixares um comentário, sugestão ou fotografia num edifício, o domínio da tua equipa sobre o mesmo aumenta.
                        Ao longo do tempo, o domínio de cada equipa vai diminuindo, por isso precisam de continuar a interagir!</p>
                </section>

                <section className="col-12 m-0 mt-3 p-0">
                        <h5 id="seccaoTitulo">Exemplo de domínio</h5>
                </section>
           </Div>

           <section className="row col-12 m-0 p-0 px-3 mb-2">
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
        </div>
    )
}

export default EquipasTut;