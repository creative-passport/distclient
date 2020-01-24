import React from 'react';
import PropTypes from 'prop-types';
import { changePassword } from 'react-cognito'
import store from '../reducers/store'
import { Redirect } from 'react-router-dom'

import CPButton from './CPButton'


class ChangePasswordForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      oldPassword: '',
      newPassword: '',
    }
  }

  onSubmit = (event) => {
    const state = store.getState()
    const user = state.cognito.user
    event.preventDefault();
    changePassword(user, this.state.oldPassword, this.state.newPassword).then(
      () => {
        this.setState({ error: 'Password changed' })
        return <Redirect to="/login" />
      }).catch((error) => {
        this.setState({ error });
      });
  }

  changeOldPassword = (event) => {
    this.setState({ oldPassword: event.target.value });
  }

  changeNewPassword = (event) => {
    this.setState({ newPassword: event.target.value });
  }

  render = () => (
    <form>
      <div>{this.state.error}</div>
      <label>
        Old Password
        <input placeholder="old password" onChange={this.changeOldPassword} required style={{width:'180px', height:'30px', verticalAlign: 'middle', margin:'1em'}} />
      </label>
      <label>
        New Password
        <input placeholder="new password" onChange={this.changeNewPassword} required style={{width:'180px', height:'30px', verticalAlign: 'middle', margin:'1em'}} />
      </label>
      <CPButton type="submit" variant="contained" style={{width:'100%', verticalAlign: 'middle', marginRight:'1em', marginBottom: '1em'}} onClick={this.onSubmit}> Set new password </CPButton>
    </form>
  )
}
ChangePasswordForm.contextTypes = {
  store: PropTypes.object,
};

export default ChangePasswordForm;
