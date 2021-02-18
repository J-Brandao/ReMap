import {
    EDIFICIOS_GET_START,
    EDIFICIOS_GET_SUCCESS,
    EDIFICIO_GET_START,
    EDIFICIO_GET_SUCCESS,
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
      //case FAVLIST_GET_START:
        //return { ...state, isLoading: true };
      //case FAVLIST_GET_SUCCESS:
        //return { ...state, data: payload, isLoading: false };
      //case FAVPOKE_GET_START:
        //return { ...state, isLoading: true };
      //case FAVPOKE_GET_SUCCESS:
        //return { ...state, data: [payload], isLoading: false };
      case EDIFICIO_CREATE_SUCCESS:
        return { ...state, data: [payload] };
      //case FAVLIST_DELETE_SUCCESS:
        //return { ...state, data };
      default:
        return state;
    }
  }