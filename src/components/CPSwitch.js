import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

import { withStyles } from '@material-ui/core/styles'

const AntSwitch = withStyles(theme => ({
  root: {
    width: 36,
    height: 16,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    width: 36,
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  }
}))(Switch)

function CPSwitch(props) {
  const { classes, ...other } = props

  return <FormGroup row>
    <FormControlLabel
      control={
        <AntSwitch
          name='publish_switch'
          {...other}
        />} {...other}/>
    </FormGroup>
}

CPSwitch.propTypes = {
  classes: PropTypes.object.isRequired
}

export default CPSwitch
