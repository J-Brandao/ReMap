import React from 'react';
import styled from 'styled-components';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../Styles/Homepage.css';
import Perfil from '../Images/Perfil.jpg';

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
    return(
        <div className="m-0 p-0">
            <div className="menu">batata</div>
            <ProfilePicture className="fotografia"/>
            <MapContainer center={[41.032670, -8.551000]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default Homepage