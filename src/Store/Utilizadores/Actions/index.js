import {
    UTILIZADORES_GET_START,
    UTILIZADORES_GET_SUCCESS,
    UTILIZADORES_GET_ERROR,

    UTILIZADOR_GET_START,
    UTILIZADOR_GET_SUCCESS,
    UTILIZADOR_GET_ERROR,

    UTILIZADOR_OWN_GET_START,
    UTILIZADOR_OWN_GET_SUCCESS,
    UTILIZADOR_OWN_GET_ERROR,

    UTILIZADOR_UPDATE_START,
    UTILIZADOR_UPDATE_SUCCESS,
    UTILIZADOR_UPDATE_ERROR,

    UTILIZADOR_CREATE_START,
    UTILIZADOR_CREATE_SUCCESS,
    UTILIZADOR_CREATE_ERROR,
  } from './Constants';
  import { fetchUtilizadoresList, fetchUtilizadorById, fetchUtilizadorForPerfil, createUtilizador, updateUtilizador } from "../../../Firebase/Pedidos"
  
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
  
  export const getUtilizadorById = (userId) => {
    return (dispatch) => {
      dispatch({ type: UTILIZADOR_OWN_GET_START });

      fetchUtilizadorById(userId)
        .then(Utilizador => {
        dispatch({type: UTILIZADOR_OWN_GET_SUCCESS, payload: Utilizador})
        })
      .catch(()=> dispatch({ type: UTILIZADOR_OWN_GET_ERROR}))

    }
  }

  export const getUtilizadorForPerfil = (userId) => {
    return (dispatch) => {
      dispatch({ type: UTILIZADOR_GET_START });
  
      fetchUtilizadorForPerfil(userId)
        .then(Utilizador => {
        dispatch({type: UTILIZADOR_GET_SUCCESS, payload: Utilizador})
        })
      .catch(()=> dispatch({ type: UTILIZADOR_GET_ERROR}))
  
    }
  }

  export const atualizaUtilizador = (docID = '', userId = '', imagemUser = '', nomeUtilizador = '', biografia = '', pais = '', cidade = '', role='normal') => {
    return (dispatch, getState) => {
      dispatch({ type: UTILIZADOR_UPDATE_START });

      updateUtilizador(getState().token, docID, userId, imagemUser, nomeUtilizador, biografia, pais, cidade, role)
        .then(Info => {
          dispatch({ type: UTILIZADOR_UPDATE_SUCCESS, payload: Info })
        })
        .catch(() => dispatch({ type: UTILIZADOR_UPDATE_ERROR }))
    }
  }
  
  export const createNovoUtilizador = (userId = '', imagemUser = '', nomeUtilizador = '', biografia = '', pais = '', cidade = '', role='normal') => {
    return (dispatch, getState) => {
      dispatch({ type: UTILIZADOR_CREATE_START });

      createUtilizador(getState().token, userId, imagemUser, nomeUtilizador, biografia, pais, cidade, role)
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