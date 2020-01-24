import React from 'react'
import PropTypes from 'prop-types'
import 'date-fns'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { changePassword } from 'react-cognito'
import { Link } from 'react-router-dom'

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

import { createTempProfile } from '../actions/authenticationActions'
import ChangePasswordForm from './ChangePasswordForm'

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

class ChangePasswordPage extends React.Component {

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
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
    }

    changePassword = (event) => {
      this.setState({ password: event.target.value });
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
                <ChangePasswordForm/>
              </div>
              </Card>
              <Link style={{marginTop:'1.5em'}} to="/">Home</Link>
              <div style={{color:'#b20000', textAlign:'center', marginTop: '1em'}}> {this.state.error} </div>
          </Grid>
        </Paper>
      </div>
    )
  }
}

ChangePasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  clearCache: PropTypes.func,
  username: PropTypes.string,
  error: PropTypes.string,
  email: PropTypes.string,
  user: PropTypes.object,
  attributes: PropTypes.object
}

ChangePasswordPage.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(withStyles(styles)(ChangePasswordPage))
