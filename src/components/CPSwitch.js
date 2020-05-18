import React from 'react'
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Switch } from 'antd'
import { makeStyles } from '@material-ui/core/styles'
import './App.css'


const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 0.5em -1.5em 1em'
  },
  public_switch: {
    width: 36,
    height: 14,
    marginLeft: '1.5em',
    border: 'none'
  }
}))

function CPSwitch(props) {
  const { ...other } = props
  const classes = useStyles()

  return <FormGroup row className={classes.root}>
    <FormControlLabel
      control = {
        <Switch size="small" name='publish_switch' className={classes.public_switch} {...other}/>          
      }/>
    </FormGroup>
}

export default CPSwitch
