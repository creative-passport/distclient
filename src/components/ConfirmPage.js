import React from 'react'
import PropTypes from 'prop-types'
import 'date-fns'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import CPButton from './CPButton'
import store from '../reducers/store'

import logo from '../logo.png'
import cp_mail_icon from '../images/cp_mail_icon.svg'

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
    },
    '& .MuiTypography-h5': {
      color: '#000',
      fontSize: '14pt',
      fontWeight: 'bold',
      marginBottom: '2em'
    }
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
  nextButton: {
    color:'#fff', 
    boxShadow: 'none', 
    backgroundColor: '#02d1a8',
    margin:'2em 25%',
    verticalAlign: 'middle',
    width: '10em',
    borderRadius: '0.5em'
  },
  mailIcon: {
    maxWidth: '100px',
    margin: '0 25%'
  }
})

class ConfirmPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      verificationCode: null,
      sub: '',
      username: '',
      error: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {

    let tempUser
    var state = store.getState()
    if (state.hasOwnProperty('newUser') && state.newUser.hasOwnProperty('response')){
      tempUser = state.newUser.response
      this.setState({username: tempUser.user.username, sub: tempUser.user.userSub})
    }

    store.subscribe(() => {
      console.log("hi new user")
      tempUser = store.getState().newUser
      console.log(tempUser.response)

      this.setState({username: tempUser.response.user.username, sub: tempUser.response.user.userSub})
    })

    tempUser = localStorage.getItem('unconfirmedUser')
    var tempSub = localStorage.getItem('unconfirmedSub')
    this.setState({username: tempUser, sub: tempSub})

  }

  onSubmit = (event) => {
    event.preventDefault()
    
    Auth.confirmSignUp(this.state.username, this.state.verificationCode).then((user) => {
      console.log('Confirm sign up successful, created initial passport profile')
      localStorage.removeItem('unconfirmedUser')
      localStorage.removeItem('unconfirmedSub')
      this.props.history.push('/login')
    })
    .catch(err => {
      if (! err.message) {
        console.log('Error when entering confirmation code: ', err)
      } else {
        console.log('Error when entering confirmation code: ', err.message)
      }
    })
  }

  onResend = (event) => {
    event.preventDefault()
    Auth.resendSignUp(this.state.username).then((user) => {
      this.setState({ error: 'Code resent' });
    }).catch((error) => {
      this.setState({ error });
    })
  }

  onCancel = (event) => {
    event.preventDefault()
    this.props.history.push('/register')
  }

  changeVerificationCode = (event) => {
    this.setState({ verificationCode: event.target.value });
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container>
            <CssBaseline />
              <div style={{margin:'0 auto 1.5em auto'}}>
                <img src={logo} style={{verticalAlign: 'middle', marginBottom:'0.5em', marginLeft: '20%'}} className="App-logo" alt="logo" />
                <span className={classes.title}> THE CREATIVE PASSPORT</span>
              </div>
              <Card style={{margin: '0 auto', border: 'none', boxShadow: 'none'}}>
              <div>
                <Typography component='h5' variant='h5'> We have sent you an email! </Typography>
                <div style={{margin: '0 auto', width: '130px'}}>
                  <img src={cp_mail_icon} style={{verticalAlign: 'middle',}} className="mailIcon" alt="mail" />
                </div>
                <Typography variant='body1'> Please complete your registration by entering your code below </Typography>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        required
                        fullWidth
                        label='code'
                        name='code'
                        onChange={this.changeVerificationCode}
                        margin="normal"
                        placeholder="code"
                      />
                </form>
                <Button className={classes.nextButton} onClick={this.onSubmit}>
                  Register
                </Button>
                <CPButton variant="contained" style={{height:'30px', verticalAlign: 'middle', marginRight:'1em', marginBottom: '1em'}} onClick={this.onResend}>
                  Resend Code
                </CPButton>
                <CPButton variant="contained" style={{width:'120px', height:'30px', verticalAlign: 'middle', marginRight:'1em', float: 'right'}} onClick={this.onCancel}>
                  Cancel
                </CPButton>
              </div>
              </Card>
              <div style={{margin:'0 auto'}}>
                <Link style={{marginTop:'1.5em'}} to="/">Home</Link>
              </div>
            <div style={{color:'#b20000', textAlign:'center', marginTop: '1em'}}> {this.state.error} </div>
          </Grid>
        </Paper>
      </div>
    )
  }
}

ConfirmPage.propTypes = {
  classes: PropTypes.object.isRequired,
  attributes: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onResend: PropTypes.func,
  error: PropTypes.string,
}

ConfirmPage.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(withStyles(styles)(ConfirmPage))
