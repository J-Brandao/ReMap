import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createFriend, getFriends, deleteFriend} from '../../Store/Friends/Actions'
import styled from "styled-components"
import { ReactComponent as CheckMark } from "../../Images/CheckMark.svg"
import { ReactComponent as AddFriend } from "../../Images/AdicionarAmigo.svg"
import {fetchFriends} from "../../Firebase/Pedidos"

function FriendButton({ friendId, userId, friendName, imageFriend }) {

  const dispatch = useDispatch()
  const [isFriend, setIsFriend] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingCreation = useSelector(({Friends})=>Friends.isLoadingCreation)
  
  async function fetch(userId, friendId) {
      setIsLoading(true);
      const response = await fetchFriends(userId, friendId);  
      setIsFriend(response)
      setIsLoading(false)
    }

  useEffect(() => { 
    
      fetch(userId, friendId)
    
  }, [friendId, userId, isLoadingCreation])


  const onCreateFriend = (friendName, userId, friendId, imageFriend) => {
    dispatch(createFriend(friendName, userId, friendId, imageFriend))
   
    
  }

  const onDeleteFriend = (id) => {
    
    dispatch(deleteFriend(id))
   
    
  }

 
  if (isLoading) {
    return null
  }
  
  
  return (
    <>{isFriend ?
        <Friend onClick={() => onDeleteFriend(isFriend.id)}><CheckMark width="30px" /></Friend>
        :
        <Friend onClick={() => onCreateFriend(friendName, userId, friendId, imageFriend)}><AddFriend width="30px" /></Friend>

    
    }
      
    </>
  )
}

export default FriendButton

const Friend = styled.button`
background-color:transparent;
width:auto;
border:none;
cursor:pointer;
`