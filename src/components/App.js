import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Home from './Home'
import AllProfiles from './AllProfiles'
import Verify from './Verify'
import Settings from './Settings'
import PageNotFound from './PageNotFound'

import Dashboard from './Dashboard'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import ConfirmPage from './ConfirmPage'
import ChangePasswordPage from './ChangePasswordPage'
import PasswordResetPage from './PasswordResetPage'

import Amplify from 'aws-amplify'

import awsmobile from '../aws-exports'

import './App.css'
import 'antd/dist/antd.css'

Amplify.configure(awsmobile)

const mainTheme = createMuiTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h3: {
      textTransform: 'uppercase'
    },
    h6:{
      textTransform: 'uppercase'
    },
    body1: {
      fontSize: 13,
      textTransform: 'uppercase'
    },
    body2: {
      fontSize: 10
    }
  }
})

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={mainTheme}>
      <CssBaseline /> 
      <Router>
          <Switch>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/verify" component={Verify}/>
            <Route exact path="/yoti/callback" component={Home} />
            <Route exact path="/profile" component={AllProfiles} />
            <Route exact path="/change_password" component={ChangePasswordPage} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/confirm" component={ConfirmPage} />
            <Route exact path="/reset_password" component={PasswordResetPage} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
      </Router>
      </ThemeProvider>
    )
  }
}

export default App
