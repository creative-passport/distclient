import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Login } from 'react-cognito'

import LoginForm from './LoginForm'
import Paper from '@material-ui/core/Paper'

import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

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
  }
})

class LoginPage extends React.Component {

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
      this.props.onSubmit(this.state.username, this.state.password)
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
      const attributes = this.attributes
      const { classes } = this.props

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container>
            <CssBaseline />
              <div style={{margin:'0 auto'}}>
                <img src={logo} style={{verticalAlign: 'middle', marginBottom:'0.5em', marginLeft: '20%'}} className="App-logo" alt="logo" />
                <span className={classes.title}> THE CREATIVE PASSPORT</span>
              </div>
              <Card className={classes.card}>
                <CardHeader title="LOGIN" className={classes.cardHeader} classes={{ title: classes.cardHeader }}/>              
                <CardContent className={classes.cardcontent}>
                  <Login>
                    <LoginForm />
                  </Login>
                </CardContent>
                <Divider/>
                  <div>
                    <Link className={classes.extraLinks} to="/register">New User</Link>
                    <Link className={classes.extraLinks} to="/reset">Reset Password</Link>
                  </div>
              </Card>
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

export default withStyles(styles)(LoginPage)
