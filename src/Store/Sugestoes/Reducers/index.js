import {
    SUGESTOES_GET_START,
    SUGESTOES_GET_SUCCESS,
  SUGESTAO_CREATE_SUCCESS,
    SUGESTAO_CREATE_START
  } from '../Actions/Constants'
  
  const initialState = {
    isLoading: true,
    isLoadingCreation:false,
    data: [],
    dataSingle:{},
  };
  
  export default (state = initialState, { type, payload }) => {
    let data;
    
    switch(type) {
      case SUGESTOES_GET_START:
        return { ...state, isLoading: true };
      case SUGESTOES_GET_SUCCESS:
        return { ...state, data: payload, isLoading: false };
        case SUGESTAO_CREATE_START:
          return { ...state, isLoadingCreation: true };
        case SUGESTAO_CREATE_SUCCESS:
          return { ...state, dataSingle: payload, isLoadingCreation:false };
      default:
        return state;
    }
  }