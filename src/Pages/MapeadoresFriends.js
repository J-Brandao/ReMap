import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import '../Styles/Mapeadores.css';
import ListaUtilizadores from '../Components/Mapeadores/ListaUtilizadores';
import Pesquisa from '../Components/Mapeadores/Pesquisa';
import Header from "../Components/Mapeadores/Header"
import { getUtilizadorById, getUtilizadoresList } from '../Store/Utilizadores/Actions';
import {getAllFriends} from '../Store/Friends/Actions'
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory, Link } from 'react-router-dom';
import Loading from '../Components/Geral/Loading'




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
    
    const history = useHistory();
    const [value, setValue] = useState("");
    const {isLoading, user} = useAuth0()
    const UtilizadoresList = useSelector(({Utilizadores}) => Utilizadores.data);
    const isLoadingUtilizadores = useSelector(({ Utilizadores }) => Utilizadores.isLoading)
    const isLoadingSelf = useSelector(({ Utilizadores }) => Utilizadores.isLoadingSelf)
    const ownUser = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const FriendsList = useSelector(({ Friends }) => Friends.dataArray)
    const isLoadingFriends = useSelector(({Friends})=>Friends.isLoading)
    const dispatch = useDispatch();

    const onChange = (e) => {
        setValue(e.currentTarget.value);

    }

    const changeSection = () => {
        history.push("/mapeadores/comunidade")
    }

    useEffect(() => {
        if (Object.keys(ownUser).length === 0) {
            if (!isLoading && user) {
                dispatch(getUtilizadorById(user.email))
            }
        } 
            
    }, [isLoading])

    useEffect(() => {
        if (!isLoadingSelf) {
            
        dispatch(getAllFriends(ownUser.id))
       }
    }, [isLoadingSelf])

    

    if(isLoading || isLoadingSelf || isLoadingFriends) {
        return (
            <Loading/>
        )
    }

    return(
        <div className="m-0 p-0">
            
            <Header />
           
            <div className="row col-12 m-0 p-0">
                <ButtonS className="btn col-6 m-0 p-0">Amigos</ButtonS>
                
                <Button className="btn col-6 m-0 p-0" onClick={()=>changeSection()}>Comunidade</Button>
                
            </div>
            

            <SectionB>
                <div className="m-0 p-0">
                    <Pesquisa onChange={onChange} value={value}/>
                </div>
                
                        <Link className="m-0 p-0" to={`/perfil/${ownUser.id}`}>
                            <ListaUtilizadores user={ownUser} tipo={"own"}/>
                </Link>
                
                
                       
                        {FriendsList.map((userSingle, index) => {
                            
                            if (ownUser.id === userSingle.id) return null
                            if (userSingle.nomeFriend.includes(value))
                                return (
                                    <Link className="m-0 p-0" to={`/perfil/${userSingle.id}`}>
                                        <ListaUtilizadores tipo={"Amigos"} user={userSingle} />
                                    </Link>
                                )
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