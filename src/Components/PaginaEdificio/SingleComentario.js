import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import { fetchUtilizadorForPerfil } from '../../Firebase/Pedidos'
import { storage } from '../../Firebase/FbConfig';




const CommentPicture = styled.div`
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

function SingleComentario({ comment }) {
  
  const [user, setUser] = useState({})
  const [imagem, setImagem] = useState({})

  const fetchUser = async (userId) => {
    const response = await fetchUtilizadorForPerfil(userId)
    setUser(response)
  }

  useEffect(() => {
    if (comment) {
         fetchUser(comment.userId)
       }
  }, [comment])

  useEffect(() => {
    if (comment && user.imagemUser) {
        storage.ref('imagensUtilizadores').child(`${user.imagemUser}`).getDownloadURL().then((url) => {
            setImagem(url)
        })
    }  
},[comment, user])

  return (
    <>
            <span className="col-3 p-0">
        <CommentPicture imagem={imagem}/>
            </span>
            <span className="col-9 pr-0">
        <p className="NomeComments">{user.nomeUtilizador}</p>
                <p className="textoComments">{comment.valor}</p>
                    </span>
                   </>
  )
}

export default SingleComentario
