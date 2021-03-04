import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { MapContainer, Marker, Popup, TileLayer, useMap, Circle } from 'react-leaflet';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/Homepage.css';
import Filtros from '../Components/Homepage/Filtros';
import { useSelector, useDispatch } from 'react-redux';
import { getEdificioList } from '../Store/Edificios/Actions';
import { getUtilizadorById, atualizaUtilizador } from '../Store/Utilizadores/Actions'
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Components/Geral/Loading';
import { storage } from '../Firebase/FbConfig';
import Menu from '../Components/Homepage/Menu';
import UserLocation from '../Images/UserLocation.svg';
import ModalReativarConta from '../Components/Modal/ModalReativarConta';
import L from 'leaflet';
import useAuthentication from "../Firebase/useAuthentication"


const ProfilePicture = styled.div`
    margin: 0 0 15px 15px;
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
    const history = useHistory()
    const [coordenadas, setCoordenadas] = useState({lat: '0', long: '0'});
    const [imagem, setImagem] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [filtros, setFiltros] = useState({
        proximidade: false,
        valor: 0
    })
    const EdificioList = useSelector(({ Edificios }) => Edificios.data);
    const ownUser = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const isLoadingEdificio = useSelector(({ Edificios }) => Edificios.isLoading)
    const isLoadingUser = useSelector(({Utilizadores}) => Utilizadores.isLoadingSelf)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEdificioList())
        //podemos usar o watchPosition para receber de X em X tempo
        navigator.geolocation.getCurrentPosition((position) => {
            setCoordenadas({lat: position.coords.latitude, long: position.coords.longitude});
        })
    }, [])
    useEffect(() => {
        if (user && !isLoading && isAuthenticated) {
            dispatch(getUtilizadorById(user.email))
        }
    },[user])
    useEffect(() => {
        if (ownUser && !isLoading && isAuthenticated) {
            storage.ref('imagensUtilizadores').child(`${ownUser.imagemUser}`).getDownloadURL().then((url) => {
                setImagem(url)
                checkActive()
            })
        }
    }, [ownUser]);
    useAuthentication()

    const closeModal = () => {
        setShowModal(false);
        history.push("/");
    }
    const activateAccount = () => {
        setShowModal(false);
        dispatch(atualizaUtilizador(ownUser.id, ownUser.userId, ownUser.imagemUser, ownUser.nomeownUser, ownUser.biografia, ownUser.cidade, ownUser.role, true))

    }

    const checkActive = () => {
        if (!ownUser.active) {
            setShowModal(true)
        }
    }
    
    const atualiza = (tipo, value) => {
        if(filtros.valor === 0) {
            filtros.valor = value;
            filtros[tipo] = !filtros[tipo];
        } else {
            filtros.valor = 0;
            filtros[tipo] = !filtros[tipo];
        }
        setFiltros({...filtros})
    }

    
    const hasUser = () => {
        if (!ownUser || ownUser === {})
            return true
        return false
    }

    const getIcon = (_iconSize) => {
        return L.icon({
            iconUrl: UserLocation,
            iconSize: _iconSize,
        })
    }

    if (isLoading || isLoadingEdificio || isLoadingUser) {
        return (
            <Loading />
        )
    }

    return (
        <>
        <div className="m-0 p-0">
            {hasUser() &&
                history.push("/finalizar")}
            
            <div className="m-0 p-0 filtros">
                <Filtros filtro={atualiza} valorFiltro={filtros.valor}/>
            </div>
            <Menu coordenadas={coordenadas} userId={ownUser.id}/>
            <Link className="m-0 p-0" to={{
                        pathname: `/perfil`,
                        state: {
                            id: ownUser.id
                        }
                        }}>
                <ProfilePicture className="fotografia" style={{backgroundImage: `url(${imagem})`}}/>
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
                            {edificio.localizacao[0] <= coordenadas.lat + filtros.valor && edificio.localizacao[0] >= coordenadas.lat - filtros.valor && edificio.localizacao[1] <= coordenadas.long + filtros.valor && edificio.localizacao[1] >= coordenadas.long - filtros.valor ?
                                <Marker key={key} position={[edificio.localizacao[0], edificio.localizacao[1]]}>
                                    <Popup position={[edificio.localizacao[0], edificio.localizacao[1]]}>
                                        <Link to={`/edificio/${edificio.id}`}><h3>{edificio.nomeEdificio}</h3></Link>
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
                                <Link to={`/edificio/${edificio.id}`}><h3>{edificio.nomeEdificio}</h3></Link>
                            </Popup>
                        </Marker>
                    ))}
                    </>
                }
                <Marker position={[coordenadas.lat, coordenadas.long]} icon={getIcon(40)}/>
                
            </MapContainer>

            </div>
            <ModalReativarConta show={showModal} onHide={closeModal} activateAccount={activateAccount}/>
        </>
    )
}

export default Homepage