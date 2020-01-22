import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { loadCSS } from 'fg-loadcss'
import { withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { CognitoState } from 'react-cognito'

import Icon from '@material-ui/core/Icon'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'


import * as api from '../scripts'
import store from '../reducers/store'
import ProfileRow from './ProfileRow'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  indicator: {
    backgroundColor: '#ffffff',
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
  inactive_tab: {
    backgroundColor: '#009678',
    color: '#c9c9c9',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginRight: '0.5em'
  },
  tab_content: {
    backgroundColor: '#ffffff',
  },
  active_tab: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginRight: '0.5em'
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      style={{width:'100%'}}
      role="tabpanel"
      id={`nav-tabpanel-${index}`}
      component={'span'}
      hidden={value !== index}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box m={3}>{children}</Box>
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
          error: '',
          additionalRows: [],
          currentData: {},
          value: 0,
          jwtToken: '',
          walletId: '',
          cognitue_state: store.getState().cognito
      }
      this.addData = this.addData.bind(this)
      this.addRow = this.addRow.bind(this)
      this.saveProfile = this.saveProfile.bind(this)
      this.addNewProfile = this.addNewProfile.bind(this)
      this.a11yProps = this.a11yProps.bind(this)
      this.handleTabChange = this.handleTabChange.bind(this)
    }

    componentDidMount() {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      )

      const user = this.state.cognitue_state.user
      const attributes = this.state.cognitue_state.attributes

      if (user !== undefined) {
        user.getSession((err, session) => {
          if (err) {
            console.log(err)
          } else {
            this.setState({jwtToken: session.getIdToken().getJwtToken()})
          }
        })
      }

      this.setState({currentData: this.props.artist_data})
    }

    addData(event) {
      var currentData = this.state.currentData
      var newIndex = event['indexValue']
      var fieldName = event['fieldName']
      var newEvent = {fieldName: event}

      if ('fieldName' in event && event['fieldName'] !== undefined) {
        currentData[event['fieldName']] = event
      }

      this.setState({currentData: currentData})
    }

    addRow(){
      this.setState(state => {
        const list = state.additionalRows.push(' ');
        return list
      })
    }

    handleShowProfile(){
      this.setState(prevState => ({
        show_profile: !prevState.show_profile
      }))
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

    addNewProfile(name){
      console.log("create new persona profile")
    }

    deleteProfile(name){
      console.log("delete the selected profile")
    }

    saveProfile(){
      var results = api.updateProfileData(this.state.walletId, this.state.currentData, this.state.jwtToken)
      console.log(results)
    }

    render() {
      const { classes } = this.props

      const rows = this.state.additionalRows.length >= 1 ? 
        this.state.additionalRows.map((row, index) => {
          const trueIndex = index + 7
          return <ProfileRow key={trueIndex} fieldName={row} indexValue={trueIndex} required={false} label={row} name={row} onDataChange={this.addData}/>
        }) : null

      return (
          <Box className={classes.root} display="flex" flexWrap="wrap">
            <Tabs
              value={this.state.value}
              onChange={this.handleTabChange}
              variant="fullWidth"
            >
              <Tab className={this.state.value===0 ? classes.active_tab:classes.inactive_tab} label="CP Profile" {...this.a11yProps(0)} />
              <Tab className={this.state.value===1 ? classes.active_tab:classes.inactive_tab} label="External Data" {...this.a11yProps(1)} />
              <Tab className={this.state.value===2 ? classes.active_tab:classes.inactive_tab} label="Releases" {...this.a11yProps(2)} />
            </Tabs>

            <TabPanel className={classes.tab_content} value={this.state.value} index={0}>
              <ProfileRow key='0' fieldName='bio' indexValue={0} label='bio' name='Bio' textValue={this.props.artist_data['bio']} onDataChange={this.addData}/>
              <ProfileRow key='1' fieldName='short_bio' indexValue={1} label='short_bio' textValue={this.props.artist_data['short_bio']} name='Short Bio' onDataChange={this.addData}/>
              <ProfileRow key='3' fieldName='home_loc' indexValue={3} label='home_loc' textValue={this.props.artist_data['home_loc']} name='Home Location' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='4' fieldName='current_loc' indexValue={4} label='current_loc' textValue={this.props.artist_data['current_loc']} name='Current Location' multiline='false' onDataChange={this.addData}/>
              {rows}
              <Icon
                className={clsx(classes.iconHover, 'fa fa-plus-circle')}
                style={{ fontSize: 50, color:"#00ffcc" }}
                onClick={this.addRow}
              />
            </TabPanel>
            <TabPanel className={classes.tab_content} value={this.state.value} index={1}>
              <ProfileRow key='5' fieldName='quote' indexValue={5} label='quote' name='Favortie Quote' textValue={this.props.artist_data['quote']} multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='6' fieldName='metadata' indexValue={6} label='metadata' name='Metadata' textValue={this.props.artist_data['metadata']} multiline='true' onDataChange={this.addData}/>
              <Icon
                className={clsx(classes.iconHover, 'fa fa-plus-circle')}
                style={{ fontSize: 50, color:"#00ffcc" }}
                onClick={this.addRow}
              />
            </TabPanel>
            <TabPanel className={classes.tab_content} value={this.state.value} index={2}>
              <ProfileRow key='5' fieldName='releases' indexValue={5} label='releases' name='Releases' textValue={this.props.artist_data['releases']} multiline='false' onDataChange={this.addData}/>
              <Icon
                className={clsx(classes.iconHover, 'fa fa-plus-circle')}
                style={{ fontSize: 50, color:"#00ffcc" }}
                onClick={this.addRow}
              />
              </TabPanel>
          </Box>
      )
    }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  profile_id: PropTypes.string,
  artist_name: PropTypes.string,
  artist_data: PropTypes.object
}

export default withStyles(styles)(Profile)
  