import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global';

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import store from '../reducers/store'
import Header from './Header'

const styles = theme => ({
   '@global': {
        body: {
          backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
})


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      <Box p={2}>{children}</Box>
    </Typography>
  )
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const mapStateToProps = state => {
  return { login: state.name, register: state.name };
}

class ConnectedUserSignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newUser: false,
            loginToken: '',
            forgotPassword: false,
            value: 0,
            name: '',
            email: '',
            password: '',
            userConfirmed: false,
            loggedIn: false
        }
        this.a11yProps = this.a11yProps.bind(this)
        this.awsSignIn = this.awsSignIn.bind(this)
        this.awsSignUp = this.awsSignUp.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    componentDidMount() {
        this.poolData = { 
            UserPoolId : window._env_.AWS_USER_POOL_ID,
            ClientId : window._env_.AWS_CLIENT_ID
        }

        this.awsGetUser()
    }

    a11yProps(index) {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    }

    awsGetUser(){

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);
        var cognitoUser = userPool.getCurrentUser();
        var that = this

        if (cognitoUser != null) {

            console.log(cognitoUser.getUsername())

            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                    if (session.isValid()) {
                        store.dispatch({
                            type: "LOGIN_USER_SUCCESS",
                            response: cognitoUser.getUsername()
                        })

                    if (cognitoUser.getUsername().length > 1) {
                        that.setState({loggedIn: true})
                    }
                    // window.location.href='/profile'
                }
            });
        }
    }

    awsSignIn(username, password) {

        var authenticationData = {
            Username : username,
            Password : password,
        }

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData)

        var User = new AmazonCognitoIdentity.CognitoUser({
            Username: username,
            Pool: userPool,
        });

        var that = this
        User.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                // var accessToken = result.getAccessToken().getJwtToken();
                AWS.config.region = window._env_.AWS_REGION
                const awsUrl = window._env_.AWS_USER_POOL_REGION

                console.log('access token + ' + result.getAccessToken().getJwtToken());
                
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: window._env_.AWS_USER_POOL_ID, // your identity pool id here
                    Logins: {
                        awsUrl: awsUrl,
                        jwtToken: result.getIdToken().getJwtToken()
                    },
                })

                console.log(AWS.config)
                
                var idToken = result.idToken.jwtToken;
                that.setState({loginToken: idToken, loggedIn: true})

                localStorage.setItem('userName', username)
                localStorage.setItem('loginToken', idToken)

                store.dispatch({
                    type: "LOGIN_USER_SUCCESS",
                    response: username
                })
                window.location.href='/profile'
            },
            onFailure: function(err) {
                console.log(err);
            },
        }) 
    }
    
    awsSignUp(username, email, password) {

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);

        var attribute = {
            Name : 'email',
            Value : email
        };

        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
        var attributeList = [];
        
        attributeList.push(attributeEmail);
        var cognitoUser;

        var that = this
        userPool.signUp(username, password, attributeList, null, function(err, result) {
            if (err) {
                console.log(err);
                store.dispatch({
                    type: "REGISTER_USER_ERROR",
                    response: username
                })
                return;
            }
            cognitoUser = result.user;

            const registeredName = cognitoUser.getUsername()

            localStorage.setItem('userName', registeredName)
            store.dispatch({
                type: "REGISTER_USER_SUCCESS",
                response: registeredName
            })

            that.setState({newUser: false, name: registeredName})
        });
    }

    handleTabChange(event, newValue) {
        if(newValue === 0){
            this.setState({newUser: false})
        } else if (newValue === 1) {
            this.setState({newUser: true})
        }
        this.setState({value: newValue})

    }

    handleSignUp(e) {
        e.preventDefault();
        this.setState({newUser: true})
    }

    handleNameChange(e) {
       this.setState({name: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
       this.setState({password: e.target.value});
    }

    handleSubmit(event){
        event.preventDefault()
        if (this.state.newUser === true){
            this.awsSignUp(this.state.name, this.state.email, this.state.password)
        } else {
            this.awsSignIn(this.state.name, this.state.password)
        }
    }
    
    render() {
        const { classes } = this.props;  

        return(
        <div>
        <Header/>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Tabs
                    className={classes.tabs}
                    value={this.state.value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Sign In" {...this.a11yProps(0)} />
                    <Tab label="Sign Up" {...this.a11yProps(1)} />
                </Tabs>
                <TabPanel className={classes.singleTab} value={this.state.value} index={0}>
                    <Typography component="h1" variant="h5"> Sign in </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={this.state.name} 
                        onChange={this.handleNameChange}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="#" variant="body2" onClick={this.handleSignUp}>
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                </TabPanel>
                <TabPanel className={classes.singleTab} value={this.state.value} index={1}>
                    <Typography component="h1" variant="h5"> Sign up </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={this.state.name} 
                        onChange={this.handleNameChange}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={this.state.email} 
                        onChange={this.handleEmailChange}
                     />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                      Sign Up
                      </Button>
                    </form>
                </TabPanel>
              </div>
            </Container>
        </div>
    )}
}

ConnectedUserSignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

const UserSignIn = connect(mapStateToProps)(ConnectedUserSignIn)

export default withStyles(styles)(UserSignIn)