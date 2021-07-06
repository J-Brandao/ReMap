import {
    EQUIPAS_GET_START,
    EQUIPAS_GET_SUCCESS,
    EQUIPAS_GET_ERROR
  } from './Constants';
  import { fetchEquipasList } from "../../../Firebase/Pedidos"
  
  export const getEquipasList = () => {
    return (dispatch) => {
      dispatch({ type: EQUIPAS_GET_START });
  
      fetchEquipasList()
        .then(Equipa => {
          dispatch({ type: EQUIPAS_GET_SUCCESS, payload: Equipa })
        })
        .catch(() => dispatch({ type: EQUIPAS_GET_ERROR }))
    }
  }

  /*export const getEdificio = (id = '') => {
    return (dispatch) => {
      dispatch({ type: EDIFICIO_GET_START });
      fetchEdificio(id)
        .then(Edificio => {
          dispatch({ type: EDIFICIO_GET_SUCCESS, payload: Edificio })
        })
        .catch(() => dispatch({ type: EDIFICIO_GET_ERROR }))
    }
  }*/