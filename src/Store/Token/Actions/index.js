import { SET_TOKEN } from './Constants'

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token
});