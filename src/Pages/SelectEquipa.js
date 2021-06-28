import React, {useEffect, useState} from 'react';
import '../Styles/LandingPage.css';
import '../Styles/DetailSelectEquipa.css'
import styled from 'styled-components';
import Background from '../Images/Background.png';
import Scroll from '../Images/scroll.svg';
import SetaSelectEquipa from '../Images/SetaSelectEquipa.svg';
import Architect from '../Images/architect.svg';
import Photographer from '../Images/photographer.svg';

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


function SelectEquipa() {

    return(
        <Home>
            <h1 className="tituloSelectEquipa text-center mb-3">Escolhe a tua equipa</h1>
            <section className="row w-100 m-0 p-0 justify-content-center">
                <span className="row col-10 m-0 mb-4 p-0 SelectArquitetos">
                    <span className="col-5 text-center m-auto p-0">
                        <img className="m-0" src={Architect}/>
                    </span>
                    <span className="nomeEquipa col-7 m-auto p-0">Arquitetos</span>
                </span>

                <span className="row col-10 m-0 mb-4 p-0 SelectHistoriadores">
                    <span className="col-5 text-center m-auto p-0">
                        <img className="m-0" src={Scroll}/>
                    </span>
                    <span className="nomeEquipa col-7 m-auto p-0">Historiadores</span>
                </span>

                <span className="row col-10 m-0 p-0 SelectFotografos">
                    <span className="col-5 text-center m-auto p-0">
                        <img className="m-0" src={Photographer}/>
                    </span>
                    <span className="nomeEquipa col-7 m-auto p-0">Fotografos</span>
                </span>
            </section>
        </Home>
    )
}

export default SelectEquipa;