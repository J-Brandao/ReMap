import React, {useEffect} from 'react';
import '../Styles/LandingPage.css';
import '../Styles/DetailSelectEquipa.css'
import styled from 'styled-components';
import Background from '../Images/Background.png';
import Scroll from '../Images/scroll.svg';
import SetaSelectEquipa from '../Images/SetaSelectEquipa.svg';

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

const BackgroundDiv = styled.div`
    margin: auto;
    background-color: #F8A46F;
    border-radius: 50%;
    min-height: 246px;
    width: 246px;
    line-height: 246px;
`;

function DetailSelectEquipa() {

    return(
        <Home>
            <h1 className="tituloEquipa">Historiadores</h1>
            <section className="row m-0 p-0">
                <span className="col-2 m-0 p-0 my-auto">
                    <img className="m-auto" src={SetaSelectEquipa}/>
                </span>
                <span className="col-8 m-0 p-0">
                    <BackgroundDiv className="text-center">
                        <img className="m-auto mainImage" src={Scroll}/>
                    </BackgroundDiv>
                </span>
                <span className="col-2 m-0 p-0 my-auto text-right">
                    <img className="m-auto setinha" src={SetaSelectEquipa}/>
                </span>
            </section>
        </Home>
    )
}

export default DetailSelectEquipa;