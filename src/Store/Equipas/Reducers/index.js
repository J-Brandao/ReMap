import {
    EQUIPAS_GET_START,
    EQUIPAS_GET_SUCCESS,
  } from '../Actions/Constants'
  
  const initialState = {
    isLoading: true,
    isLoadingSingle:true,
    data: [],
    dataSingle: {},
  };
  
  export default (state = initialState, { type, payload }) => {
    let data;
    
    switch(type) {
      case EQUIPAS_GET_START:
        return { ...state, isLoading: true };
      case EQUIPAS_GET_SUCCESS:
        return { ...state, data: payload, isLoading: false };
      default:
        return state;
    }
  }