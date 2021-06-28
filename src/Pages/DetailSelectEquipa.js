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

const BackgroundDiv = styled.div`
    margin: auto;
    background-color: #F8A46F;
    border-radius: 50%;
    min-height: 246px;
    width: 246px;
    line-height: 246px;
`;

const BackgroundDiv2 = styled.div`
    margin: auto;
    background-color: #92D1DF;
    border-radius: 50%;
    min-height: 246px;
    width: 246px;
    line-height: 246px;
`;

const BackgroundDiv3 = styled.div`
    margin: auto;
    background-color: #CCE6C1;
    border-radius: 50%;
    min-height: 246px;
    width: 246px;
    line-height: 246px;
`;

function DetailSelectEquipa() {

    const [equipa, setEquipa] = useState(1);

    const mudaEquipa = ((valor) => {
        let equipaNovo;
        if(valor == "menos") {
            equipaNovo = equipa - 1;
            if(equipaNovo <= 0) {
                equipaNovo = 3;
                setEquipa(equipaNovo);
            } else {
                setEquipa(equipaNovo);
            }
        }
        if(valor == "mais") {
            equipaNovo = equipa + 1;
            if(equipaNovo >= 4) {
                equipaNovo = 1;
                setEquipa(equipaNovo);
            } else {
                setEquipa(equipaNovo);
            }
        }
      })

    return(
        <Home>
            {equipa === 1 ?
                <h1 className="tituloEquipa">Historiadores</h1>
                :
                equipa === 2 ?
                <h1 className="tituloEquipa">Fotógrafos</h1>
                :
                <h1 className="tituloEquipa">Arquitetos</h1>
            }
            <section className="row m-0 p-0 w-100 mb-3">
                <span className="col-2 m-0 p-0 my-auto text-center" onClick={() => mudaEquipa("menos")}>
                    <img className="m-auto" src={SetaSelectEquipa}/>
                </span>
                <span className="col-8 m-0 p-0">
                    {equipa === 1 ?
                        <BackgroundDiv className="text-center">
                            <img className="m-auto mainImage" src={Scroll}/>
                        </BackgroundDiv>
                        :
                        equipa === 2 ?
                        <BackgroundDiv2 className="text-center">
                            <img className="m-auto mainImage" src={Photographer}/>
                        </BackgroundDiv2>
                        :
                        <BackgroundDiv3 className="text-center">
                            <img className="m-auto mainImage" src={Architect}/>
                        </BackgroundDiv3>
                    }
                </span>
                <span className="col-2 m-0 p-0 my-auto text-center" onClick={() => mudaEquipa("mais")}>
                    <img className="m-auto setinha" src={SetaSelectEquipa}/>
                </span>
            </section>
            <section className="w-100 m-0 p-0 text-center">
                <button className="btn butEscolhe">Escolher</button>
            </section>
            <section className="w-100 m-0 p-0 text-center">
                {equipa === 1 ?
                    <p className="textoEquipa m-auto">A história faz parte de ti! Não consegues passar por um edifício sem pegar no telemóvel para investigar mais sobre o seu passado</p>
                    :
                    equipa === 2 ?
                    <p className="textoEquipa m-auto">Para ti, o ato de capturar a essência de um edifício traz-te júbilo. Estás sempre com uma câmara em punho pronto para capturar estas obras</p>
                    :
                    <p className="textoEquipa m-auto">Para ti, imaginar o que um edifício se poderá tornar é o principal. Estás sempre com a imaginação a trabalhar!</p>
                }
            </section>
        </Home>
    )
}

export default DetailSelectEquipa;