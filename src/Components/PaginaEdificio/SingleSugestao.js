import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import { fetchUtilizadorForPerfil } from '../../Firebase/Pedidos'
import { storage } from '../../Firebase/FbConfig';




const SugestaoPicture = styled.div`
      margin: 0 auto;
      background-image: url(${props=>props.imagem});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 50%;
      min-height: 70px;
      width: 70px;
    `; 

function SingleSugestao({ sugestao }) {
  
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
            <span className="col-3 p-0">
        <SugestaoPicture imagem={imagem}/>
            </span>
            <span className="col-9 pr-0">
        <p className="NomeComments">{user.nomeUtilizador}</p>
                <p className="textoComments">{sugestao.valor}</p>
                    </span>
                   </>
  )
}

export default SingleSugestao
