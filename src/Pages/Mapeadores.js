import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Back from '../Images/BackArrow.svg';
import '../Styles/Mapeadores.css';
import ListaUtilizadores from '../Components/Mapeadores/ListaUtilizadores';
import Pesquisa from '../Components/Mapeadores/Pesquisa';
import BackArrow from '../Components/Geral/BackArrow';
import { getUtilizadoresList } from '../Store/Utilizadores/Actions';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react'
import Loading from '../Components/Geral/Loading'

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

    const [value, setValue] = useState("");
    const [seccao, setSeccao] = useState('Amigos');
    const {isLoading, user} = useAuth0()
    const UtilizadoresList = useSelector(({Utilizadores}) => Utilizadores.data);
    const isLoadingUtilizadores = useSelector(({ Utilizadores }) => Utilizadores.isLoading)
    const dispatch = useDispatch();

    const onChange = (e) => {
        setValue(e.currentTarget.value);

    }

    const MudaSeccao = id => { 
        setSeccao(id);
    }

    useEffect(() => {
        dispatch(getUtilizadoresList())
    }, [])

    if(isLoadingUtilizadores || isLoading) {
        return (
            <Loading/>
        )
    }

    return(
        <div className="m-0 p-0">
            <Div>
            {console.log(UtilizadoresList, user)}
                <section className="row col-12 p-0 m-0">
                    <BackArrow />
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
                    <Pesquisa onChange={onChange} value={value}/>
                </div>
                {UtilizadoresList.map((userInfo, index) => {
                    if (user.email === userInfo.userId)
                       return <ListaUtilizadores user={userInfo} tipo={"own"}/>
                })}
                {UtilizadoresList.map((userInfo, index) => {
                    if (user.email === userInfo.userId) return null
                    if (userInfo.nomeUtilizador.includes(value))
                    return <ListaUtilizadores tipo={seccao} user={userInfo} />
                })}
                
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