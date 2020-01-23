import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { loadCSS } from 'fg-loadcss'
import { withStyles } from '@material-ui/core/styles'
import * as api from '../scripts'
import {getUserAttributes} from 'react-cognito/src/attributes.js'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from 'react-device-detect'

import store from '../reducers/store'
import Layout from './Layout'
import Profile from './Profile'
import MobileProfile from './MobileProfile'
import CPButton from './CPButton'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  expand_panel: {
    border: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    color: 'white',
    boxShadow: 'none',
    height: 35,
    backgroundColor: '#00ffcc'
  },
  expand_group: {
    height: '3em',
    boxShadow: 'none',
  },
  expand_children: {
    backgroundColor: '#00ffcc',
    padding: 0,
  }
});


class AllProfiles extends Component {

    constructor(props) {
      super(props);
      this.state = {
          loggedIn: false,
          error: '',
          email: '',
          value: 0,
          jwtToken: '',
          walletId: '',
          show_profile: false,
          profiles: {},
          new_profile_name: null
      }
      this.saveProfiles = this.saveProfiles.bind(this)
      this.addNewProfile = this.addNewProfile.bind(this)
      this.handleNewProfileName = this.handleNewProfileName.bind(this)

      this.proxyurl = "https://cors-anywhere.herokuapp.com/"
      this.urldev = 'https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/dev/'
      this.urlprod = 'https://vd5e0pnn7i.execute-api.eu-west-2.amazonaws.com/prod/'

    }

    componentDidMount() {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      )

      var cog = store.getState().cognito
      var user = cog.user

      if (user !== undefined) {
        user.getSession((err, session) => {
          if (err) {
            console.log(err)
          } else {
            this.setState({jwtToken: session.getIdToken().getJwtToken()})
          }
        })
      }

      getUserAttributes(cog.user).then(res => {
        this.setState({walletId: res.sub})
        this.setState({email: res.email})
        
        api.getProfileData(res.sub).then(res => {
          console.log(res.data.PassportData)

          let dataToUpdate = res.data.PassportData
          if (!('artist_profiles' in res.data.PassportData)){
            dataToUpdate['artist_profiles'] = {}
          }

          this.setState({
            profiles: dataToUpdate
          })
        }).catch(function (error) {
            console.log(error)
        })
      }).catch(function (error) {
        console.log(error)
      })
    }

    handleShowProfile(){
      this.setState(prevState => ({
        show_profile: !prevState.show_profile
      }))
    }

    handleNewProfileName(e){
      this.setState({new_profile_name: e.target.value})
    }

    addNewProfile(){
      if (this.state.new_profile_name !== undefined && this.state.new_profile_name !== null && this.state.new_profile_name.length > 1) {
        var artist_name = this.state.new_profile_name
        var currentProfiles = this.state.profiles
        currentProfiles['artist_profiles'][artist_name] = {'artist_name': artist_name}
        this.setState({profiles: currentProfiles})
      }
    }

    deleteProfile(name){
      //TODO Implement
      console.log("delete the selected profile")
    }

    saveProfiles(){
      var prof = this.state.profiles
      prof['email'] = this.state.email
      api.updateProfileData(this.state.walletId, prof, this.state.jwtToken)
    }

    profile(key, id, artist_name, artist_data) {
      const { classes } = this.props

      if (isMobile) {
        return (
          <ExpansionPanel key={key} className={classes.expand_group}>
            <ExpansionPanelSummary
              className={classes.expand_panel}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{artist_name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expand_children}>
              <MobileProfile profile_id={id} artist_name={artist_name} artist_data={artist_data}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          )
      }
      else {
        return (
          <ExpansionPanel key={key} className={classes.expand_group}>
            <ExpansionPanelSummary
              className={classes.expand_panel}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{artist_name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expand_children}>
              <Profile profile_id={id} artist_name={artist_name} artist_data={artist_data}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          )
      }
    }

    render() {
      const { classes } = this.props

      const state = store.getState()
      const user = state.cognito.user
      const attributes = state.cognito.attributes

      let profiles
      if('artist_profiles' in this.state.profiles) {
        profiles = Object.keys(this.state.profiles['artist_profiles']).map((keyName, i) => (
          this.profile(i, i.toString(), keyName, this.state.profiles['artist_profiles'][keyName])
        ))
      }
      
      return (
        <Layout>
            <Typography gutterBottom variant="h5" component="h5"> Profiles </Typography>
            <Grid container spacing={1} direction="row" justify="flex-end" alignItems="center">
              <Grid item xs={8}>
                <InputBase
                  fullWidth
                  className={classes.input}
                  placeholder="ARTIST NAME ..."
                  inputProps={{ 'aria-label': 'Add new profile' }}
                  onChange={this.handleNewProfileName}
                />
              </Grid>
              <Grid item xs>
                <CPButton variant="contained" style={{width:'30px', height:'30px', marginRight: '15%'}} onClick={this.addNewProfile}>
                  Add
                </CPButton>
              </Grid>
              <Grid item xs>
                <CPButton variant="contained" style={{width:'170px', height:'30px'}} onClick={this.saveProfiles}>
                    Save Changes
                </CPButton>
              </Grid>
            </Grid>
            <div style={{marginTop:'0.5em'}}>
              {profiles}
            </div>
        </Layout>
      )
    }
}

AllProfiles.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default withStyles(styles)(AllProfiles)
  