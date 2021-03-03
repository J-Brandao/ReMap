import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import { fetchUtilizadorForPerfil } from '../../Firebase/Pedidos'
import { storage } from '../../Firebase/FbConfig';
import { Link } from 'react-router-dom';




const SugestaoPicture = styled.div`
      margin: 0 auto;
      background-image: url(${props=>props.imagem});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 50%;
      border: 2px solid #ffa801;
      min-height: 70px;
      width: 70px;
    `; 

function SingleSugestao({ sugestao, tipo, utilizador }) {
  
  const [user, setUser] = useState({})
  const [imagem, setImagem] = useState({})

  const fetchUser = async (userId) => {
    const response = await fetchUtilizadorForPerfil(userId)
    setUser(response)
  }

  useEffect(() => {
    if (sugestao) {
         fetchUser(sugestao.userId)
       }
  }, [sugestao])

  useEffect(() => {
    if (sugestao && user.imagemUser) {
        storage.ref('imagensUtilizadores').child(`${user.imagemUser}`).getDownloadURL().then((url) => {
            setImagem(url)
        })
    }  
},[sugestao, user])

  return (
    <>
    {tipo === 'perfil' ?
      <>
        <span className="col-3 p-0">
          <SugestaoPicture imagem={imagem}/>
        </span>
        <span className="col-9 pr-0">
          <p className="NomeComments">{user.nomeUtilizador}</p>
          <p className="textoComments">{sugestao.valor}</p>
        </span>
      </>
    :
      <>
        <span className="col-3 p-0">
          <SugestaoPicture imagem={imagem}/>
        </span>
        <span className="col-9 pr-0">
          {utilizador === user.userId ?
            <Link className="m-0 p-0" to={{
                pathname: `/perfil`,
                state: {
                  id: user.id
                }}}>
              <p className="NomeComments">{user.nomeUtilizador}</p>
            </Link>
            :
            <Link className="m-0 p-0" to={`/mapeador/${user.id}`}>
              <p className="NomeComments">{user.nomeUtilizador}</p>
            </Link>
          }
          <p className="textoComments">{sugestao.valor}</p>
        </span>
      </>
    }
    </>
  )
}

export default SingleSugestao
