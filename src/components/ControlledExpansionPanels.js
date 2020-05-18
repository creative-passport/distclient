import React from 'react'
import { isMobile } from 'react-device-detect'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Profile from './Profile'
import { Switch } from 'antd'

import 'antd/dist/antd.css'
import './App.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    boxShadow: 'none',
    borderRadius: 10,
    '& .MuiPaper-root & .MuiPaper-root:before': {
      borderRadius: 10,
    }, 
    '& .MuiExpansionPanel-rounded': {
      borderRadius: 10,
    },
    '& .MuiExpansionPanelDetails-root': {
      borderRadius: 10,
    },
    '& .MuiExpansionPanel-root:before': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }
  },
  heading: {
    flexGrow: 1
  },
  public_switch: {
    margin: '0 0 0 auto',
    width: 36,
    height: 16,
  },
  expand_panel: {
    display: 'flex',
    border: 0,
    borderRadius: 10,
    color: 'white',
    boxShadow: 'none',
    height: 35,
    backgroundColor: '#02d1a8',
    '& .MuiPaper-root:before': {
      borderRadius: 10,
      backgroundColor: 'transparent'
    }, 
    '& .MuiExpansionPanel-rounded:before': {
      borderRadius: 10,
    },
    '& .MuiExpansionPanelDetails-root': {
      borderRadius: 10,
    },
    '& .MuiTypography-root': {
      fontWeight: 'bold',
      fontSize: '12pt'
    }
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
          <Typography className={classes.heading} flexGrow={1}>{artist_name}</Typography>
          <FormControlLabel
            aria-label="Acknowledge"
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