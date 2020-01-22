import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { registerUser } from 'react-cognito'
import store from '../reducers/store'

import TextField from '@material-ui/core/TextField'
import CPButton from './CPButton'

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      username: '',
      password: '',
      email: '',
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  onSubmit = (event) => {
    event.preventDefault();

    console.log(event)
    console.log(this.context)

    // const { store } = this.context

    const state = store.getState();
    const userPool = state.cognito.userPool;
    const config = state.cognito.config;
    registerUser(userPool, config, this.state.username, this.state.password, {
      email: this.state.email,
    }).then(
      (action) => {
        console.log(store.getState())
        console.log(action)

        store.dispatch(action)
        this.props.history.push('/');
      },
      error => {
        console.log(error)
        this.setState({ error })})
  }

  changeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  render = () => (
    <div>
      <form>
        <TextField
          required
          fullWidth
          value={this.state.username}
          id="standard-basic"
          label='username'
          name='username'
          onChange={this.changeUsername}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          type="password"
          id="standard-basic"
          label='password'
          name='password'
          onChange={this.changePassword}
          margin="normal"
          placeholder="Password"
        />
        <TextField
          required
          fullWidth
          type="email"
          id="standard-basic"
          label='Email Address'
          name='email'
          onChange={this.changeEmail}
          margin="normal"
          placeholder="email"
        />
      </form>
      <CPButton fullWidth style={{marginTop: '1.5em', boxShadow: 'none'}} onClick={this.onSubmit}>Register</CPButton>
      <div>{this.props.error}</div>
    </div>
  )
}
RegisterForm.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(RegisterForm);

