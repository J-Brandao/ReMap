import React from 'react';
import styled from 'styled-components';
import Logo from '../../Images/Logo.svg';
import Background from '../../Images/Background.png'

const Div = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: 100% auto;
`;

function Loading() {
    return(
        <Div>
            <img alt="Logo Remap mb-0" src={Logo}/>
            <h2 style={{color: '#34495e', fontWeight: '700', fontSize: '25px'}}>A carregar o conteúdo...</h2>
        </Div>
    )
}

export default Loading