import { combineReducers } from 'redux'
import { cognito } from 'react-cognito'
import profile from './profileReducer'
import newUser from './userReducer'

const rootReducer = combineReducers({
  cognito, profile, newUser
});

export default rootReducer;