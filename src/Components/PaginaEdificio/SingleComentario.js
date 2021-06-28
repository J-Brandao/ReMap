import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import { fetchUtilizadorForPerfil } from '../../Firebase/Pedidos'
import { storage } from '../../Firebase/FbConfig';
import { Link } from 'react-router-dom';
import ThumbsUp from '../../Images/ThumbsUp.svg';
import ThumbsDown from '../../Images/ThumbsDown.svg';




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

const TextArea = styled.span`
    border-radius: 10px;
    background-color: #F2F2F2;
    padding-right: 10px;
`;

const ThumbsBg = styled.div`
    border-radius: 50%;
    background-color: #C0C0C0;
    border: solid 2px #34495E;
    height: 30px;
    width: 30px;
    margin: auto 5px;
`;

const ThumbsBg2 = styled.div`
    border-radius: 50%;
    background-color: #4DE926;
    border: solid 2px #34495E;
    height: 30px;
    width: 30px;
    margin: auto 5px;
`;

const LikeDiv = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    text-align: center;
    justify-content: flex-end;
`;


function SingleComentario({ comment, tipo, utilizador }) {
  
  const [user, setUser] = useState({})
  const [imagem, setImagem] = useState({})
  const [like, setLike] = useState('false')

  const daLike = (() => {
    setLike('true');
  })

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
    {tipo === 'perfil' ?
    <>
      <span className="col-3 p-0">
        <CommentPicture calssName="my-2" imagem={imagem}/>
      </span>
      <span className="col-9 pr-0 my-2">
        <p className="NomeComments">{user.nomeUtilizador}</p>
        <p className="textoComments">{comment.valor}</p>
      </span>
    </>
    :
    <>
      <span className="col-3 p-0">
        <CommentPicture className="my-2" imagem={imagem}/>
      </span>
      <TextArea className="col-9 pr-3 pt-2 my-2">
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
        <p className="textoComments mb-1">{comment.valor}</p>

        <LikeDiv className="m-0 p-0 mb-1">
          {like === 'false' ?
            <ThumbsBg onClick={() => daLike()}>
              <img className="m-0" style={{height:`18px`}} src={ThumbsUp}/>
            </ThumbsBg>
            :
            <ThumbsBg2>
              <img className="m-0" style={{height:`18px`}} src={ThumbsUp}/>
            </ThumbsBg2>
          }
          <ThumbsBg>
            <img className="m-0" style={{height:`18px`}} src={ThumbsDown}/>
          </ThumbsBg>
        </LikeDiv>
        
      </TextArea>
    </>
    }
    </>
  )
}

export default SingleComentario
