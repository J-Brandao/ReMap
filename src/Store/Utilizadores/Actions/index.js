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

export const atualizaUtilizador = (docID = '', userId = '', imagemUser = '', nomeUtilizador = '', biografia = '', cidade = '', progresso = '', equipa = '', role = 'normal', active) => {
   
    return (dispatch, getState) => {
      dispatch({ type: UTILIZADOR_UPDATE_START });

      updateUtilizador(getState().token, docID, userId, imagemUser, nomeUtilizador, biografia, cidade, progresso, equipa, role, active)
        .then(Info => {
          dispatch({ type: UTILIZADOR_UPDATE_SUCCESS, payload: Info })
        })
        .catch(() => dispatch({ type: UTILIZADOR_UPDATE_ERROR }))
    }
  }
  
  export const createNovoUtilizador = (userId = '', imagemUser = 'Placeholder.png', nomeUtilizador = '', biografia = '', cidade = '', role='normal', active=true) => {
    return (dispatch, getState) => {
      dispatch({ type: UTILIZADOR_CREATE_START });
      const progresso = {
        exp: 0,
        nivel:1,
        amigos: {
          badge: "badgeAmigo_0.png",
          nrAmigos:0,
        },
        comentarios: {
          badge: "badgeComentario_0.png",
          nrComentarios:0,
        },
        edificios: {
          badge: "badgeEdificio_0.png",
          nrEdificios:0,
        },
        sugestao: {
          badge: "badgeSugestao_0.png",
          nrSugestoes:0,
        }
      }
      createUtilizador(getState().token, userId, imagemUser, nomeUtilizador, biografia, cidade, role, active, progresso)
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