import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../Styles/Homepage.css';
import Perfil from '../Images/Perfil.jpg';
import Filtros from '../Images/BotaoFiltros.svg';
import FiltrosAtivo from '../Images/BotaoFiltrosAtivo.svg';
import ArrowMenu from '../Images/ArrowMenu.svg';
import MenuComunidade from '../Images/MenuComunidade.svg';
import MenuEdificio from '../Images/MenuEdificio.svg';
import MenuGamehub from '../Images/MenuGamehub.svg';

const ProfilePicture = styled.div`
    margin: 0 0 15px 15px;
    background-image: url(${Perfil});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    border: solid 3px #ffa801;
    min-height: 80px;
    width: 80px;
`;  

function Homepage () {

    const [menu, setMenu] = useState('Fechado');
    const [filtros, setFiltros] = useState('Fechado');

    const abreMenu = id => {        
        setMenu(id);
    }

    const abreFiltros = id => {        
        setFiltros(id);
    }

    return(
        <div className="m-0 p-0">
            <div className="m-0 p-0 filtros">
                {
                    filtros === 'Fechado' ?
                        <img className="filtrosImagem" src={Filtros} onClick={() => abreFiltros('Aberto')}/>
                        :
                        <span>
                            <img className="filtrosImagem" src={FiltrosAtivo} onClick={() => abreFiltros('Fechado')}/>
                            <div className="filtrosAberto">
                                <p className="mb-0">Menu Filtrar</p>
                                <span className="linhaFiltro">
                                    <input type="checkbox" className="inputFiltro"/>
                                    <p className="mb-0">Favoritos</p>
                                </span>
                                <span className="linhaFiltro">
                                    <input type="checkbox" className="inputFiltro"/>
                                    <p className="mb-0">Próximidade</p>
                                </span>
                                <span className="linhaFiltro">
                                    <input type="checkbox" className="inputFiltro"/>
                                    <p className="mb-0">Perigoso</p>
                                </span>
                                <span className="linhaFiltro">
                                    <input type="checkbox" className="inputFiltro"/>
                                    <p className="mb-0">Fotogénico</p>
                                </span>
                            </div>
                        </span>
                }

            </div>
            <div className={`menu ${menu === "Aberto" ? "Aberto" : "Fechado"}`} onClick={menu === "Aberto" ? () => abreMenu('Fechado') : () => abreMenu('Aberto') }>
                {
                    menu === 'Fechado' ?
                        <img src={ArrowMenu} className="setaMenu"/>
                        :
                        <img src={ArrowMenu} className="setaMenu2"/>
                }
                <img src={MenuComunidade} className="imagemMenu"/>
                <img src={MenuEdificio} className="imagemMenu"/>
                <img src={MenuGamehub} className="imagemMenu"/>
            </div>
            <ProfilePicture className="fotografia"/>
            <MapContainer center={[41.032670, -8.551000]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default Homepage