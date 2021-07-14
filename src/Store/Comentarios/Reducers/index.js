import {
    COMENTARIOS_GET_START,
    COMENTARIOS_GET_SUCCESS,
    COMENTARIO_CREATE_START,
    COMENTARIO_CREATE_SUCCESS,
  } from '../Actions/Constants'
  
  const initialState = {
    isLoading: true,
    isLoadingCreation: false,
    data: [],
    dataSingle: {},
  };
  
  export default (state = initialState, { type, payload }) => {
    let data;
    
    switch(type) {
      case COMENTARIOS_GET_START:
        return { ...state, isLoading: true };
      case COMENTARIOS_GET_SUCCESS:
        return { ...state, data: payload, isLoading: false };
      case COMENTARIO_CREATE_START:
        return { ...state, isLoadingCreation: true };
      case COMENTARIO_CREATE_SUCCESS:
        return { ...state, dataSingle: payload, isLoadingCreation:false };
      default:
        return state;
    }
  }