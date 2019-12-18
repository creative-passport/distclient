import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { registerUser } from 'react-cognito'
import store from '../reducers/store'

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
    // const { store } = this.context;

    console.log(store)
    const state = store.getState();
    const userPool = state.cognito.userPool;
    const config = state.cognito.config;
    registerUser(userPool, config, this.state.username, this.state.password, {
      email: this.state.email,
    }).then(
      (action) => {
        console.log(action)
        store.dispatch(action);
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
    <form onSubmit={this.onSubmit}>
      <div>{this.state.error}</div>
      <label>
        Username
        <input placeholder="username" onChange={this.changeUsername} required />
      </label>
      <label>
        Password
        <input placeholder="password" onChange={this.changePassword} required />
      </label>
      <label>
        Email Address
        <input placeholder="email" type="email" onChange={this.changeEmail} required />
      </label>
      <button type="submit">Register</button>
    </form>
  )
}
RegisterForm.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(RegisterForm);

