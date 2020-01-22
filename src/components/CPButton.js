import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    border: 0,
    borderRadius: 5,
    boxShadow: 'none',
    color: 'white',
    height: 48,
    padding: '0 30px',
    backgroundColor: '#00ffcc'
  }
}

function CPButton(props) {
  const { classes, ...other } = props;
  return <Button className={classes.root} {...other} />
}

CPButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CPButton);
