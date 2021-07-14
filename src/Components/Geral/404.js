import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background.png';
import {Link} from 'react-router-dom';

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
function error404() {

    
    return (
        
            <Div class="content" role="main">
                <a href=""><img src={Broken} srcset="" width="135" height="135" alt="Responsive image"/></a>
                <h3>Página não encontrada</h3>
                    <h2>404</h2>
                    <p>Não conseguimos encontrar a página que procura</p>

                    <p style={{"clear":"both"}}>Volte à < Link to="/homepage">página inicial</Link></p>
        </Div>
      
    )
}

export default error404