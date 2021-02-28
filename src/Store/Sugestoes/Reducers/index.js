import {
    SUGESTOES_GET_START,
    SUGESTOES_GET_SUCCESS,
    SUGESTAO_CREATE_SUCCESS,
  } from '../Actions/Constants'
  
  const initialState = {
    isLoading: true,
    data: []
  };
  
  export default (state = initialState, { type, payload }) => {
    let data;
    
    switch(type) {
      case SUGESTOES_GET_START:
        return { ...state, isLoading: true };
      case SUGESTOES_GET_SUCCESS:
        return { ...state, data: payload, isLoading: false };
      case SUGESTAO_CREATE_SUCCESS:
        return { ...state, data: [payload] };
      default:
        return state;
    }
  }