import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import * as serviceWorker from './serviceWorker'
import * as env from './env-config.js'
import App from './components/App'
import store from './reducers/store'
import './index.css'
import 'typeface-roboto'
import { setupCognito } from 'react-cognito'

import config from './config.json'

require('dotenv').config()

setupCognito(store, config)


ReactDOM.render(
	<Provider store={store}>
    	<App />
  	</Provider>, 
document.getElementById('root'))

serviceWorker.register()