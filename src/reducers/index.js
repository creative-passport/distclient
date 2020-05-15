import { combineReducers } from 'redux'
import profile from './profileReducer'
import newUser from './userReducer'

const rootReducer = combineReducers({
  profile, newUser
});

export default rootReducer;