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

    EDIFICIO_UPDATE_START,
    EDIFICIO_UPDATE_SUCCESS,
    EDIFICIO_UPDATE_ERROR,
  
    EDIFICIO_DELETE_START,
    EDIFICIO_DELETE_SUCCESS,
    EDIFICIO_DELETE_ERROR,
  } from './Constants';
  import { fetchEdificioList, fetchEdificio, createEdificio, fetchEdificioForPerfil, deleteEdificio, updateEdificio } from "../../../Firebase/Pedidos"
import { UTILIZADOR_CREATE_ERROR } from '../../Utilizadores/Actions/Constants';
  
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
  
  export const createNovoEdificio = (userId = '', date='', nomeEdificio = '', descricao = '', fotos = '', localizacao = '', degradacao = '', acesso = '', seguranca = '', vandalismo = '', user) => {
    return (dispatch, getState) => {
      dispatch({ type: EDIFICIO_CREATE_START });

      const domain = {
        Arquitetos: 0,
        Fotógrafos: 0,
        Historiadores: 0,
        total: 0
      }

      domain[user.equipa] = domain[user.equipa] + 250;
      domain.total = domain.total + 250;

      createEdificio(getState().token, userId, date, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo, domain, user)
        .then(Edificio => {
          dispatch({ type: EDIFICIO_CREATE_SUCCESS, payload: Edificio })
        })
        .catch(() => dispatch({ type: EDIFICIO_CREATE_ERROR }))
    }
  }

  export const atualizaEdificio = (docID = '', userId = '', date='', nomeEdificio = '', descricao = '', fotos = '', localizacao = '', degradacao = '', acesso = '', seguranca = '', vandalismo = '') => {
    return (dispatch, getState) => {
      dispatch({ type: EDIFICIO_UPDATE_START });
      updateEdificio(getState().token, docID, userId, date, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo)
        .then(Info => {
          dispatch({ type: EDIFICIO_UPDATE_SUCCESS, payload: Info })
        })
        .catch(() => dispatch({ type: EDIFICIO_UPDATE_ERROR }))
    }
  }

  export const apagaEdificio = id => {
    return (dispatch, getState) => {
      dispatch({ type: EDIFICIO_DELETE_START });
  
      deleteEdificio(getState().token, id)
        .then((e) => {
          dispatch({ type: EDIFICIO_DELETE_SUCCESS, payload: e })
        })
        .catch(() => dispatch({ type: EDIFICIO_DELETE_ERROR }))
    }
  }