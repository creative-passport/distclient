import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './components/App'
import store from './reducers/store'
import './index.css'
import 'typeface-roboto'
// import * as env from './env-config.js'
// import { setupCognito } from 'react-cognito'
// import config from './config.json'
// setupCognito(store, config)

require('dotenv').config()

ReactDOM.render(
	<Provider store={store}>
    	<App />
  	</Provider>, 
document.getElementById('root'))

serviceWorker.register()