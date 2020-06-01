import React from "react"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { Auth } from "aws-amplify"

import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import RefreshIcon from '@material-ui/icons/Refresh';

import CPButton from './CPButton'

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

class PasswordResetPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        code: '',
        password: '',
        confirm_password: '',
        passwordsMatch: false,
        codeSent: false,
        isSendingCode: false,
        isConfirming: false,
        confirmed: false
      }

      this.handleSendCodeClick = this.handleSendCodeClick.bind(this)
      this.handleConfirmClick = this.handleConfirmClick.bind(this)
    }


    static propTypes = {
      history: PropTypes.object.isRequired
    }

    componentDidMount() {
      this.setState({passwordMatching: false})
    }

    async handleConfirmClick(event) {
      event.preventDefault()

      if(this.state.passwordsMatch) {
        this.setState({isConfirming: true})

        console.log("Starting to confirm click")
        try {
          await Auth.forgotPasswordSubmit(
            this.state.email,
            this.state.code,
            this.state.password
          );
          this.setState({confirmed: true})
          console.log("confirmed")
        } catch (error) {
          this.setState({
            isConfirming: false
          })
        }
      }
    }

    async handleSendCodeClick(event) {
      event.preventDefault()

      this.setState({ isSendingCode:true})

      try {
        await Auth.forgotPassword(this.state.email)
        this.setState({ codeSent: true})
      } catch (error) {
        // onError(error);
        this.setState({ isSendingCode: false})
      }
    }

    renderConfirmationForm() {
      return (
        <form onSubmit={this.handleConfirmClick}>
          <FormGroup>
            <Typography>
              Please check your email {this.state.email} for the confirmation code.
            </Typography>
            <TextField
              required
              fullWidth
              value={this.state.code}
              label='Confirmation Code'
              name='code'
              onChange={this.changeCode}
              margin="normal"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              required
              fullWidth
              value={this.state.password}
              label='New Password'
              name='password'
              onChange={this.changePassword}
              margin="normal"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              required
              fullWidth
              value={this.state.confirm_password}
              label='Confirm Password'
              name='password'
              onChange={this.confirmPassword}
              margin="normal"
            />
          </FormGroup>

          <CPButton type='submit' disabled={this.state.disabled || this.state.isLoading}>
            {this.state.isConfirming && <RefreshIcon className="spinning" />}
            Confirm
          </CPButton>
        </form>
      )
    }

    renderSuccessMessage() {
      console.log('success')
      return (<CPButton fullWidth onClick={e => this.props.history.push('/login')}> Return To Login </CPButton>)
    }

    changeEmail = (event) => {
      this.setState({ email: event.target.value })
    }

    changeCode = (event) => {
      this.setState({ code: event.target.value })
    }

    changePassword = (event) => {
      this.setState({ password: event.target.value})
    }

    confirmPassword = (event) => {
      this.setState({ confirm_password: event.target.value})
      if (this.state.password === event.target.value){
        this.setState({passwordsMatch: true})
      }
    }

    render() {
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
                { !this.state.codeSent ?
                    <form className={classes.inputForm} onSubmit={this.handleSendCodeClick}>
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
                      <CPButton fullWidth type='submit' className={classes.submitButton}> Reset Password </CPButton>
                    </form>
                  : !this.state.confirmed ? 
                  this.renderConfirmationForm()
                  : this.renderSuccessMessage()
                }
                <div>{this.props.error}</div>
            </Grid>
          </Paper>
        </div>
      )
    }
}

PasswordResetPage.propTypes = {
  classes: PropTypes.object.isRequired,
  clearCache: PropTypes.func,
  error: PropTypes.string,
  email: PropTypes.string,
}

export default withRouter(withStyles(styles)(PasswordResetPage))