import {
  FRIEND_ALL_GET_START,
  FRIEND_ALL_GET_SUCCESS,
  FRIEND_ALL_GET_ERROR,

  FRIEND_GET_START,
  FRIEND_GET_SUCCESS,
  FRIEND_GET_ERROR,

  FRIEND_CREATE_START,
  FRIEND_CREATE_SUCCESS,
  FRIEND_CREATE_ERROR,

  FRIEND_DELETE_START,
  FRIEND_DELETE_SUCCESS,
  FRIEND_DELETE_ERROR
} from './constants'
import { fetchAllFriends, fetchFriends, createFriends, deleteFriends } from "../../../Firebase/Pedidos";

export const getAllFriends = (userId) => {
  return (dispatch) => {
    dispatch({ type: FRIEND_ALL_GET_START });
    fetchAllFriends(userId)
      .then(friends => {
      dispatch({type:FRIEND_ALL_GET_SUCCESS, payload: friends})
      })
    .catch(()=> dispatch({type:FRIEND_ALL_GET_ERROR}))
  }
}

export const getFriends = (userId, friendId) => {
  
  return (dispatch) => {
    dispatch({ type: FRIEND_GET_START });
    fetchFriends(userId, friendId)
      .then(friend => {
       
      dispatch({type: FRIEND_GET_SUCCESS, payload:friend})
      }).catch((e) => {
        
      dispatch({type:FRIEND_GET_ERROR})
    })
  }
}

export const createFriend = (friendName = '', userId = '', friendId = '', imageFriend = 'Placeholder.jpg', ownUser) => {
  return (dispatch, getState) => {
    dispatch({ type: FRIEND_CREATE_START })
    
    createFriends(getState().token, friendName, userId, friendId, imageFriend, ownUser)
      .then(friend => {
      dispatch({ type: FRIEND_CREATE_SUCCESS, payload:friend})
    })
    .catch(()=>dispatch({type:FRIEND_CREATE_ERROR}))
  }
}

export const deleteFriend = (id, ownUser) => {
  return (dispatch, getState) => {
    dispatch({ type: FRIEND_DELETE_START });

    deleteFriends(getState().token, id, ownUser)
      .then(() => {
      dispatch({type: FRIEND_DELETE_SUCCESS, payload: false})
      })
    .catch(()=>dispatch({type:FRIEND_DELETE_ERROR}))
  }
}