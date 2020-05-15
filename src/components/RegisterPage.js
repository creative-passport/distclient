import React from 'react'
import PropTypes from 'prop-types'
import 'date-fns'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { Redirect } from "react-router-dom"
import { Auth } from 'aws-amplify'

import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import store from '../reducers/store'
import logo from '../logo.png'


const styles = theme => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '32ch',
    },
    '& .MuiInput-underline': {
      borderRadius: '25%'
    },
    '& .MuiInput-underline:before': {
      marginTop: '2em',
      borderRadius: '5em'
    },
    '& .MuiInputBase-input': {
      paddingTop: '1em'
    },
    '& .MuiFormLabel-root': {
      fontSize: '10pt',
      position: 'absolute',
      top: '-10pt'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'none',
      position: 'absolute',
      top: '5pt'
    },
    '& .MuiTypography-root': {
      margin: theme.spacing(2),
      color: '#9e9e9e',
      alignItems:'center',
      alignSelf: 'center',
      textAlign: 'center'
    }
  },
  disableTransition: {
    transition: 'none',
  },
  paper: {
    flexGrow: 1,
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
    padding: '2em',
    marginBottom: '2em'
  },
  nextButton: {
    color:'#fff', 
    boxShadow: 'none', 
    backgroundColor: '#02d1a8',
    // margin:'1.5em auto 3.5em auto',
    verticalAlign: 'middle',
    width: '10em',
    borderRadius: '0.5em'
  }
})

class RegisterPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        realName: '',
        verified: false,
        error: '',
        username: '',
        password: '',
        email: '',
        contacts_entered: false,
        jwtToken: '',
        confirmationCode: null
      }

      this.onSubmit = this.onSubmit.bind(this)
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
    }

    componentDidMount() {
    }

    onSubmit = (event) => {
      event.preventDefault()

      if (this.state.error.length === 0) {
        Auth.signUp({
          username: this.state.email,
          password: this.state.password
        })
        .then((action) => {
          store.dispatch({
            type: "NEW_USER",
            response: action
          })
          console.log(action)
          localStorage.setItem('unconfirmedUser', action.user.username)
          localStorage.setItem('unconfirmedSub', action.userSub)
          console.log('Signed userr up, need to confirm')
          
          this.props.history.push('/confirm')
          return <Redirect to="/confirm" />
        })
        .catch((err) => {
          this.setState({'error': err.message})
          console.log(err)
        })
      }
    }

    changePassword = (event) => {
      this.setState({'error': ''})
      this.setState({ password: event.target.value });
    }

    confirmPassword = (event) => {
      var confirmedPWD = event.target.value
      if (this.state.password !== confirmedPWD) {
        this.setState({'error': 'passwords do not match'})
      }
      else {
        this.setState({'error': ''})
      }
    }

    changeEmail = (event) => {
      this.setState({'error': ''})
      this.setState({ email: event.target.value });
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
                <form className={classes.inputForm}>
                  <Typography align="center"  variant="body1"> REGISTER NEW USER </Typography>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    label='EMAIL'
                    name='email'
                    className={classes.inputField}
                    onChange={this.changeEmail}
                    margin="normal"
                    placeholder="email"
                  />
                  <TextField
                    required
                    fullWidth
                    type="password"
                    label='PASSWORD'
                    name='password'
                    className={classes.inputField}
                    onChange={this.changePassword}
                    margin="normal"
                    placeholder="Password"
                  />
                  <TextField
                    required
                    fullWidth
                    type="password"
                    label='CONFIRM PASSWORD'
                    name='confirm_password'
                    className={classes.inputField}
                    onChange={this.confirmPassword}
                    margin="normal"
                    placeholder=""
                  />
                </form>
                <div style={{margin:'auto 30%'}}>
                    <Button className={classes.nextButton} onClick={this.onSubmit}> Sign Up </Button>
                </div>
                <div style={{color:'#b20000', textAlign:'center', margin: '1em auto 5em auto'}}> {this.state.error} </div>
          </Grid>
        </Paper>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  clearCache: PropTypes.func,
  username: PropTypes.string,
  error: PropTypes.string,
  email: PropTypes.string,
  user: PropTypes.object
}

RegisterPage.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(withStyles(styles)(RegisterPage))