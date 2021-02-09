import React from 'react';
import styled from 'styled-components';
import '../Styles/Perfil.css'
import Back from '../Images/BackArrow.png';
import IconeAmigo from '../Images/IconeAmigo.png';
import PerfilImg from '../Images/Perfil.jpg';

const Div = styled.div`
    margin: 40px 30px 40px 30px;
`;

const ProfilePicture = styled.div`
    background-image: url(${PerfilImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 125px;
    width: 125px;
    border-radius: 50%;
    border: solid 3px #ffa801;
`;

function Perfil() {
    return(
        <Div>
           <section className="row col-12 m-0 p-0">
                <span className="col-2 m-0 p-0">
                    <img src={Back}/>
                </span>
                <div className="col-8 text-center m-0 p-0">
                    <ProfilePicture/>
                    <h5 id="NomeUser">Pedro Alves</h5>  
                    <p id="DataUser">Membro desde 2021</p>
                </div>
                <span className="col-2 text-right 34495Em-0 p-0">
                    <img src={IconeAmigo}/>
                </span>
           </section>
           <section className="row col-12 m-0 p-0">
                <h5 id="biografiaTitulo">Biografia</h5>
                <p id="biografiaTexto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
           </section>
        </Div>
    )
}

export default Perfil;