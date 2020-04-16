import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

import Amplify from 'aws-amplify'

import awsmobile from '../aws-exports'
import store from '../reducers/store'

import './App.css'

Amplify.configure(awsmobile)

class App extends Component {

  render() {
    const { history } = this.props

    return (
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
            <Route exact path="*" component={PageNotFound} />
          </Switch>
      </Router>
    )
  }
}

export default App
