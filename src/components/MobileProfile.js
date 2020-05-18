import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { loadCSS } from 'fg-loadcss'
import { withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Iframe from './iframe.js'
import Fab from '@material-ui/core/Fab'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Auth } from 'aws-amplify'

import * as api from '../scripts'
import store from '../reducers/store'
import ProfileRow from './ProfileRow'

const styles = theme => ({
  root: {
    zIndex: 100,
  },
  indicator: {
    backgroundColor: '#ffffff',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  }
})

class MobileProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          error: '',
          additionalRows: [],
          currentData: {},
          value: 0,
          jwtToken: '',
          walletId: '',
          cognitue_state: store.getState().cognito,
          expanded: false,
          src: ''
      }
      this.addData = this.addData.bind(this)
      this.addRow = this.addRow.bind(this)
      this.saveProfile = this.saveProfile.bind(this)
      this.addNewProfile = this.addNewProfile.bind(this)
      this.handleExpand = this.handleExpand.bind(this)
    }

    componentDidMount() {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      )

      Auth.currentSession()
        .then((response) => {
          this.setState({jwtToken: response.idToken.jwtToken})
      })
        .catch((error) => {
            console.log(error);
      })

      // var streemlinerRoot = 'https://streemliner.com/app/proCP/contributor.php?u='
      // var stlUsername = 'imogen%20heap'
      // if(user.username === 'imogenheap') {
      //   stlUsername = 'imogen%20heap'
      // }
      // else {
      //   stlUsername = user.username.replace('_','%20')
      // }
      // this.setState({src: streemlinerRoot + stlUsername})

      this.setState({currentData: this.props.artist_data})
    }

    addData(event) {
      var currentData = this.state.currentData
      var newIndex = event['indexValue']

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

    addNewProfile(name){
      console.log("create new persona profile")
    }

    deleteProfile(name){
      console.log("delete the selected profile")
    }

    saveProfile(){
      var results = api.updateProfileData(this.state.walletId, this.state.currentData, this.state.jwtToken)
    }

    handleExpand(panel){
      console.log(panel)
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
            <Grid container spacing={2} direction="row">
              <Grid item xs={12}>
                <ExpansionPanel key={0} className={classes.expand_group}>
                  <ExpansionPanelSummary
                    className={classes.expand_panel}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={classes.heading}>PASSPORT INFO</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expand_children}>
                    <Grid container spacing={1} direction="row">
                      <ProfileRow key='2' fieldName='home_loc' indexValue={2} label='home_loc' textValue={this.props.artist_data['home_loc']} name='Home Location' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='9' fieldName='skills' indexValue={9} label='skills' name='Skills' textValue={this.props.artist_data['skills']} multiline='true' onDataChange={this.addData}/>  
                      <ProfileRow key='0' fieldName='bio' indexValue={0} label='bio' name='Bio' textValue={this.props.artist_data['bio']} multiline='true' onDataChange={this.addData}/>
                      <ProfileRow key='1' fieldName='short_bio' indexValue={1} label='short_bio' textValue={this.props.artist_data['short_bio']} name='Short Bio' onDataChange={this.addData}/>
                      <ProfileRow key='10' fieldName='roles' indexValue={10} label='roles' textValue={this.props.artist_data['roles']} name='Roles' onDataChange={this.addData}/>
                      <ProfileRow key='12' fieldName='interests' indexValue={12} label='interests' textValue={this.props.artist_data['interests']} name='Interests' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='13' fieldName='inspirations' indexValue={13} label='inspirations' textValue={this.props.artist_data['inspirations']} name='Inspirations' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='6' fieldName='gender' indexValue={6} label='gender' name='Gender' textValue={this.props.artist_data['gender']} multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='3' fieldName='current_loc' indexValue={3} label='current_loc' textValue={this.props.artist_data['current_loc']} name='Current Location' multiline='false' onDataChange={this.addData}/>
                      {rows}
                      <Fab size='medium' className={classes.cardcontent} style={{boxShadow: 'none', marginTop:'1em', backgroundColor:"#fff"}}>
                        <AddCircleIcon style={{fontSize: 'large', color:'#02d1a8', width:'3em', height:'3em'}} onClick={this.addRow}/>
                      </Fab>
                      <Typography component="p" variant="body1" style={{textAlign: 'center', marginTop:'1em', color:'grey', marginBottom:'0'}}> Suggested categories: religion, sexual orientation, projects, favourite quote, favourite songs/book/films </Typography>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel key={1} className={classes.expand_group}>
                  <ExpansionPanelSummary
                    className={classes.expand_panel}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={classes.heading}>METADATA</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expand_children}>
                    <Grid container spacing={1} direction="row">
                      <ProfileRow key='9' style={{width:'100%'}} fieldName='skills' indexValue={9} label='skills' name='Skills' textValue={this.props.artist_data['skills']} multiline='true' onDataChange={this.addData}/>
                      <ProfileRow key='10' fieldName='roles' indexValue={10} label='roles' textValue={this.props.artist_data['roles']} name='Roles' onDataChange={this.addData}/>
                      <ProfileRow key='11' fieldName='projects' indexValue={11} label='projects' textValue={this.props.artist_data['projects']} name='Projects' multiline='true' onDataChange={this.addData}/>
                      <ProfileRow key='12' fieldName='interests' indexValue={12} label='interests' textValue={this.props.artist_data['interests']} name='Interests' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='13' fieldName='inspirations' indexValue={13} label='inspirations' textValue={this.props.artist_data['inspirations']} name='Inspirations' multiline='false' onDataChange={this.addData}/>
                  </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel key={2} className={classes.expand_group}>
                  <ExpansionPanelSummary
                    className={classes.expand_panel}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={classes.heading}>IDs and REPRESENTATIVES</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expand_children}>
                    <Grid container spacing={1} direction="row">
                    <ProfileRow key='14' style={{width:'100%'}} fieldName='isni' indexValue={14} label='isni' name='ISNI' textValue={this.props.artist_data['isni']} multiline='false' onDataChange={this.addData}/>
                    <ProfileRow key='15' fieldName='ipi' indexValue={15} label='ipi' textValue={this.props.artist_data['ipi']} name='IPI' onDataChange={this.addData}/>
                    <ProfileRow key='16' fieldName='ipn' indexValue={16} label='ipn' textValue={this.props.artist_data['ipn']} name='IPN' multiline='false' onDataChange={this.addData}/>
                    <ProfileRow key='17' fieldName='labels' indexValue={17} label='labels' textValue={this.props.artist_data['labels']} name='Labels' multiline='false' onDataChange={this.addData}/>
                    <ProfileRow key='18' fieldName='publishers' indexValue={18} label='publishers' textValue={this.props.artist_data['publishers']} name='Publishers' multiline='false' onDataChange={this.addData}/>
                    <ProfileRow key='19' fieldName='collection_societies' indexValue={19} label='collection_societies' textValue={this.props.artist_data['collection_societies']} name='Collection Societies' multiline='false' onDataChange={this.addData}/>
                    <ProfileRow key='20' fieldName='distributors' indexValue={20} label='distributors' textValue={this.props.artist_data['distributors']} name='Distributors' multiline='false' onDataChange={this.addData}/>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel key={3} className={classes.expand_group}>
                  <ExpansionPanelSummary
                    className={classes.expand_panel}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={classes.heading}>OFFICIAL LINKS</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expand_children}>
                    <Grid container spacing={1} direction="row">
                      <ProfileRow key='21' fieldName='facebook' indexValue={21} label='facebook' name='Facebook' textValue={this.props.artist_data['facebook']} multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='22' fieldName='twitter' indexValue={22} label='twitter' textValue={this.props.artist_data['twitter']} name='Twitter' onDataChange={this.addData}/>
                      <ProfileRow key='23' fieldName='merch' indexValue={23} label='merch' textValue={this.props.artist_data['merch']} name='Merch' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='24' fieldName='instagram' indexValue={24} label='instagram' textValue={this.props.artist_data['instagram']} name='i=Instagram' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='25' fieldName='apple' indexValue={25} label='apple' textValue={this.props.artist_data['apple']} name='Apple' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='26' fieldName='spotify' indexValue={26} label='spotify' textValue={this.props.artist_data['spotify']} name='Spotify' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='27' fieldName='youtube' indexValue={27} label='youtube' textValue={this.props.artist_data['youtube']} name='Youtube' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='28' fieldName='website' indexValue={28} label='website' textValue={this.props.artist_data['website']} name='Website' multiline='false' onDataChange={this.addData}/>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel key={4} className={classes.expand_group}>
                  <ExpansionPanelSummary
                    className={classes.expand_panel}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className={classes.heading}>TEAM / BOOKINGS / LICENSING</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expand_children}>
                    <Grid container spacing={1} direction="row">
                      <ProfileRow key='29' fieldName='contact_email' indexValue={29} label='contact_email' name='General contact email' textValue={this.props.artist_data['contact_email']} multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='30' fieldName='manager' indexValue={30} label='manager' textValue={this.props.artist_data['manager']} name='Manager' onDataChange={this.addData}/>
                      <ProfileRow key='31' fieldName='licensing' indexValue={31} label='licensing' textValue={this.props.artist_data['licensing']} name='Licensing representatives' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='32' fieldName='sync' indexValue={32} label='sync' textValue={this.props.artist_data['sync']} name='Sync' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='33' fieldName='legal' indexValue={33} label='legal' textValue={this.props.artist_data['legal']} name='Legal' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='34' fieldName='pr' indexValue={34} label='pr' textValue={this.props.artist_data['pr']} name='PR' multiline='false' onDataChange={this.addData}/>
                      <ProfileRow key='35' fieldName='agents' indexValue={35} label='agents' textValue={this.props.artist_data['agents']} name='AGENTS' multiline='false' onDataChange={this.addData}/>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                  
                  <ExpansionPanel key={5} className={classes.expand_group}>
                    <ExpansionPanelSummary
                      className={classes.expand_panel}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <Typography className={classes.heading}>OTHER</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expand_children}>
                      <Grid container spacing={1} direction="row">
                        <ProfileRow key='36' fieldName='awards' indexValue={36} label='awards' name='Grammy Awards' textValue={this.props.artist_data['awards']} multiline='true' onDataChange={this.addData}/>
                        <ProfileRow key='37' fieldName='performances' indexValue={37} label='performances' textValue={this.props.artist_data['performances']} name='Live Performances' onDataChange={this.addData}/>
                        <ProfileRow key='38' fieldName='public_appearances' indexValue={38} label='public_appearances' textValue={this.props.artist_data['public_appearances']} name='Public Appereances' onDataChange={this.addData}/>
                        <ProfileRow key='39' fieldName='commissions' indexValue={39} label='commissions' textValue={this.props.artist_data['commissions']} name='Commissioned Works' onDataChange={this.addData}/>
                        <ProfileRow key='40' fieldName='products' indexValue={40} label='products' textValue={this.props.artist_data['products']} name='Hardware / Software / Products' onDataChange={this.addData}/>
                        <ProfileRow key='41' fieldName='charities' indexValue={41} label='charities' textValue={this.props.artist_data['charities']} name='Charities Supported' onDataChange={this.addData}/>
                        <ProfileRow key='42' fieldName='sponsors' indexValue={42} label='sponsors' textValue={this.props.artist_data['sponsors']} name='Sponsors / Brands' onDataChange={this.addData}/>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      className={classes.expand_panel}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <Typography className={classes.heading}>EXTERNAL DATA</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expand_children}>
                    <div style={{maxWidth:640, width:'100%', height:'auto', overflow:'auto'}}>
                      <Iframe source={this.state.src} style={{width:'100%', border: 'none', height:'600px', position:'relative'}}/>
                    </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
              </Grid>
            </Grid>
          </Box>
      )
    }
}

MobileProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  profile_id: PropTypes.string,
  artist_name: PropTypes.string,
  artist_data: PropTypes.object
}

export default withStyles(styles)(MobileProfile)
  