import {
    UTILIZADORES_GET_START,
    UTILIZADORES_GET_SUCCESS,
    UTILIZADOR_GET_START,
    UTILIZADOR_GET_SUCCESS,
    UTILIZADOR_OWN_GET_START,
    UTILIZADOR_OWN_GET_SUCCESS,
    UTILIZADOR_CREATE_SUCCESS,
    UTILIZADOR_DELETE_SUCCESS,
    UTILIZADOR_UPDATE_SUCCESS,
    UTILIZADOR_UPDATE_START
  } from '../Actions/Constants'
  
  const initialState = {
    isLoading: true,
    isLoadingSelf: true,
    data: [],
    user: {},
    ownUser: {},
  };
  
  export default (state = initialState, { type, payload }) => {
    let data;
    
    switch(type) {
      case UTILIZADORES_GET_START:
        return { ...state, isLoading: true };
      case UTILIZADORES_GET_SUCCESS:
        return { ...state, data: payload, isLoading: false };
      case UTILIZADOR_GET_START:
        return { ...state, isLoading: true };
      case UTILIZADOR_GET_SUCCESS:
        return { ...state, isLoading: false, user: payload };
      case UTILIZADOR_OWN_GET_START:
        return { ...state, isLoadingSelf: true };
      case UTILIZADOR_OWN_GET_SUCCESS:
        return { ...state, isLoadingSelf: false, ownUser: payload };
      case UTILIZADOR_UPDATE_START:
        return {...state, isLoading:true}
      case UTILIZADOR_UPDATE_SUCCESS:
      data = state.data.map((utilizador) => {
        if (utilizador.id !== payload.id) {
          return utilizador;
        }

        return payload;
      });

      return { ...state, isLoading:false, data };
      case UTILIZADOR_CREATE_SUCCESS:
        return { ...state, data: [payload] };
      //case FAVLIST_DELETE_SUCCESS:
        //return { ...state, data };
      default:
        return state;
    }
  }