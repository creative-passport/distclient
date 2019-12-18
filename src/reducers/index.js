import { combineReducers } from 'redux';
import { cognito } from 'react-cognito';

import register from './registerReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  register, login, cognito
});

export default rootReducer;