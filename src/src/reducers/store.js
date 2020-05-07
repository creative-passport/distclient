import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {'profile': '', 'newUser': ''}, composeEnhancer(applyMiddleware(thunk)))

export default store

