import React from 'react'
import PropTypes from 'prop-types'
import CPButton from './CPButton'
import store from '../reducers/store'
import { updateProfileData, getJWTToken } from '../scripts'
import {getUserAttributes, updateAttributes} from 'react-cognito/src/attributes.js'

class ConfirmForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      verificationCode: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.verificationCode)
     .then((user) => {
      store.subscribe(() => {
          var profile = store.getState().profile
          if (profile !== undefined && profile.response !== undefined) {            
            var walletId = profile.response.PassportDataID
            var data = profile.response.PassportData
            
            if (user !== undefined) {
              user.getSession((err, session) => {
                if (err) {
                  console.log(err)
                } else {
                  var jwtToken =  session.getIdToken().getJwtToken()

                  getUserAttributes(user).then(res => {
                    var currentAttributes = res

                    walletId = currentAttributes['sub']
                    updateProfileData(walletId, data, jwtToken)
                    
                  }).catch(function (error) {
                      console.log(error)
                  })
                }
              })
            }
          }
        })
     })
     .catch((error) => {
       this.setState({ error });
     });
  }

  onResend = (event) => {
    event.preventDefault();
    this.props.onResend()
     .then((user) => {
       this.setState({ error: 'Code resent' });
     })
     .catch((error) => {
       this.setState({ error });
     });

  }

  changeVerificationCode = (event) => {
    this.setState({ verificationCode: event.target.value });
  }

  render = () => (
    <form onSubmit={this.onSubmit}>
      <div>{this.state.error}</div>
      <div>
        <label>
          Verification Code
          <input placeholder="code" style={{width:'170px', height:'30px', verticalAlign: 'middle', margin:'1em'}} onChange={this.changeVerificationCode} required />
        </label>
      </div>
      <div>
        <CPButton type="submit" variant="contained" style={{width:'170px', height:'30px', verticalAlign: 'middle', marginRight:'1em', marginBottom: '1em'}} onClick={this.onSubmit}>
          Submit
        </CPButton>
        <CPButton variant="contained" style={{height:'30px', verticalAlign: 'middle', marginRight:'1em', marginBottom: '1em'}} onClick={this.onResend}>
          Resend Verification Code
        </CPButton>
        <CPButton variant="contained" style={{width:'170px', height:'30px', verticalAlign: 'middle', marginRight:'1em'}} onClick={this.props.onCancel}>
          Cancel
        </CPButton>
      </div>
    </form>
  )
}
ConfirmForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onResend: PropTypes.func,
  error: PropTypes.string,
};

export default ConfirmForm;
