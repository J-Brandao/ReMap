import {
    EDIFICIOS_GET_START,
    EDIFICIOS_GET_SUCCESS,
    EDIFICIO_GET_START,
    EDIFICIO_GET_SUCCESS,
    EDIFICIOS_PERFIL_GET_START,
    EDIFICIOS_PERFIL_GET_SUCCESS,
    EDIFICIO_CREATE_SUCCESS,
    EDIFICIO_DELETE_SUCCESS
  } from '../Actions/Constants'
  
  const initialState = {
    isLoading: true,
    data: []
  };
  
  export default (state = initialState, { type, payload }) => {
    let data;
    
    switch(type) {
      case EDIFICIOS_GET_START:
        return { ...state, isLoading: true };
      case EDIFICIOS_GET_SUCCESS:
        return { ...state, data: payload, isLoading: false };
      case EDIFICIO_GET_START:
        return { ...state, isLoading: true };
      case EDIFICIO_GET_SUCCESS:
        return { ...state, data: [payload], isLoading: false };
      case EDIFICIOS_PERFIL_GET_START:
        return { ...state, isLoading: true };
      case EDIFICIOS_PERFIL_GET_SUCCESS:
        return { ...state, data: [payload], isLoading: false };
      case EDIFICIO_CREATE_SUCCESS:
        return { ...state, data: [payload] };
      //case FAVLIST_DELETE_SUCCESS:
        //return { ...state, data };
      default:
        return state;
    }
  }