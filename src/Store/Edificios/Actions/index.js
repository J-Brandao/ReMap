import {
    EDIFICIOS_GET_START,
    EDIFICIOS_GET_SUCCESS,
    EDIFICIOS_GET_ERROR,

    EDIFICIO_GET_START,
    EDIFICIO_GET_SUCCESS,
    EDIFICIO_GET_ERROR,
  
    EDIFICIO_CREATE_START,
    EDIFICIO_CREATE_SUCCESS,
    EDIFICIO_CREATE_ERROR,
  
    EDIFICIO_DELETE_START,
    EDIFICIO_DELETE_SUCCESS,
    EDIFICIO_DELETE_ERROR,
  } from './Constants';
  import { fetchEdificioList, /*fetchFavPokemon,*/ createEdificio/*, deleteFavPokemon*/ } from "../../../Firebase/Pedidos"
  
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

  /*export const getFavPokemon = (namePokemon = '', email = '') => {
    return (dispatch) => {
      dispatch({ type: FAVPOKE_GET_START });
  
      fetchFavPokemon(namePokemon, email)
        .then(FavPokemon => {
          dispatch({ type: FAVPOKE_GET_SUCCESS, payload: FavPokemon })
        })
        .catch(() => dispatch({ type: FAVPOKE_GET_ERROR }))
    }
  }*/
  
  export const createNovoEdificio = (nomeEdificio = '', descricao = '', localizacao = '', degradacao = '', acesso = '', seguranca = '', vandalismo = '') => {
    return (dispatch, getState) => {
      dispatch({ type: EDIFICIO_CREATE_START });

      createEdificio(getState().token, nomeEdificio, descricao, localizacao, degradacao, acesso, seguranca, vandalismo)
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