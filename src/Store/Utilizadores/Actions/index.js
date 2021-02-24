import {
    UTILIZADORES_GET_START,
    UTILIZADORES_GET_SUCCESS,
    UTILIZADORES_GET_ERROR,

    UTILIZADOR_GET_START,
    UTILIZADOR_GET_SUCCESS,
    UTILIZADOR_GET_ERROR,
  
    UTILIZADOR_CREATE_START,
    UTILIZADOR_CREATE_SUCCESS,
    UTILIZADOR_CREATE_ERROR,
  } from './Constants';
  import { fetchUtilizadoresList, fetchUtilizador, createUtilizador/*, deleteFavPokemon*/ } from "../../../Firebase/Pedidos"
  
  export const getUtilizadoresList = () => {
    return (dispatch) => {
      dispatch({ type: UTILIZADORES_GET_START });
  
      fetchUtilizadoresList()
        .then(Utilizadores => {
          dispatch({ type: UTILIZADORES_GET_SUCCESS, payload: Utilizadores })
        })
        .catch(() => dispatch({ type: UTILIZADORES_GET_ERROR }))
    }
  }
  
  export const getUtilizador = (userID) => {
    return (dispatch) => {
      dispatch({ type: UTILIZADOR_GET_START });
      fetchUtilizador(userID)
        .then(Id => {
          dispatch({ type: UTILIZADOR_GET_SUCCESS, payload: Id })
        })
        .catch(() => dispatch({ type: UTILIZADOR_GET_ERROR }))
    }
  }
  
  export const createNovoUtilizador = (userID = '', imagemUser = '', nomeUtilizador = '', biografia = '', pais = '', cidade = '') => {
    return (dispatch, getState) => {
      dispatch({ type: UTILIZADOR_CREATE_START });

      createUtilizador(getState().token, userID, imagemUser, nomeUtilizador, biografia, pais, cidade)
        .then(Info => {
          dispatch({ type: UTILIZADOR_CREATE_SUCCESS, payload: Info })
        })
        .catch(() => dispatch({ type: UTILIZADOR_CREATE_ERROR }))
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