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
  import { fetchUtilizadoresList, /*fetchFavPokemon,*/ createUtilizador/*, deleteFavPokemon*/ } from "../../../Firebase/Pedidos"
  
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
  /*
  export const getFavPokemon = (namePokemon = '', email = '') => {
    return (dispatch) => {
      dispatch({ type: FAVPOKE_GET_START });
  
      fetchFavPokemon(namePokemon, email)
        .then(FavPokemon => {
          dispatch({ type: FAVPOKE_GET_SUCCESS, payload: FavPokemon })
        })
        .catch(() => dispatch({ type: FAVPOKE_GET_ERROR }))
    }
  }*/
  
  export const createNovoUtilizador = (imagemUser = '', nomeUtilizador = '', biografia = '', pais = '', cidade = '') => {
    return (dispatch, getState) => {
      dispatch({ type: UTILIZADOR_CREATE_START });

      createUtilizador(getState().token, imagemUser, nomeUtilizador, biografia, pais, cidade)
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