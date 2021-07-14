import React, {useEffect, useState} from 'react';
import '../Styles/LandingPage.css';
import '../Styles/DetailSelectEquipa.css'
import styled from 'styled-components';
import Background from '../Images/Background.png';
import Scroll from '../Images/scroll.svg';
import Architect from '../Images/architect.svg';
import Photographer from '../Images/photographer.svg';
import { Link } from 'react-router-dom';

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
                <Link className="col-10 p-0 w-100" to={{
                    pathname: "/selectequipa/detailselectequipa",
                    state: {
                        numero: 3
                    }
                }}>
                    <span className="row m-0 mb-4 p-0 SelectArquitetos">
                        <span className="col-5 text-center m-auto p-0">
                            <img className="m-0" src={Architect}/>
                        </span>
                        <span className="nomeEquipa col-7 m-auto p-0">Arquitetos</span>
                    </span>
                </Link>

                <Link className="col-10 p-0 w-100" to={{
                    pathname: "/selectequipa/detailselectequipa",
                    state: {
                        numero: 1
                    }
                }}>
                    <span className="row m-0 mb-4 p-0 SelectHistoriadores">
                        <span className="col-5 text-center m-auto p-0">
                            <img className="m-0" src={Scroll}/>
                        </span>
                        <span className="nomeEquipa col-7 m-auto p-0">Historiadores</span>
                    </span>
                </Link>

                <Link className="col-10 p-0 w-100" to={{
                    pathname: "/selectequipa/detailselectequipa",
                    state: {
                        numero: 2
                    }
                }}>
                    <span className="row m-0 p-0 SelectFotografos">
                        <span className="col-5 text-center m-auto p-0">
                            <img className="m-0" src={Photographer}/>
                        </span>
                        <span className="nomeEquipa col-7 m-auto p-0">Fotografos</span>
                    </span>
                </Link>
            </section>
        </Home>
    )
}

export default SelectEquipa;