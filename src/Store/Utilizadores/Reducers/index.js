import {
    UTILIZADORES_GET_START,
    UTILIZADORES_GET_SUCCESS,
    UTILIZADOR_GET_START,
    UTILIZADOR_GET_SUCCESS,
    UTILIZADOR_CREATE_SUCCESS,
    UTILIZADOR_DELETE_SUCCESS
  } from '../Actions/Constants'
  
  const initialState = {
    isLoading: true,
    data: []
  };
  
  export default (state = initialState, { type, payload }) => {
    let data;
    
    switch(type) {
      case UTILIZADORES_GET_START:
        return { ...state, isLoading: true };
      case UTILIZADORES_GET_SUCCESS:
        return { ...state, data: payload, isLoading: false };
      //case FAVPOKE_GET_START:
        //return { ...state, isLoading: true };
      //case FAVPOKE_GET_SUCCESS:
        //return { ...state, data: [payload], isLoading: false };
      case UTILIZADOR_CREATE_SUCCESS:
        return { ...state, data: [payload] };
      //case FAVLIST_DELETE_SUCCESS:
        //return { ...state, data };
      default:
        return state;
    }
  }