import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'

import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import TextField from '@material-ui/core/TextField'
import CPSwitch from './CPSwitch'
import PublishMenu from './PublishMenu'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    '& .MuiInput-underline': {
      borderRadius: '25%'
    },
    '& .MuiInput-underline:before': {
      marginTop: '2em',
      borderRadius: '5em'
    },
    '& .MuiInputBase-input': {
      paddingTop: '1em'
    },
    '& .MuiFormLabel-root': {
      fontSize: '10pt',
      position: 'absolute',
      top: '-10pt'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'none',
      position: 'absolute',
      top: '5pt'
    },
    '& .MuiTypography-root': {
      margin: theme.spacing(2),
      color: '#9e9e9e',
      alignItems:'center',
      alignSelf: 'center',
      textAlign: 'center'
    }
  }
}))

function LongText(props) {
  const { ...other } = props
  const classes = useStyles();

  return (<form className={classes.root} noValidate autoComplete="on">
    <TextField
        id="outlined-multiline-flexible"
        label={props.label}
        fullWidth
        multiline
        rowsMax={4}
        value={props.value}
        onChange={props.onChange}
        variant="outlined"/>
    </form>
  )
}

export default LongText