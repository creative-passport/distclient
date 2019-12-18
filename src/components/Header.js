import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import store from '../reducers/store'
import logo from '../logo.png'


const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#fafafa',
      main: '#fafafa',
      contrastText: '#ffcc00',
    },
    // error: will use the default color
    typography: {
      fontFamily: [
        'Roboto'
      ].join(','),
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
    // flexGrow: 1,
    width: '9%',
    lineHeight: '20px'
  }
});


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      open: false,
      anchorEl: null
    }

    this.openMenu = this.openMenu.bind(this)
    this.routeChange = this.routeChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    store.subscribe(() => {
      var test = store.getState().login.response
      if (test !== undefined && test.length > 0){
        this.setState({auth: true})
      }
      else {
        this.setState({auth: false})
      }
    })

  }

  routeChange(){
    window.location = 'https://cp.auth.eu-west-2.amazoncognito.com/login?response_type=token&client_id=242gellvv421kdgdicvcs1q3fv&redirect_uri=https://localhost:3000/auth/callback'
  }

  openMenu(event) {
    this.setState({open: true, anchorEl: event.currentTarget})
  }

  handleClose() {
    this.setState({open: false, anchorEl: null})
  }

  render(){
    const { classes } = this.props;  

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static" style={{ background: '#fafafa', color: '#000', boxShadow: 'none'}}>
            <Toolbar>
              <img src={logo} style={{marginTop: 10, marginBottom: 10, marginRight: 10}} className="App-logo" alt="logo" />

              <Typography variant="h6" className={classes.title}>
                The Creative Passport
              </Typography>

              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.openMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                className={classes.menu}
                anchorEl={this.state.anchorEl}
                keepMounted
                open={this.state.open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/signin">Login</NavLink>
                </MenuItem>
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/signin2">Login Native</NavLink>
                </MenuItem>
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/" >Home</NavLink>
                </MenuItem>
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/profile">Profile</NavLink>
                </MenuItem>
                <MenuItem onClick={() => {this.handleClose()}} >
                  <NavLink to="/verify">Verify Me</NavLink>
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

export default withStyles(styles)(Header)