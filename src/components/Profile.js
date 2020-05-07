import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { loadCSS } from 'fg-loadcss'
import { withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ImageLoading from './ImageLoading'
import ProfileRow from './ProfileRow'
import { Auth } from 'aws-amplify'

import * as api from '../scripts'
import Iframe from './iframe.js'
import {text_fields} from '../text_fields'


const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 100,
    margin: 0,
    '& .MuiExpansionPanel-root': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
    }
  },
  iconHover: {
    margin: theme.spacing(1),
    '&:hover': {
      color: red[800],
    },
  },
  inactive_tab: {
    backgroundColor: '#009678',
    color: '#c9c9c9',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginRight: '0.5em',
    padding: theme.spacing(1)
  },
  tab_content: {
    backgroundColor: '#ffffff',
  },
  active_tab: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginRight: '0.5em',
    padding: theme.spacing(1)
  }
})

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          error: '',
          main_category_labels: [],
          currentData: {},
          jwtToken: '',
          walletId: '',
          src: '',
          artist_name: this.props.artist_name
      }
      this.addData = this.addData.bind(this)
      this.addRow = this.addRow.bind(this)
      this.saveProfile = this.saveProfile.bind(this)
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
      // console.log(user.username)
      // if(user.username === 'imogenheap') {
      //   stlUsername = 'imogen%20heap'
      // }
      // else {
      //   stlUsername = user.username.replace('_','%20')
      // }
      // this.setState({src: streemlinerRoot + stlUsername})
      this.setState({currentData: this.props.artist_data})
      this.getDataFields()
    }

    getDataFields(){
      let main_category_labels = []

      Object.keys(text_fields).map(item => {
        main_category_labels.push(text_fields[item].label)
        var detailed_fields = text_fields[item].data_fields
      })

      this.setState({main_category_labels: main_category_labels})
    }

    addData(event) {
      console.log(event)
      var currentData = this.state.currentData
      var fieldName = event['fieldName']

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

    saveProfile(){
      var results = api.updateProfileData(this.state.walletId, this.state.currentData, this.state.jwtToken)
    }

    render() {
      const { classes } = this.props
   
      //         <div style={{width:'100%', height:'auto', overflow:'auto'}}>
      //           <Iframe source={this.state.src} style={{width:'100%', border: 'none', height:'600px', position:'relative'}}/>
      //         </div>

      const main_categories = Object.keys(text_fields).map((row, index) => {
        const panelId="profile-main-section"+{index}+"-header"
        var detailed_fields = text_fields[row].data_fields

        let subfields
        let actualKey = 0
        if (Object.keys(detailed_fields).length > 0) {
          subfields = Object.keys(detailed_fields).map(subfield => {
            if (detailed_fields[subfield]['type'] === 'typing_bubble') {
              let currentKey = actualKey
              actualKey ++
              return <ProfileRow
                key={currentKey} indexValue={currentKey}
                textValue={this.props.artist_data[subfield]}
                fieldName={subfield}
                label={detailed_fields[subfield].label}
                name={detailed_fields[subfield].name}
                onDataChange={this.addData} 
                type='typing_bubble'/>
            }
            else if (detailed_fields[subfield]['type'] == 'multiple_bubble_list') {
              let field = detailed_fields[subfield]
              let currentKey = actualKey
              actualKey ++
              return (<ProfileRow
                key={currentKey}
                indexValue={currentKey}
                textValue={this.props.artist_data[subfield]} 
                fieldName={subfield} required={false}
                label={field.label}
                name={field.name}
                onDataChange={this.addData}
                type='multiple_bubble_list'/>)
            }
            else if (detailed_fields[subfield]['type'] == 'long_text') {
              let field = detailed_fields[subfield]
              let currentKey = actualKey
              actualKey ++
              return (<ProfileRow 
                key={currentKey}
                indexValue={currentKey}
                textValue={this.props.artist_data[subfield]}
                fieldName={subfield}
                required={false}
                label={field.label}
                name={field.name}
                onDataChange={this.addData}
                longText={true}
                type='long_text'/>)
            }
            else if (detailed_fields[subfield]['type'] == 'single_text') {
              let field = detailed_fields[subfield]
              let currentKey = actualKey
              actualKey ++
              return <ProfileRow 
                key={currentKey}
                indexValue={currentKey}
                textValue={this.props.artist_data[subfield]}
                fieldName={subfield}
                required={false}
                label={field.label}
                name={field.name}
                onDataChange={this.addData}
                longText={false}
                type='single_text'/>
            }
            else if (detailed_fields[subfield]['type'] == 'unique_list') {
              let field = detailed_fields[subfield]
              let currentKey = actualKey
              actualKey ++
              return <ProfileRow
                key={currentKey}
                textValue={this.props.artist_data[subfield]}
                indexValue={currentKey}
                fieldName={subfield}
                label={field.label}
                name={field.name}
                onDataChange={this.addData}
                type='unique_list'/>
            }
          })
        }

        return (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary className={classes.expand_panel} expandIcon={<ExpandMoreIcon />} id={panelId}>
              <Typography className={classes.heading}>{text_fields[row].label}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expand_children}>
              <Grid container direction="row" justify="center" alignItems="center">{subfields}</Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })

      return (
        <Box className={classes.root} display="flex" flexWrap="wrap"> 
          <Grid container direction="row" justify="center" alignItems="center" style={{marginRight: '2em'}}>
            <ImageLoading artist_id={this.props.profile_id} artist_name={this.props.artist_name}/>
          </Grid>
          {main_categories}
        </Box>
      )
    }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile_id: PropTypes.string,
  artist_name: PropTypes.string,
  artist_data: PropTypes.object
}

export default withStyles(styles)(Profile)
  