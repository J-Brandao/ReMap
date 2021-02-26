import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createFriend, getFriends, deleteFriend} from '../../Store/Friends/Actions'
import styled from "styled-components"
import { ReactComponent as CheckMark } from "../../Images/CheckMark.svg"
import { ReactComponent as AddFriend} from "../../Images/AdicionarAmigo.svg"

function FriendButton({friendId, userId, friendName, imageFriend}) {
const dispatch = useDispatch()
  const isFriend = useSelector(({ Friends }) => Friends.data)
  const isLoadingFriendship = useSelector(({ Friends }) => Friends.isLoadingFriendship)
  
  
  useEffect(() => {
    dispatch(getFriends(userId, friendId)) 
  }, [dispatch, userId, friendId])

  const onCreateFriend = (friendName, userId, friendId, imageFriend) => {
    dispatch(createFriend(friendName, userId, friendId, imageFriend))
  }

  const onDeleteFriend = (id) => {
    dispatch(deleteFriend(id))
  }

  if (isLoadingFriendship) {
    return null
  }
  console.log(isFriend)
  
  return (
    <>
      {}
      {isFriend ?
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