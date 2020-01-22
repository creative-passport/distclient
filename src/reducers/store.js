import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers from '../reducers'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,
	{ 'profile': '' },
	composeEnhancer(applyMiddleware(thunk)),
	// applyMiddleware(),
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)
export default store

