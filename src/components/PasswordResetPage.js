import React, { useState } from "react"
import PropTypes from 'prop-types'
import 'date-fns'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Auth } from "aws-amplify"

import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import CPButton from './CPButton'

import store from '../reducers/store'
import logo from '../logo.png'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 345,
    height: '100%'
  },
  title: {
    lineHeight: '20px',
    width: '40%',
    display:'inline-grid',
    marginLeft: '0.5em',
    verticalAlign: 'middle',
    fontSize: '14pt',
    fontStyle: 'SAN FRANCISCO TEXT BOLD',
    background: '-webkit-linear-gradient(180deg, #ff00b4, #82b4dc, #00ffcc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  inputForm: {
    padding: theme.spacing(1),
    width: '100%'
  },
  submitButton: {
    color:'#fff', 
    boxShadow: 'none', 
    backgroundColor: '#02d1a8',
    verticalAlign: 'middle',
    borderRadius: '0.5em'
  }
})

// function useFormFields(initialState) {
//   const [fields, setValues] = useState(initialState);

//   return [
//     fields,
//     function(event) {
//       setValues({
//         ...fields,
//         [event.target.id]: event.target.value
//       });
//     }
//   ];
// }

// function LoaderButton({
//   isLoading,
//   className = "",
//   disabled = false,
//   ...props
// }) {
//   return (
//     <Button
//       className={`LoaderButton ${className}`}
//       disabled={disabled || isLoading}
//       {...props}
//     >
//       {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
//       {props.children}
//     </Button>
//   )
// }

// function ResetPassword() {
//   const [fields, handleFieldChange] = useFormFields({
//     code: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [codeSent, setCodeSent] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [isSendingCode, setIsSendingCode] = useState(false);

//   function validateCodeForm() {
//     return fields.email.length > 0;
//   }

//   function validateResetForm() {
//     return (
//       fields.code.length > 0 &&
//       fields.password.length > 0 &&
//       fields.password === fields.confirmPassword
//     );
//   }

//   async function handleSendCodeClick(event) {
//     event.preventDefault();

//     setIsSendingCode(true);

//     try {
//       await Auth.forgotPassword(fields.email);
//       setCodeSent(true);
//     } catch (error) {
//       // onError(error);
//       setIsSendingCode(false);
//     }
//   }

//   async function handleConfirmClick(event) {
//     event.preventDefault();

//     setIsConfirming(true);

//     try {
//       await Auth.forgotPasswordSubmit(
//         fields.email,
//         fields.code,
//         fields.password
//       );
//       setConfirmed(true);
//     } catch (error) {
//       // onError(error);
//       setIsConfirming(false);
//     }
//   }

//   function renderRequestCodeForm() {
//     return (
//       <form onSubmit={handleSendCodeClick}>
//         <TextField
//           required
//           fullWidth
//           type="email"
//           value={fields.email}
//           label='email'
//           name='email'
//           onChange={handleFieldChange}
//           margin="normal"
//         />
//         <CPButton
//           type="submit"
//           fullWidth
//           isLoading={isSendingCode}
//           disabled={!validateCodeForm()}
//         > Send Confirmation </CPButton>
//       </form>
//     )
//   }

//   function renderConfirmationForm() {
//     return (
//       <form onSubmit={handleConfirmClick}>
//         <FormGroup bsSize="large" controlId="code">
//           <ControlLabel>Confirmation Code</ControlLabel>
//           <FormControl
//             autoFocus
//             type="tel"
//             value={fields.code}
//             onChange={handleFieldChange}
//           />
//           <HelpBlock>
//             Please check your email ({fields.email}) for the confirmation code.
//           </HelpBlock>
//         </FormGroup>
//         <hr />
//         <FormGroup bsSize="large" controlId="password">
//           <ControlLabel>New Password</ControlLabel>
//           <FormControl
//             type="password"
//             value={fields.password}
//             onChange={handleFieldChange}
//           />
//         </FormGroup>
//         <FormGroup bsSize="large" controlId="confirmPassword">
//           <ControlLabel>Confirm Password</ControlLabel>
//           <FormControl
//             type="password"
//             value={fields.confirmPassword}
//             onChange={handleFieldChange}
//           />
//         </FormGroup>
//         <LoaderButton
//           block
//           type="submit"
//           bsSize="large"
//           isLoading={isConfirming}
//           disabled={!validateResetForm()}
//         >
//           Confirm
//         </LoaderButton>
//       </form>
//     );
//   }

//   function renderSuccessMessage() {
//     return (
//       <div className="success">
//         <Glyphicon glyph="ok" />
//         <p>Your password has been reset.</p>
//         <p>
//           <Link to="/login">
//             Click here to login with your new credentials.
//           </Link>
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="ResetPassword">
//       {!codeSent
//         ? renderRequestCodeForm()
//         : !confirmed
//         ? renderConfirmationForm()
//         : renderSuccessMessage()}
//     </div>
//   )
// }

// const resetPassword = () => (<ResetPassword/>)

class PasswordResetPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        password: '',
        email: '',
        jwtToken: ''
      }

      this.onSubmit = this.onSubmit.bind(this)
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
    }

    componentDidMount() {
      // store.subscribe(() => {
      //   console.log("hi new user")
      //   tempUser = store.getState().newUser
      //   console.log(tempUser.response)

      //   this.setState({username: tempUser.response.user.username, sub: tempUser.response.user.userSub})
      // })
    }

    changeEmail = (event) => {
      this.setState({email: event.target.value})
    }

    onSubmit = (event) => {
      event.preventDefault()

      console.log("reset password")

      // const state = store.getState();
      // const userPool = state.cognito.userPool;
      // const config = state.cognito.config;

      // if (this.state.realName.length > 0 && this.state.dob != null) {
      //   this.setState({'error': ''})
      //   registerUser(userPool, config, this.state.username, this.state.password, {
      //     email: this.state.email,
      //   }).then(
      //     (action) => {
      //       this.createNewPassport(action)
      //       store.dispatch(action)
      //       this.props.history.push('/')
      //     },
      //     error => {
      //       console.log(error)
      //       this.setState({ error })
      //   })
      // } 
      // else {
      //   this.setState({'error': 'You need to enter your real name and date of birth'})
      // }      
    }

    changePassword = (event) => {
      this.setState({ password: event.target.value });
    }

    changeEmail = (event) => {
      this.setState({ email: event.target.value });
    }

    render() {
      const attributes = this.attributes
      const { classes } = this.props

      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container>
              <CssBaseline />
                <div style={{margin:'1.5em auto 1.5em auto'}}>
                  <img src={logo} style={{verticalAlign: 'middle', marginBottom:'0.5em', marginLeft: '20%'}} className="App-logo" alt="logo" />
                  <span className={classes.title}> THE CREATIVE PASSPORT</span>
                </div>
                <form className={classes.inputForm} onSubmit={this.onSubmit}>
                  <Typography align="center" variant="body1"> Reset Password</Typography>
                  <TextField
                    required
                    fullWidth
                    value={this.state.email}
                    label='email'
                    name='email'
                    onChange={this.changeEmail}
                    margin="normal"
                  />
                </form>
                <CPButton fullWidth className={classes.submitButton} onClick={this.onSubmit}>Reset Password</CPButton>
                <div>{this.props.error}</div>
            </Grid>
          </Paper>
        </div>
      )
    }
}

PasswordResetPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  clearCache: PropTypes.func,
  username: PropTypes.string,
  error: PropTypes.string,
  email: PropTypes.string,
  user: PropTypes.object,
  attributes: PropTypes.object
}

PasswordResetPage.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(withStyles(styles)(PasswordResetPage))