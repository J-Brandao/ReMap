import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Perfil from '../Images/Perfil.jpg';
import '../Styles/Gamehub.css';
import Ideia from '../Images/Ideia.svg';
import BrokenHouseGH from '../Images/BrokenHouse.svg';
import CameraGH from '../Images/CameraStats.svg';
import FootstepsGH from '../Images/FootstepsGH.svg';
import CommentsGH from '../Images/Comments.svg';
import BackArrow from '../Components/Geral/BackArrow';
import Architect from '../Images/architect.svg';
import ArrowTeam from '../Images/Arrow2.svg';
import QuestionMark from '../Images/QuestionMark.svg';
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

function Equipas() {

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
                    <span className="col-2 m-0 text-right">
                        <img className="m-auto" src={QuestionMark}/>
                    </span>
            </section>

            <section className="row col-12 m-0 p-0">
                <span className="col-3 text-center m-0 p-0 m-auto">
                    <BackgroundDiv1>
                        <img className="m-auto" src={Photographer}/>
                    </BackgroundDiv1>
                </span>
                <span className="col-6 text-center m-0 p-0 m-auto">
                    <BackgroundDiv2>
                        <img className="m-auto" style={{height:`75px`}} src={Architect}/>
                    </BackgroundDiv2>
                </span>
                <span className="col-3 text-center m-0 p-0 m-auto">
                    <BackgroundDiv3>
                        <img className="m-auto" src={Scroll}/>
                    </BackgroundDiv3>
                </span>
            </section>

            <section className="row col-12 m-0 mt-2 p-0">
                <p className="nomeEquipa mb-2 col-12 text-center" style={{fontSize: "18px", color: "#34495e"}}>Arquitetos</p>
                <p className="nomeEquipa mb-0 col-12 text-center" style={{fontSize: "18px", color: "#34495e"}}><b>Pontuação: 20k</b></p>
            </section>
           </Div>

           <section className="row col-12 m-0 mt-3 p-0">
                <h5 id="seccaoTitulo" className="subtituloGH">Estatísticas Principais</h5>
                <div className="bgSeccao">
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={FootstepsGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Área de Influência</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={BrokenHouseGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Edifícios Adicionados</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={Ideia}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Sugestões dadas</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={CameraGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Fotografias Publicadas</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                    <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                        <span className="col-2 m-0 p-0 my-auto">
                            <img className="m-0 imgStats" src={CommentsGH}/>
                        </span>
                        <p className="col-6 m-0 px-0 my-auto textoEstatisticas">Comentários Publicados</p>
                        <p className="col-2 m-0 p-0 my-auto textoEstatisticas text-center">2</p>
                    </span>
                </div>
           </section>
        </div>
    )
}

export default Equipas;