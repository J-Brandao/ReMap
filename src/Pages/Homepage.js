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
import { useSelector, useDispatch } from 'react-redux';
import { getEdificioList } from '../Store/Edificios/Actions';
import { useAuth0 } from '@auth0/auth0-react';

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
    map.setView([latitude, longitude], 16);
    /*map.locate({
        setView: true,
        enableHighAccuracy: true
    });*/
    return null
}

function Homepage () {

    const { user, isLoading, isAuthenticated } = useAuth0();

    const [menu, setMenu] = useState('Fechado');
    const [coordenadas, setCoordenadas] = useState({lat: '0', long: '0'});
    const [filtros, setFiltros] = useState({
        proximidade: false
    })
    const EdificioList = useSelector(({Edificios}) => Edificios.data);
    const isLoadingEdificio = useSelector(({ Edificios }) => Edificios.isLoading)
    const dispatch = useDispatch();

    const abreMenu = id => {        
        setMenu(id);
    }

    useEffect(() => {
        dispatch(getEdificioList())
        //podemos usar o watchPosition para receber de X em X tempo
        navigator.geolocation.getCurrentPosition((position) => {
            setCoordenadas({lat: position.coords.latitude, long: position.coords.longitude});
        })
    }, [])

    const atualiza = tipo => {
        filtros[tipo] = !filtros[tipo];
        setFiltros({...filtros})
    }

    if(isLoadingEdificio) {
        return (
            <div className="row col-12 justify-content-center bgWhite">
                <div>Loading</div>
            </div>
        )
    }

    return(
        <div className="m-0 p-0">
            {console.log(EdificioList)}
            {console.log(filtros)}
            {console.log(isAuthenticated, user)}
            <div className="m-0 p-0 filtros">
                <Filtros filtro={atualiza}/>
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
                <Link
                    to={{
                        pathname:'/novo',
                        state: {
                            localizacao: [coordenadas.lat, coordenadas.long]
                        }
                    }}>
                    <img src={MenuEdificio} className="imagemMenu"/>
                </Link>
                <Link to="/gamehub">
                    <img src={MenuGamehub} className="imagemMenu"/>
                </Link>
            </div>
            <Link className="m-0 p-0" to="/perfil">
                <ProfilePicture className="fotografia"/>
            </Link>
            <MapContainer center={[coordenadas.lat, coordenadas.long]} zoom={20}>
                <GetLocation latitude={coordenadas.lat} longitude={coordenadas.long}/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    filtros.proximidade === true ?
                    <>
                        {EdificioList.map((edificio, key) => (
                            <>
                            {edificio.localizacao[0] <= coordenadas.lat + 0.01 && edificio.localizacao[0] >= coordenadas.lat - 0.01 && edificio.localizacao[1] <= coordenadas.long + 0.01 && edificio.localizacao[1] >= coordenadas.long - 0.01 ?
                                <Marker key={key} position={[edificio.localizacao[0], edificio.localizacao[1]]}>
                                    <Popup position={[edificio.localizacao[0], edificio.localizacao[1]]}>
                                        <Link to="/edificio"><h3>{edificio.nomeEdificio}</h3></Link>
                                    </Popup>
                                </Marker>
                                :
                                <>
                                </>
                            }
                            </>
                        ))}
                    </>
                    :
                    <>
                    {EdificioList.map((edificio, key) => (
                        <Marker key={key} position={[edificio.localizacao[0], edificio.localizacao[1]]}>
                            <Popup position={[edificio.localizacao[0], edificio.localizacao[1]]}>
                                <Link to="/edificio"><h3>{edificio.nomeEdificio}</h3></Link>
                            </Popup>
                        </Marker>
                    ))}
                    </>
                }
            </MapContainer>
        </div>
    )
}

export default Homepage