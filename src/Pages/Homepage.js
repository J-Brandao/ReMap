import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import '../Styles/Homepage.css';
import Perfil from '../Images/Perfil.jpg';
import ArrowMenu from '../Images/ArrowMenu.svg';
import MenuComunidade from '../Images/MenuComunidade.svg';
import MenuEdificio from '../Images/MenuEdificio.svg';
import MenuGamehub from '../Images/MenuGamehub.svg';
import Filtros from '../Components/Homepage/Filtros';

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

function GetLocation ({latitude, longitude}) {
    const map = useMap();
    map.setView([latitude, longitude], 17);
    /*map.locate({
        setView: true,
        enableHighAccuracy: true
    });*/
    return null
}

function Homepage () {

    const [menu, setMenu] = useState('Fechado');
    const [coordenadas, setCoordenadas] = useState({lat: '0', long: '0'});

    const abreMenu = id => {        
        setMenu(id);
    }

    useEffect(() => {
        //podemos usar o watchPosition para receber de X em X tempo
        navigator.geolocation.getCurrentPosition((position) => {
            setCoordenadas({lat: position.coords.latitude, long: position.coords.longitude});
        })
    }, [setCoordenadas])

    return(
        <div className="m-0 p-0">
            {console.log(coordenadas)}
            <div className="m-0 p-0 filtros">
                <Filtros/>
            </div>
            <div className={`menu ${menu === "Aberto" ? "Aberto" : "Fechado"}`} onClick={menu === "Aberto" ? () => abreMenu('Fechado') : () => abreMenu('Aberto') }>
                {
                    menu === 'Fechado' ?
                        <img src={ArrowMenu} className="setaMenu"/>
                        :
                        <img src={ArrowMenu} className="setaMenu2"/>
                }
                <Link to="/mapeadores">
                    <img src={MenuComunidade} className="imagemMenu"/>
                </Link>
                <Link to="/novo">
                    <img src={MenuEdificio} className="imagemMenu"/>
                </Link>
                <Link to="/gamehub">
                    <img src={MenuGamehub} className="imagemMenu"/>
                </Link>
            </div>
            <ProfilePicture className="fotografia"/>
            <MapContainer center={[coordenadas.lat, coordenadas.long]} zoom={20}>
                <GetLocation latitude={coordenadas.lat} longitude={coordenadas.long}/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coordenadas.lat, coordenadas.long]}>
                    <Popup position={[coordenadas.lat, coordenadas.long]}>
                        Hey badalhoca, cheiras a cu de cavalo.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Homepage