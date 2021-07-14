import React, {useEffect} from 'react';
import '../Styles/LandingPage.css'
import styled from 'styled-components';
import Logo from '../Images/Logo.svg';
import Background from '../Images/Background.png'
import { useAuth0 } from "@auth0/auth0-react"
import {useHistory} from "react-router-dom"

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

function LandingPage() {

    const history = useHistory()
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return(
        <Home>
            <img alt="Logo Remap" src={Logo}/>
            <h2>Bem-vindo ao Remap</h2>
            <button onClick={isAuthenticated ? ()=> history.push("homepage") : ()=>loginWithRedirect()} className="btn login">Entrar</button>
        </Home>
    )
}

export default LandingPage;