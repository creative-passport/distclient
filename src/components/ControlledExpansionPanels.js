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
import ImageLoading from './ImageLoading'

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
    boxShadow: 'none',
    borderRadius: 10,
  },
  public_switch: {
    float: 'right',
    width: 36,
    height: 16,
    marginLeft: '2em'
  },
  expand_panel: {
    border: 0,
    borderRadius: 10,
    color: 'white',
    boxShadow: 'none',
    height: 35,
    backgroundColor: '#02d1a8'
  },
  expand_children: {
    backgroundColor: '#02d1a8',
    padding: 0,
  }
}))

export const ControlledExpansionPanels = ({all_profiles}) => {
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
      singleProfile =   <ExpansionPanel key={i} className={classes.root} expanded={expanded === currentPanel} onChange={handleChange(currentPanel)}>
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
    else {
      singleProfile = 
        <ExpansionPanel key={i} className={classes.root} expanded={expanded === currentPanel} onChange={handleChange(currentPanel)}>
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
            <Profile key={i} profile_id={id} artist_name={artist_name} artist_data={artist_data}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    }

    return (singleProfile)
  })

  return (profiles)
}