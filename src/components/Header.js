import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings'
import { Auth } from 'aws-amplify'

import logo from '../logo.png'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      light: '#fafafa',
      main: '#fafafa',
      contrastText: '#ffcc00',
    },
    typography: {
      fontFamily: [
        'SAN FRANCISCO TEXT REGULAR'
      ].join(','),
      '&:hover': {
        backgroundColor: '#0A941A',
        borderColor: '#0A941A',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0A941A',
        borderColor: '#0A941A',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      }
    }
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    backgroundColor: 'secondary',
    color: 'secondary',
    boxShadow: '0'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: 'auto',
  },
  title: {
    lineHeight: '20px',
    fontStyle: 'SAN FRANCISCO TEXT BOLD',
    background: '-webkit-linear-gradient(180deg, #ff00b4, #82b4dc, #00ffcc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
    
  }
});


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      open: false,
      anchorEl: null,
      appbarWidth: window.innerWidth
    }

    this.openMenu = this.openMenu.bind(this)
      this.handleClose = this.handleClose.bind(this)
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(
      user => {
        if (user.username.length > 5) {
          this.setState({auth: true})
        }
    }).catch(
      error => {
        console.log(error)
        this.setState({auth: false})
      }
    )
  }

  openMenu(event) {
    this.setState({open: true, anchorEl: event.currentTarget})
  }

  handleClose() {
    this.setState({open: false, anchorEl: null})
  }

  handleLogout() {
    Auth.signOut().then( 
      data => {
        console.log("log out")
        this.props.history.push('/login')
      }
    ).catch(err => console.log(err))
  }

  refCallback = element => {
    if (element) {
      this.setState({currentWidth: element.getBoundingClientRect().width})
    }
  }

  render(){
    const { classes } = this.props

    let UserStatusMenuItem

    if(this.state.auth === true) {
      UserStatusMenuItem = <MenuItem onClick={() => {this.handleLogout(); this.handleClose()}} > Logout </MenuItem>
    }
    else {
      UserStatusMenuItem = <MenuItem onClick={() => {this.handleClose()}} >
        <NavLink to="/signin2">Login</NavLink>
      </MenuItem>
    }
       
    var logoWidth = '9%'
    if (this.state.currentWidth <= 450){
      logoWidth = '35%'
    }

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static" style={{ background: '#fafafa', color: '#000', boxShadow: 'none'}}>
            <Toolbar ref={this.refCallback}>
              <img src={logo} style={{marginTop: 10, marginBottom: 10, marginRight: 10}} className="App-logo" alt="logo" />

              <Typography variant="h6" className={classes.title} style={{width:logoWidth}}>
                THE CREATIVE PASSPORT
              </Typography>

              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.openMenu}>
                <SettingsIcon style={{color: '#02d1a8'}}/>
              </IconButton>
              <Menu
                id="simple-menu"
                className={classes.menu}
                anchorEl={this.state.anchorEl}
                keepMounted
                open={this.state.open}
                onClose={this.handleClose}
              >
                {UserStatusMenuItem}
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/change_password">Change password</NavLink>
                </MenuItem>
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/verify">Verify Me</NavLink>
                </MenuItem>
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/settings">Settings</NavLink>
                </MenuItem>
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/">Home</NavLink>
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    )
  }  
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Header))