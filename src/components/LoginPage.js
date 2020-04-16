import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'

import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import CPButton from './CPButton'
import { Auth } from 'aws-amplify'

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
    padding: '2em'
  },
  submitButton: {
    color:'#fff', 
    boxShadow: 'none', 
    backgroundColor: '#02d1a8',
    margin:'1.5em auto 1.5em auto',
    verticalAlign: 'middle',
    width: '10em',
    borderRadius: '0.5em'
  },
  extraLinks: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'inline-grid'
  },
  extraLinks2: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'inline-grid',
    float: 'right'
  }
})

class LoginPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      }
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
    }

    onSubmit = (event) => {
      event.preventDefault()
      Auth.signIn({
        username: this.state.email,
        password: this.state.password
      })
      .then(
        (action) => {
          Auth.currentAuthenticatedUser().then((user) => {
            this.props.history.push('/profile')
            return <Redirect to="/profile" />
          }).catch((error) => {
            console.log(error)
          })
        },
        error => {
          console.log( error )
          this.setState({ error })
        }
      )
    }

    changeEmail = (event) => {
      this.setState({ email: event.target.value });
    }

    changeUsername = (event) => {
      this.setState({ username: event.target.value });
    }

    changePassword = (event) => {
      this.setState({ password: event.target.value });
    }

    componentWillUnmount = () => {
    }

    render() {
      const { classes, history } = this.props

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
                    <Typography align="center" variant="body1"> Login to the Creative Passport</Typography>
                    <TextField
                      required
                      fullWidth
                      value={this.state.email}
                      label='email'
                      name='email'
                      onChange={this.changeEmail}
                      margin="normal"
                    />
                    <TextField
                      required
                      fullWidth
                      type="password"
                      label='password'
                      name='password'
                      onChange={this.changePassword}
                      margin="normal"
                      placeholder="Password"
                    />
                  </form>
                  <CPButton fullWidth className={classes.submitButton} onClick={this.onSubmit}>Sign in</CPButton>
              <Divider/>
                <div style={{margin:'0 auto'}}>
                  <Link className={classes.extraLinks} to="/register">New User</Link>
                  <Link className={classes.extraLinks2} to="/reset">Reset Password</Link>
                </div>
                <div>{this.props.error}</div>
            </Grid>
          </Paper>
        </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  clearCache: PropTypes.func,
  username: PropTypes.string,
  error: PropTypes.string,
  email: PropTypes.string,
  user: PropTypes.object,
  attributes: PropTypes.object
}

export default withRouter(withStyles(styles)(LoginPage))
