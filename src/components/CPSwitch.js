import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    borderRadius: 3,
    marginLeft: '15px',
    verticalAlign: 'middle'
  }
}

function CPSwitch(props) {
  const { classes, ...other } = props

  // ref={(ref) => this.switch = ref}


  return <FormGroup row>
    <FormControlLabel
      control={
        <Switch
          className={classes.root}
          // name='publish_switch'
          // checked={this.state.checked}
          // onChange={this.handleChange}
          // color="primary"
          {...other}
        />} {...other}/>
    </FormGroup>
}

CPSwitch.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CPSwitch)
