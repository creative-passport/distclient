import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { loadCSS } from 'fg-loadcss'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import * as api from '../scripts'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { isMobile } from 'react-device-detect'

import Layout from './Layout'
import Profile from './Profile'
import MobileProfile from './MobileProfile'
import CPButton from './CPButton'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Switch } from 'antd'
import { Auth } from 'aws-amplify'
import { ControlledExpansionPanels } from './ControlledExpansionPanels'

import 'antd/dist/antd.css'
import './App.css'


const styles = theme => ({
  root: {
    width: '100%',
  },
  expand_children: {
    backgroundColor: '#02d1a8',
    padding: 0,
  },
  show_profile_button: {
    boxShadow: 'none',
    marginLeft: theme.spacing(3),
    height: 0,
    width: 0
  }
})

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
          expanded: false,
          profiles: {},
          new_profile_name: null,
          show_add_profile: false
      }
      this.saveProfiles = this.saveProfiles.bind(this)
      this.addNewProfile = this.addNewProfile.bind(this)
      this.handleNewProfileName = this.handleNewProfileName.bind(this)
      this.createNewPassport = this.createNewPassport.bind(this)
      this.showAddProfile = this.showAddProfile.bind(this)

    }

    componentDidMount() {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      )

      Auth.currentAuthenticatedUser().then(
        user => {
          this.setState({walletId: user.attributes.sub})
          this.setState({email: user.attributes.email})
          this.setState({jwtToken: user.signInUserSession.idToken.jwtToken})

          api.getProfileData(user.attributes.sub).then(res => {
            if(res.data.length === 0) {
              console.log("new passport")
              this.createNewPassport()
            } else {
              this.setState({
                profiles: res.data.PassportData
              })
            }
          }).catch(function (error) {
              console.log(error)
          })
        }
      ).catch(
        error => {
          console.log("NO AUTH USER " + error)
        }
      )
    }

    createNewPassport() {
      var userProfile = {
        'PassportId': this.state.walletId,
        'PassportData': {
          'email': this.state.email,
          'artist_profiles' : {}
        }
      }

      api.updateProfileData(userProfile['PassportId'], userProfile['PassportData'], this.state.jwtToken)

      this.setState({
        profiles: userProfile.PassportData
      })
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

    showAddProfile() {
      this.setState(prevState => ({
        show_add_profile: !prevState.show_add_profile
      }))
    }

    //TODO Implement
    deleteProfile(name){
      console.log("delete the selected profile")
    }

    saveProfiles(){
      var prof = this.state.profiles
      prof['email'] = this.state.email
      api.updateProfileData(this.state.walletId, prof, this.state.jwtToken)
    }

    render() {
      const { classes } = this.props
      //              
      let profiles
      if('artist_profiles' in this.state.profiles) {
        profiles = <ControlledExpansionPanels all_profiles={this.state.profiles}/>
      }

      return (
        <Layout>
          <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={2}>
              <Typography gutterBottom variant="h5" component="h5"> PERSONAS </Typography>
            </Grid>
            <Grid item>
              <Fab size='small' component="span" onClick={this.showAddProfile} className={classes.show_profile_button}>
                <AddCircleIcon style={{ color:'#02d1a8', marginTop: '-0.2em'}}/>
              </Fab>
            </Grid>
          </Grid>
          { this.state.show_add_profile ? 
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
                <CPButton variant="contained" onClick={this.addNewProfile} style={{width:'30px', height:'30px', marginRight: '5%'}}> Add </CPButton>
              </Grid>
            </Grid>
          : null }
          <div style={{marginTop:'0.5em'}}>
            {profiles}
          </div>
          <Grid item xs style={{marginTop: '1em'}}>
            <CPButton variant="contained" style={{width:'170px', height:'30px'}} onClick={this.saveProfiles}> Save Changes </CPButton>
          </Grid>
        </Layout>
      )
    }
}

AllProfiles.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default withStyles(styles)(AllProfiles)
  