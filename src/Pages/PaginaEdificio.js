import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Back from '../Images/BackArrow.svg';
import More from '../Images/More.svg';
import Perfil from '../Images/Perfil.jpg';
import '../Styles/PaginaEdificio.css';
import Galeria from '../Components/PaginaEdificio/Galeria';
import Classificacao from '../Components/PaginaEdificio/Classificacao';
import ArrowMap from '../Images/ArrowMap.svg';
import Book from '../Images/Book.svg';
import Camera from '../Images/Camera.svg';
import BackArrow from '../Components/Geral/BackArrow';
import {useAuth0} from "@auth0/auth0-react";
import { getEdificio } from '../Store/Edificios/Actions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Components/Geral/Loading';
import Comentarios from '../Components/PaginaEdificio/Comentarios';
import Sugestoes from '../Components/PaginaEdificio/Sugestoes';

const Div = styled.div`
    margin: 40px 30px 0 30px;
`;

const ProfilePicture = styled.div`
    margin: 0 auto;
    background-image: url(${Perfil});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    border: solid 3px #ffa801;
    min-height: 60px;
    width: 60px;
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

function PaginaEdificio(props) {
    const dispatch = useDispatch();
    const {logout} = useAuth0()
    
    const [seccao, setSeccao] = useState('Sugestões');
    const edificio = useSelector(({ Edificios }) => Edificios.data );
    const isLoadingEdificio = useSelector(({ Edificios }) => Edificios.isLoading)
    

    useEffect(() => {
        dispatch(getEdificio(props.match.params.id));
    }, [])

    const MudaSeccao = id => {        
        setSeccao(id);
    }

    if (isLoadingEdificio) {
        return (
            <Loading />
        )
    }

    return(
        <div className="m-0 p-0">
            
            <Div>
                <section className="row col-12 m-0 p-0">
                    <BackArrow />
                    <span className="col-8 inicio row justify-content-center m-0 p-0">
                        <span className="col-4 p-0">
                            <ProfilePicture/>
                        </span>
                        <span className="col-8 p-0 pl-1">
                            <p className="nomeUser">Pedro Alves</p>
                            <p className="extraInfoUser">Inserido em: 02/01/2021</p>
                            <p className="extraInfoUser">Niv. 38</p>
                        </span>
                    </span>
                    <span className="col-2 text-right m-0 p-0">
                        <img src={More}/>
                    </span>
                </section>
                <h2 className="nomeEdificio p-0 pb-2">Antiga Câmara Municipal</h2>
                <section className="row col-12 m-0 p-0">
                        <h5 id="seccaoTitulo">Informações do Edifiício</h5>
                        <p id="descricaoEdificio">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </section>
                <section className="row col-12 m-0 p-0">
                        <h5 id="seccaoTitulo">Galeria de Imagens</h5>
                        <Galeria/>
                        <span className="col-12 mx-0 px-0 text-right mt-2">
                            <button onClick={()=>logout()} className="botaoFotografia">Nova Fotografia</button>
                        </span>
                </section>

                <Classificacao/>

                <section className="row col-12 m-0 p-0 mt-3">
                        <h5 id="seccaoTitulo">Crachás</h5>
                        <span className="row col-12 m-0 px-0 py-2 justify-content-center">
                            <span className="col-4 m-0 p-0 text-center">
                                <img className="m-0 imgCracha" src={ArrowMap}/>
                                <p className="m-0 p-0 nomeCracha">Marco Importante</p>
                            </span>
                            <span className="col-4 m-0 p-0 text-center">
                                <img className="m-0 imgCracha" src={Camera}/>
                                <p className="m-0 p-0 nomeCracha">Fotografo Nato</p>
                            </span>
                            <span className="col-4 m-0 p-0 text-center">
                                <img className="m-0 imgCracha" src={Book}/>
                                <p className="m-0 p-0 nomeCracha">Historiador</p>
                            </span>
                        </span>
                </section>
            </Div>
            {seccao === 'Sugestões' ?
            <div className="row col-12 m-0 mt-3 p-0">
                <ButtonS className="btn col-6 m-0 p-0">Sugestões</ButtonS>
                <Button className="btn col-6 m-0 p-0" onClick = {() => MudaSeccao('Comentários')}>Comentários</Button>
            </div>
            :
            <div className="row col-12 m-0 mt-3 p-0">
                <Button className="btn col-6 m-0 p-0" onClick = {() => MudaSeccao('Sugestões')}>Sugestões</Button>
                <ButtonS className="btn col-6 m-0 p-0">Comentários</ButtonS>
            </div>
            }
            {seccao === 'Sugestões' ?
            <Sugestoes/>
            :
            <Comentarios/>
            }
        </div>
    )
}

export default PaginaEdificio;