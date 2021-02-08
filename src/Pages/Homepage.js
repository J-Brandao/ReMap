import React from 'react';
import '../Styles/Homepage.css'
import styled from 'styled-components';
import Logo from '../Images/Logo.png';
import Background from '../Images/Background.png'

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

function Homepage() {
    return(
        <Home>
            <img src={Logo}/>
            <h2>Bem-vindo ao Remap</h2>
            <button className="btn login">Log In</button>
            <button className="btn signup">Sign Up</button>
        </Home>
    )
}

export default Homepage;