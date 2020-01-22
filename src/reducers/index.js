import { combineReducers } from 'redux'
import { cognito } from 'react-cognito'
import profile from './profileReducer'

const rootReducer = combineReducers({
  cognito, profile
});

export default rootReducer;