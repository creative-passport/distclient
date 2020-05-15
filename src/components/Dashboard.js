import React from 'react'
import PropTypes from 'prop-types'
import { Auth } from 'aws-amplify'

import LoginPage from './LoginPage'
import EmailVerificationForm from './EmailVerificationForm'
import NewPasswordRequiredForm from './NewPasswordRequiredForm'
import AllProfiles from './AllProfiles'
import ConfirmPage from './ConfirmPage'


const loggedInProfile = (user, attributes) => (
  <AllProfiles/>
)

const confirmForm = () => (
  <ConfirmPage/>
)

const newPasswordPage = () => (
  <NewPasswordRequiredForm />
)

const emailVerificationPage = () => (
  <EmailVerificationForm />
)

const loginPage = () => (
  <LoginPage/>
)

const mfaPage = () => (
  <div>
    <p>You need to enter an MFA, but this library does not yet support them.</p>
  </div>
)

const loggingIn = () => (
  <div>
    <img src="ajax-loader.gif" alt="" ></img>
  </div>
)

class Dashboard extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      'auth': 'LOGGED_OUT'
    }
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(
      user => {
        if (user.username.length > 5 && user.signInUserSession.idToken.jwtToken != undefined && user.signInUserSession.idToken.jwtToken != null) {
          this.setState({auth: 'AUTHENTICATED'})
        }
    }).catch(
      error => {
        console.log(error)
      }
    )
  }
  
  render() {
    switch (this.state.auth) {
      case 'AUTHENTICATED':
        return loggedInProfile()
      case 'LOGGED_IN':
        return loggedInProfile()
      case 'LOGGING_IN':
        return loggingIn()
      case 'LOGGED_OUT':
        return loginPage()
      case 'LOGIN_FAILURE':
        return loginPage()
      case 'MFA_REQUIRED':
        return mfaPage()
      case 'NEW_PASSWORD_REQUIRED':
        return newPasswordPage()
      case 'EMAIL_VERIFICATION_REQUIRED':
        return emailVerificationPage()
      case 'CONFIRMATION_REQUIRED':
        return confirmForm()
      default:
        return (
          <div>
            <p>Unrecognised cognito state</p>
          </div>
        )
    }
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
  attributes: PropTypes.object,
  state: PropTypes.string,
}

export default Dashboard
