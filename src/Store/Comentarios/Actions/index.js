import {
    COMENTARIOS_GET_START,
    COMENTARIOS_GET_SUCCESS,
    COMENTARIOS_GET_ERROR,
  
    COMENTARIO_CREATE_START,
    COMENTARIO_CREATE_SUCCESS,
    COMENTARIO_CREATE_ERROR,
  } from './Constants';
  import { fetchComentariosList, createComentario } from "../../../Firebase/Pedidos"
  
  export const getComentariosList = () => {
    return (dispatch) => {
      dispatch({ type: COMENTARIOS_GET_START });
  
      fetchComentariosList()
        .then(Comentarios => {
          dispatch({ type: COMENTARIOS_GET_SUCCESS, payload: Comentarios })
        })
        .catch(() => dispatch({ type: COMENTARIOS_GET_ERROR }))
    }
  }
  
  export const createNovoComentario = (userId = '', valor = '', edificioId = '') => {
    return (dispatch, getState) => {
      dispatch({ type: COMENTARIO_CREATE_START });

      createComentario(getState().token, userId, valor, edificioId)
        .then(Comentario => {
          dispatch({ type: COMENTARIO_CREATE_SUCCESS, payload: Comentario })
        })
        .catch(() => dispatch({ type: COMENTARIO_CREATE_ERROR }))
    }
  }