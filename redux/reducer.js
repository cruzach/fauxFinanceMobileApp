import {combineReducers} from 'redux';
import {PORTFOLIO_FAILED, PORTFOLIO_SUCCESS, LOGIN_FAILED, LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILED } from './actions'

const userReducer = (state = [], action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
          return {...state, user: action.payload }
        case LOGIN_FAILED:
          return {...state, error: action.payload }
        case REGISTER_SUCCESS:
          return {...state, user: action.payload }
        case REGISTER_FAILED:
          return {...state, error: action.payload }
        default:
          return state
      }
}

const portfolioReducer = (state = {}, action) => {
    switch (action.type) {
      case PORTFOLIO_SUCCESS:
        return {...state, portfolio: action.payload }
      case PORTFOLIO_FAILED:
        return {...state, error: action.payload }
      default:
        return state
    }
}


const reducer = combineReducers({
    portfolio: portfolioReducer,
    user: userReducer
});

export default reducer;