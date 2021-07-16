import {
    SUGESTOES_GET_START,
    SUGESTOES_GET_SUCCESS,
    SUGESTOES_GET_ERROR,
  
    SUGESTAO_CREATE_START,
    SUGESTAO_CREATE_SUCCESS,
    SUGESTAO_CREATE_ERROR,
  } from './Constants';
  import { fetchSugestoesListByBuilding, fetchSugestoesListByUser, createSugestao } from "../../../Firebase/Pedidos"
  
  export const getSugestoesListByBuilding = (buildingId) => {
   
    return (dispatch) => {
      dispatch({ type: SUGESTOES_GET_START });
  
      fetchSugestoesListByBuilding(buildingId)
        .then(Sugestoes => {
          dispatch({ type: SUGESTOES_GET_SUCCESS, payload: Sugestoes })
        })
        .catch(() => dispatch({ type: SUGESTOES_GET_ERROR }))
    }
}
export const getSugestoesListByUser = (userId) => {
  return (dispatch) => {
    dispatch({ type: SUGESTOES_GET_START });

    fetchSugestoesListByUser(userId)
      .then(Sugestoes => {
        dispatch({ type: SUGESTOES_GET_SUCCESS, payload: Sugestoes })
      })
      .catch(() => dispatch({ type: SUGESTOES_GET_ERROR }))
  }
}
  
  export const createNovaSugestao = (userId = '', valor = '', edificioId = '', user, edificio) => {
    return (dispatch, getState) => {
      dispatch({ type: SUGESTAO_CREATE_START });

      createSugestao(getState().token, userId, valor, edificioId, user, edificio)
        .then(Sugestao => {
          dispatch({ type: SUGESTAO_CREATE_SUCCESS, payload: Sugestao })
        })
        .catch(() => dispatch({ type: SUGESTAO_CREATE_ERROR }))
    }
  }