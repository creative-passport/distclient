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
import { Switch } from 'antd'
import { Auth } from 'aws-amplify'

import 'antd/dist/antd.css'
import './App.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  public_switch: {
    width: 36,
    height: 16,
    marginLeft: '2em'
  },
  expand_panel: {
    border: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    color: 'white',
    boxShadow: 'none',
    height: 35,
    backgroundColor: '#02d1a8'
  },
  expand_group: {
    boxShadow: 'none',
  },
  expand_children: {
    backgroundColor: '#02d1a8',
    padding: 0,
  }
}))

const styles = theme => ({
  root: {
    width: '100%',
  },
  expand_children: {
    backgroundColor: '#02d1a8',
    padding: 0,
  }
})

const ControlledExpansionPanels = ({all_profiles}) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const profiles = Object.keys(all_profiles['artist_profiles']).map((keyName, i) => {
    const id = i.toString()
    const artist_data = all_profiles['artist_profiles'][keyName]
    var currentPanel = 'panel'+i
    const ariaContent = "additional-actions"+i+"-content"
    const panelId = "additional-actions"+i+"-header"
    const artist_name = keyName

    let singleProfile
    if (isMobile) {
      singleProfile = <ExpansionPanel key={i} className={classes.expand_group} expanded={expanded === currentPanel} onChange={handleChange(currentPanel)}>
        <ExpansionPanelSummary
          className={classes.expand_panel}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={ariaContent}
          id={panelId}
        >
          <Typography className={classes.heading}>{artist_name}</Typography>
          <FormControlLabel
            aria-label="Acknowledge"
            className={classes.heading}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Switch size="small" className={classes.public_switch}/>}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expand_children}>
          <MobileProfile profile_id={id} artist_name={artist_name} artist_data={artist_data}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    }
    else {
      singleProfile = <ExpansionPanel key={i} className={classes.expand_group} expanded={expanded === currentPanel} onChange={handleChange(currentPanel)}>
        <ExpansionPanelSummary
          className={classes.expand_panel}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={ariaContent}
          id={panelId}
        >
        <Typography className={classes.heading}>{artist_name}</Typography>
          <FormControlLabel
            aria-label="Acknowledge"
            className={classes.heading}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Switch size="small" className={classes.public_switch}/>}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expand_children}>
          <Profile profile_id={id} artist_name={artist_name} artist_data={artist_data}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    }

    return (singleProfile)
  })

  return (profiles)
}


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
          new_profile_name: null
      }
      this.saveProfiles = this.saveProfiles.bind(this)
      this.addNewProfile = this.addNewProfile.bind(this)
      this.handleNewProfileName = this.handleNewProfileName.bind(this)
      this.createNewPassport = this.createNewPassport.bind(this)

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
        console.log(this.state.new_profile_name)

        var artist_name = this.state.new_profile_name
        var currentProfiles = this.state.profiles

        currentProfiles['artist_profiles'][artist_name] = {'artist_name': artist_name}
        this.setState({profiles: currentProfiles})
      }
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

      let profiles
      if('artist_profiles' in this.state.profiles) {
        profiles = <ControlledExpansionPanels all_profiles={this.state.profiles}/>
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
              <CPButton variant="contained" onClick={this.addNewProfile} style={{width:'30px', height:'30px', marginRight: '5%'}}> Add </CPButton>
            </Grid>
            <Grid item xs>
              <CPButton variant="contained" style={{width:'170px', height:'30px'}} onClick={this.saveProfiles}> Save Changes </CPButton>
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
  