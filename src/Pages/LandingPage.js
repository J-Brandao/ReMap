import React, {useEffect} from 'react';
import '../Styles/LandingPage.css'
import styled from 'styled-components';
import Logo from '../Images/Logo.svg';
import Background from '../Images/Background.png'
import {useAuth0} from "@auth0/auth0-react"

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
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    }, [isAuthenticated])

    return(
        <Home>
            <img src={Logo}/>
            <h2>Bem-vindo ao Remap</h2>
            <button className="btn login">Log In</button>
            <button className="btn signup">Sign Up</button>
        </Home>
    )
}

export default LandingPage;