import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import CPButton from './CPButton'

class LoginForm extends React.Component {

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

  render = () => (
    <div>
      <form onSubmit={this.onSubmit}>
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
      </form>
      <CPButton fullWidth style={{marginTop: '1.5em', boxShadow: 'none'}} onClick={this.onSubmit}>Sign in</CPButton>
      <div>{this.props.error}</div>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  clearCache: PropTypes.func,
  username: PropTypes.string,
  error: PropTypes.string,
  email: PropTypes.string,
};

export default LoginForm;
