import {
    EDIFICIOS_GET_START,
    EDIFICIOS_GET_SUCCESS,
    EDIFICIOS_GET_ERROR,

    EDIFICIO_GET_START,
    EDIFICIO_GET_SUCCESS,
    EDIFICIO_GET_ERROR,

    EDIFICIOS_PERFIL_GET_START,
    EDIFICIOS_PERFIL_GET_SUCCESS,
    EDIFICIOS_PERFIL_GET_ERROR,
  
    EDIFICIO_CREATE_START,
    EDIFICIO_CREATE_SUCCESS,
    EDIFICIO_CREATE_ERROR,
  
    EDIFICIO_DELETE_START,
    EDIFICIO_DELETE_SUCCESS,
    EDIFICIO_DELETE_ERROR,
  } from './Constants';
  import { fetchEdificioList, fetchEdificio, createEdificio, fetchEdificioForPerfil } from "../../../Firebase/Pedidos"
  
  export const getEdificioList = () => {
    return (dispatch) => {
      dispatch({ type: EDIFICIOS_GET_START });
  
      fetchEdificioList()
        .then(Edificio => {
          dispatch({ type: EDIFICIOS_GET_SUCCESS, payload: Edificio })
        })
        .catch(() => dispatch({ type: EDIFICIOS_GET_ERROR }))
    }
  }

  export const getEdificio = (id = '') => {
    return (dispatch) => {
      dispatch({ type: EDIFICIO_GET_START });
      fetchEdificio(id)
        .then(Edificio => {
          dispatch({ type: EDIFICIO_GET_SUCCESS, payload: Edificio })
        })
        .catch(() => dispatch({ type: EDIFICIO_GET_ERROR }))
    }
  }

  export const getEdificioPerfil = (userId = '') => {
    return (dispatch) => {
      dispatch({ type: EDIFICIOS_PERFIL_GET_START });
      fetchEdificioForPerfil(userId)
        .then(Edificios => {
          dispatch({ type: EDIFICIOS_PERFIL_GET_SUCCESS, payload: Edificios })
        })
        .catch(() => dispatch({ type: EDIFICIOS_PERFIL_GET_ERROR }))
    }
  }
  
  export const createNovoEdificio = (userId = '', date='', nomeEdificio = '', descricao = '', fotos = '', localizacao = '', degradacao = '', acesso = '', seguranca = '', vandalismo = '') => {
    return (dispatch, getState) => {
      dispatch({ type: EDIFICIO_CREATE_START });

      createEdificio(getState().token, userId, date, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo)
        .then(Edificio => {
          dispatch({ type: EDIFICIO_CREATE_SUCCESS, payload: Edificio })
        })
        .catch(() => dispatch({ type: EDIFICIO_CREATE_ERROR }))
    }
  }

  /*export const deleteFav = id => {
    return (dispatch, getState) => {
      dispatch({ type: FAVLIST_DELETE_START });
  
      deleteFavPokemon(getState().token, id)
        .then((e) => {
          dispatch({ type: FAVLIST_DELETE_SUCCESS, payload: e })
        })
        .catch(() => dispatch({ type: FAVLIST_DELETE_ERROR }))
    }
  }*/