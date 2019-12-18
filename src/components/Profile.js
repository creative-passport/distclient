import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import clsx from 'clsx'
import { loadCSS } from 'fg-loadcss'
import { withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import store from '../reducers/store'
import Layout from './Layout'
import ProfileRow from './ProfileRow'


const BootstrapButton = withStyles(theme => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    color: '#FFFFFF',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#010b3d',
    borderColor: '#010b3d',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
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
    },
  },
}))(Button);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
  tabs: {
    backgroundColor: theme.palette.background.paper
  },
  singleTab: {
    backgroundColor: theme.palette.background.paper
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

class Profile extends Component {

    constructor(props) {
      super(props);
      this.state = {
          loggedIn: false,
          error: '',
          additionalRows: [],
          currentData: null,
          direction: 'ltl',
          value: 0,
          jwtToken: ''
      }
      this.data = null
      this.addData = this.addData.bind(this)
      this.addRow = this.addRow.bind(this)
      this.saveProfile = this.saveProfile.bind(this)
      this.a11yProps = this.a11yProps.bind(this)
      this.handleTabChange = this.handleTabChange.bind(this)
    }

    componentDidMount() {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      )

      var cog = store.getState().cognito
      var user = cog.user; 

      user.getSession((err, session) => {
        if (err) {
          console.log(err)
        } else {
          console.log(session)
          this.setState({jwtToken: session.getIdToken().getJwtToken()})
        }
      })


      store.subscribe(() => {
        var test = store.getState().login.response
        // console.log(test)
        // if (test.length > 0){
        //   this.setState({auth: true})
        // }
        // else {
        //   this.setState({auth: false})
        // }
      })
    }

    addData(event) {
      this.setState({currentData: event})
    }

    addRow(){
      this.setState(state => {
        const list = state.additionalRows.push(' ');
        return list
      })
      console.log(this.state.additionalRows)
    }

    handleTabChange(event, newValue) {
      this.setState({value: newValue})
    }

    a11yProps(index) {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    }

    saveProfile(){
      console.log("Save Profile")
      var data = this.data

      var config = {
          headers: {
              Authorization: this.state.jwtToken
              // data: data
          }
      }

      //https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/prod
      axios.post('https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/prod/storepassportdata', config).then(
        res => { 
          console.log(res)
      }).catch(function (error) {
        console.log(error)
      })

      // axios.post('https://0.0.0.0:8080/update_profile', config).then(
      //     res => { 
      //       console.log(res)
      //   }).catch(function (error) {
      //     console.log(error)
      //   })
    }

    render() {
      const { classes } = this.props

      const rows = this.state.additionalRows.length >= 1 ? 
        this.state.additionalRows.map((row, index) => {
          return <ProfileRow key={index} required={false} label={row} name={row} onDataChange={this.addData}/>
        }) : null

      return (
        <Layout>
          <Tabs
            className={classes.tabs}
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="CP Profile" {...this.a11yProps(0)} />
            <Tab label="External Data" {...this.a11yProps(1)} />
            <Tab label="Releases" {...this.a11yProps(2)} />
          </Tabs>

          <TabPanel className={classes.singleTab} value={this.state.value} index={0}>
              <div className={classes.root} spacing={1}>
                <ProfileRow key='0' label='bio' name='Bio' onDataChange={this.addData}/>
                <ProfileRow key='1' label='short_bio' name='Short Bio' onDataChange={this.addData}/>
                {rows}
                <Icon
                  className={clsx(classes.iconHover, 'fa fa-plus-circle')}
                  color="primary"
                  style={{ fontSize: 50 }}
                  onClick={this.addRow}
                />
              </div>
              <div>
                <BootstrapButton variant="contained" fullWidth className={classes.margin} onClick={this.saveProfile}>
                  Save Changes
                </BootstrapButton>
              </div>
            </TabPanel>
          <TabPanel className={classes.singleTab} value={this.state.value} index={1}>
              Item Two
            </TabPanel>
          <TabPanel className={classes.singleTab} value={this.state.value} index={2}>
              Item Three
            </TabPanel>
        </Layout>
      )
    }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default withStyles(styles)(Profile)
  