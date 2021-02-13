import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Back from '../Images/BackArrow.svg';
import '../Styles/Mapeadores.css';
import ListaUtilizadores from '../Components/Mapeadores/ListaUtilizadores';
import Pesquisa from '../Components/Mapeadores/Pesquisa';

const Div = styled.div`
    margin: 40px 30px 0 30px;
`;

const SectionB = styled.section`
    margin: 20px 30px 20px 30px;
`;

const Button = styled.button`
    border: solid 2px #227093;
    border-radius: 0;
    height: 46px;
    font-size: 18px;
    color: #34495e;
`;

const ButtonS = styled.button`
    border: solid 2px #FFA801;
    background-color: rgba(255, 168, 1, 0.45);
    border-radius: 0;
    height: 46px;
    font-size: 18px;
    color: #34495e;
`;  


function Mapeadores() {

    const [seccao, setSeccao] = useState('Amigos');

    const MudaSeccao = id => {        
        setSeccao(id);
    }

    return(
        <div className="m-0 p-0">
            <Div>
                <section className="row col-12 p-0 m-0">
                    <span className="col-2 m-0 p-0">
                        <img src={Back}/>
                    </span>
                    <span className="col-8 tituloPagina offset-2 text-center m-0 p-0">
                        Mapeadores
                    </span>
                </section>
            </Div>

            {seccao === 'Amigos' ?
            <div className="row col-12 m-0 p-0">
                <ButtonS className="btn col-6 m-0 p-0">Amigos</ButtonS>
                <Button className="btn col-6 m-0 p-0" onClick = {() => MudaSeccao('Comunidade')}>Comunidade</Button>
            </div>
            :
            <div className="row col-12 m-0 p-0">
                <Button className="btn col-6 m-0 p-0" onClick = {() => MudaSeccao('Amigos')}>Amigos</Button>
                <ButtonS className="btn col-6 m-0 p-0">Comunidade</ButtonS>
            </div>
            }

            <SectionB>
                <div className="m-0 p-0">
                    <Pesquisa/>
                </div>
                <ListaUtilizadores tipo={seccao}/>
            </SectionB>

            <style>
                {`
                .progress {
                    background-color: #000000;
                    height: 7px;
                }
                
                .bg-custom {
                    background-color: #ffa801;
                    color: white;
                }
                `}
            </style>
        </div>
    )
}

export default Mapeadores;