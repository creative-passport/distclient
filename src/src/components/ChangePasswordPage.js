import React from 'react'
import PropTypes from 'prop-types'
import 'date-fns'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { Link, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
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
        error: '',
        oldPassword: '',
        newPassword: '',
      }
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
    }

    onSubmit = (event) => {
      event.preventDefault()

      Auth.currentAuthenticatedUser().then(
        user => {
          Auth.changePassword(user, this.state.oldPassword, this.state.newPassword).then(
            () => {
              this.setState({ error: 'Password changed' })
              return <Redirect to="/login" />
            }).catch((error) => {
              this.setState({ error });
            })
        }).catch(
        error => {
          console.log(error)
        }
      )
    }

    changeOldPassword = (event) => {
      this.setState({ oldPassword: event.target.value });
    }

    changeNewPassword = (event) => {
      this.setState({ newPassword: event.target.value });
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
                <form>
                  <div>{this.state.error}</div>
                  <label>
                    Old Password
                    <input required type="password" placeholder="old password" onChange={this.changeOldPassword} required style={{width:'180px', height:'30px', verticalAlign: 'middle', margin:'1em'}} />
                  </label>
                  <label>
                    New Password
                    <input type="password" placeholder="new password" onChange={this.changeNewPassword} required style={{width:'180px', height:'30px', verticalAlign: 'middle', margin:'1em'}} />
                  </label>
                  <CPButton type="submit" variant="contained" style={{width:'100%', verticalAlign: 'middle', marginRight:'1em', marginBottom: '1em'}} onClick={this.onSubmit}> Set new password </CPButton>
                </form>
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
