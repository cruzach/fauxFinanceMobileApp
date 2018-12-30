import { loadPortfolio, loginUser, registerUser } from '../api';

// action types
export const GET_PORTFOLIO = 'GET_PORTFOLIO';
export const PORTFOLIO_SUCCESS = 'PORTFOLIO_SUCCESS'
export const PORTFOLIO_FAILED = 'PORTFOLIO_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'
// action creators

export const getPortfolio = (id) => async dispatch => {
    try {
        const data = await loadPortfolio(id);
        dispatch({type: PORTFOLIO_SUCCESS, payload: data})
      } catch (err) {
        dispatch({type: PORTFOLIO_FAILED, payload: err})
      }
    
}

export const login = (username, password) => async dispatch => {
  try {
      const user = await loginUser(username, password);
      dispatch({type: LOGIN_SUCCESS, payload: user})
    } catch (err) {
      dispatch({type: LOGIN_FAILED, payload: err})
    }
}

export const register = (name, username, password) => async dispatch => {
  try {
      const user = await registerUser(name, username, password);
      dispatch({type: REGISTER_SUCCESS, payload: user})
    } catch (err) {
      dispatch({type: REGISTER_FAILED, payload: err})
    }
}