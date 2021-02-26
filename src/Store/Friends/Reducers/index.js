import {
  FRIEND_ALL_GET_START,
  FRIEND_ALL_GET_SUCCESS,
  

  FRIEND_GET_START,
  FRIEND_GET_SUCCESS,
  FRIEND_GET_ERROR,

  FRIEND_CREATE_START,
  FRIEND_CREATE_SUCCESS,


  FRIEND_DELETE_START,
  FRIEND_DELETE_SUCCESS,
} from '../Actions/constants'

const initialState = {
  isLoading: true,
  dataArray: [],
  data: false,
}

export default (state = initialState, { type, payload }) => {
  
  
  switch (type) {
    case FRIEND_ALL_GET_START:
      return { ...state, isLoading: true };
    case FRIEND_ALL_GET_SUCCESS:
      return { ...state, isLoading:false, dataArray:payload}
    case FRIEND_GET_START:
      return { ...state, isLoading: true }
    case FRIEND_GET_SUCCESS:
      return { ...state, isLoading: false, data: payload }
    case FRIEND_GET_ERROR:
      return {...state, isLoading: false, data:payload}
    case FRIEND_CREATE_START:
      return { ...state, isLoading: true }
    case FRIEND_CREATE_SUCCESS:
      return { ...state, isLoading: false, data: payload }
    case FRIEND_DELETE_START:
      return { ...state, isLoading: true }
    case FRIEND_DELETE_SUCCESS:
      return { ...state, isLoading: false, data: payload }
    default:
      return state;
  }
}