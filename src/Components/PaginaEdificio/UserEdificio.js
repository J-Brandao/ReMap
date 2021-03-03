import React, {useState, useEffect} from 'react';
import { getUtilizadorForPerfil } from '../../Store/Utilizadores/Actions'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Perfil from '../../Images/Perfil.jpg';
import { storage } from '../../Firebase/FbConfig';

const ProfilePicture = styled.div`
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    border: solid 3px #ffa801;
    min-height: 60px;
    width: 60px;
`;

function UserEdificio({userId, data}) {
    const dispatch = useDispatch();
    const [imagem, setImagem] = useState(null);
    const utilizador = useSelector(({Utilizadores})=> Utilizadores.user);
    const isLoadingUser = useSelector(({Utilizadores})=> Utilizadores.isLoading);

    useEffect(() => {
        dispatch(getUtilizadorForPerfil(userId))
    },[])
    useEffect(() => {
        if(utilizador){
            storage.ref('imagensUtilizadores').child(`${utilizador.imagemUser}`).getDownloadURL().then((url) => {
                setImagem(url)
            })
        }
    },[utilizador])

    if(isLoadingUser) {
        return(
            <span className="col-8 inicio row justify-content-center m-0 p-0"></span>
        )
    }

    return(
        <span className="col-8 inicio row justify-content-center m-0 p-0">
            <span className="col-4 p-0">
                <ProfilePicture style={{backgroundImage: `url(${imagem})`}}/>
            </span>
            <span className="col-8 p-0 pl-1">
                <p className="nomeUser">{utilizador.nomeUtilizador}</p>
                <p className="extraInfoUser">Inserido em: {data}</p>
                <p className="extraInfoUser">Niv. 38</p>
            </span>
        </span>        
    )
}

export default UserEdificio;