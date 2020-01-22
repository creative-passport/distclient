import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CognitoState,
  Logout,
  Login,
  NewPasswordRequired,
  EmailVerification,
  Confirm,
} from 'react-cognito';
import LogoutButton from './LogoutButton';
import LoginForm from './LoginForm';
import EmailVerificationForm from './EmailVerificationForm';
import NewPasswordRequiredForm from './NewPasswordRequiredForm';
import ConfirmForm from './ConfirmForm'

import Layout from './Layout'


class LoggedInForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: props.email,
        username: props.username,
        password: '',
      };
    }

    onSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state.username, this.state.password);
    }

    changeUsername = (event) => {
      this.setState({ username: event.target.value });
    }

    changePassword = (event) => {
      this.setState({ password: event.target.value });
    }

    componentWillUnmount = () => {
      this.props.clearCache();
    }

    render() {
      const attributes = this.attributes

      console.log(this.props)

    return (
      <Layout>
        <div>
          <p>logged in as {this.props.user.getUsername()}</p>
          <ul>
            <li>
              <Logout>
                <LogoutButton />
              </Logout>
            </li>
            <li><Link to="/change_password">Change password</Link></li>
            <li><Link to="/change_email">Change email address</Link></li>
          </ul>
          <div>
            <p>Attributes</p>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Value</td>
                </tr>
              </thead>
              <tbody>
                {Object.keys().map(name =>
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{attributes[name]}</td>
                  </tr>,
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    )
  }
}

LoggedInForm.propTypes = {
  onSubmit: PropTypes.func,
  clearCache: PropTypes.func,
  username: PropTypes.string,
  error: PropTypes.string,
  email: PropTypes.string,
  user: PropTypes.object,
  attributes: PropTypes.object
};

export default LoggedInForm;
