import React from 'react'
import PropTypes from 'prop-types'
import 'date-fns'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { registerUser } from 'react-cognito'

import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import store from '../reducers/store'
import generateKey from './bip'

import { createTempProfile } from '../actions/authenticationActions'

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
  card: {
    borderRadius: '5%',
    width: '100%'
  },
  cardHeader: {
    background:'-webkit-linear-gradient(180deg, #ff00b4, #82b4dc, #00ffcc)',
    height: '80px',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: theme.spacing(2),
    lineHeight: '50px',
    fontWeight: '500',
    color: '#fff'
  },
  extraLinks: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    display: 'inline-grid',
    float: 'right'
  },
  cardFooter: {
    padding: 0,
  },
  secondCardHeader: {
    backgroundColor: '#cccccc',
    color: '#000',
    margin: '0 auto',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '14pt',
    fontWeight: '500'
  },
  nextButton: {
    marginTop: '1.5em', 
    borderRadius: '0', 
    color:'#fff', 
    boxShadow: 'none', 
    backgroundColor: '#02d1a8', 
    marginLeft:'0', 
    marginRight:'0'
  }
})

class RegisterPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        realName: '',
        dob: '',
        error: '',
        username: '',
        password: '',
        email: '',
        contacts_entered: false,
        jwtToken: ''
      }

      this.onSubmit = this.onSubmit.bind(this)

      this.proxyurl = "https://cors-anywhere.herokuapp.com/"
      this.urldev = 'https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/dev/'
      this.urlprod = 'https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/prod/'
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
    }

    componentDidMount() {
    }

    createNewPassport(action) {
      console.log("New Passport")

      console.log(action)
      
      var userProfile = {
        'PassportDataID': generateKey(),
        'PassportData': {
          'real_name': this.state.realName,
          'email': this.state.email,
          'dob': this.state.dob
        }
      }

      store.dispatch({
        type: "UNCONFIRMED_PROFILE",
        response: userProfile
      })
    }

    onSubmit = (event) => {
      event.preventDefault();

      const state = store.getState();
      const userPool = state.cognito.userPool;
      const config = state.cognito.config;

      if (this.state.realName.length > 0 && this.state.dob != null) {
        this.setState({'error': ''})
        registerUser(userPool, config, this.state.username, this.state.password, {
          email: this.state.email,
        }).then(
          (action) => {
            this.createNewPassport(action)
            store.dispatch(action)
            this.props.history.push('/')
          },
          error => {
            console.log(error)
            this.setState({ error })
        })
      } 
      else {
        this.setState({'error': 'You need to enter your real name and date of birth'})
      }      
    }

    onShowNextSection = (event) => {
      event.preventDefault()
      this.setState(prevState => ({
        contacts_entered: !prevState.contacts_entered
      }))
    }

    changeRealName = (event) => {
      this.setState({ realName: event.target.value });
    }

    changeDOB = (event) => {
      this.setState({ dob: event.target.value });
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

    render() {
      const attributes = this.attributes
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
              <Card className={classes.card}>
                <CardHeader title="NEW PASSPORT" className={classes.cardHeader} classes={{ title: classes.cardHeader }}/>              
                <CardContent className={classes.cardcontent}>
                   <TextField
                    required
                    fullWidth
                    value={this.state.realName}
                    id="standard-basic"
                    helperText='Real Name'
                    name='real_name'
                    onChange={this.changeRealName}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    type='date'
                    value={this.state.dob}
                    id="standard-basic"
                    helperText='Date of Birth'
                    name='dob'
                    onChange={this.changeDOB}
                    margin="normal"
                  /> 
                  <div>{this.props.error}</div>
                </CardContent>
                <CardActions className={classes.cardFooter}>
                  <Button fullWidth className={classes.nextButton} onClick={this.onShowNextSection}>
                    Next
                  </Button>
                </CardActions>
              </Card>

              {this.state.contacts_entered?
              <Card className={classes.card}>
                <CardHeader title="Contact" className={classes.secondCardHeader} classes={{ title: classes.secondCardHeader }}/>
                <CardContent className={classes.cardcontent}>
                  <form>
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
                </CardContent>
                <CardActions className={classes.cardFooter}>
                  <Button fullWidth className={classes.nextButton} onClick={this.onSubmit}>
                    Next
                  </Button>
                </CardActions>
              </Card>
              : null}
              <div style={{color:'#b20000', textAlign:'center', marginTop: '1em'}}> {this.state.error} </div>
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
  user: PropTypes.object,
  attributes: PropTypes.object
}

RegisterPage.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(withStyles(styles)(RegisterPage))