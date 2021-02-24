import React, { useEffect } from 'react';
import styled from 'styled-components';
import '../Styles/Perfil.css'
import IconeAmigo from '../Images/IconeAmigo.svg';
import PerfilImg from '../Images/Perfil.jpg';
import Trofeus from '../Components/Perfil/Trofeus';
import Interacoes from '../Components/Perfil/Interacoes';
import BackArrow from '../Components/Geral/BackArrow';
import { useSelector, useDispatch } from 'react-redux';
import { getUtilizadorById } from '../Store/Utilizadores/Actions';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Components/Geral/Loading';

const Div = styled.div`
    margin: 40px 30px 40px 30px;
`;

const ProfilePicture = styled.div`
    margin: 0 auto;
    background-image: url(${PerfilImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 125px;
    width: 125px;
    border-radius: 50%;
    border: solid 3px #ffa801;
`;

function Perfil(props) {

    const { user, isLoading } = useAuth0();
    //const Utilizador = useSelector(({ Utilizador }) => Utilizador.data[0]);
    //const isLoadingUtilizador = useSelector(({ Utilizador }) => Utilizador.isLoading)
    const dispatch = useDispatch();

    useEffect(() => {
        //verificar se isto funciona com props
        if(user)
        dispatch(getUtilizadorById(props.location.state.id))
    }, [user])
    
    if(isLoading) {
        return (
            <Loading/>
        )
    }

    return(
        <Div>    
           <section className="row col-12 m-0 p-0">
                <BackArrow />
                <div className="col-8 text-center m-0 p-0">
                    <ProfilePicture/>
                    <h5 id="NomeUser">Pedro Alves</h5>  
                    <p id="DataUser">Membro desde 2021</p>
                </div>
                <span className="col-2 text-right m-0 p-0">
                    <img src={IconeAmigo}/>
                </span>
           </section>
           <section className="row col-12 m-0 p-0">
                <h5 id="seccaoTitulo">Biografia</h5>
                <p id="biografiaTexto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
           </section>

           <Trofeus/>

           <Interacoes/>
        </Div>
    )
}

export default Perfil;