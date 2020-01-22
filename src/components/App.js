import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AbsoluteRedirect from './AbsoluteRedirect'
import Home from './Home'
import AllProfiles from './AllProfiles'
import Verify from './Verify'
import Settings from './Settings'
import PageNotFound from './PageNotFound'

import { PasswordReset } from 'react-cognito'

import Dashboard from './Dashboard'
import ChangePasswordForm from './ChangePasswordForm'
import UpdateEmailForm from './UpdateEmailForm'
import PasswordResetForm from './PasswordResetForm'
import RegisterPage from './RegisterPage'
import ConfirmPage from './ConfirmPage'

import './App.css'

const changePassword = () => (
    <div>
      <ChangePasswordForm />
      <Link to="/">Home</Link>
    </div>
)

const updateEmail = () => (
    <div>
      <UpdateEmailForm />
      <Link to="/">Home</Link>
    </div>
)

const passwordReset = () => (
  <PasswordReset>
      <PasswordResetForm/>
    </PasswordReset>
)

export default class App extends Component {

  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/reset" component={passwordReset}/>
            <Route exact path="/change_password" component={changePassword}/>
            <Route exact path="/change_email" component={updateEmail}/>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/auth/callback" component={Home}/>
            <Route exact path="/verify" component={Verify}/>
            <Route exact path="/yoti/callback" component={Home} />
            <Route exact path="/profile" component={AllProfiles} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/signin" component={
               () => <AbsoluteRedirect to={'https://cp.auth.eu-west-2.amazoncognito.com/login?response_type=token&client_id=242gellvv421kdgdicvcs1q3fv&redirect_uri=https://localhost:3000/auth/callback'}/>} />
            <Route exact path="/signin2" component={Dashboard} />
            <Route exact path="/confirm" component={ConfirmPage} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
      </Router>
    )
  }
}