import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '15ch',
    '& .MuiInputBase-root': {
      border: 'solid 0.5px',
      borderRadius: '25px',
      fontSize: '8pt',
      height: '23px'
    },
    '& .MuiInputBase-input:focus:hover': {
      outline: 0,
      border: 'none',
      paddingRight: '0.5em'
    },
    '& .MuiFormControl-root': {
      marginTop: 0
    },
    '& .MuiFormLabel-root': {
      transition: 'none'
    },
    '& .MuiInput-underline:before': {
      border: 'none',
      fontSize: '8pt',
      paddingRight: '0.5em'
    },
    '& .MuiInputBase-input:before:input': {
      paddingLeft: '0.5em',
      paddingRight: '0.5em'
    },
    '& .MuiInput-underline:hover': {
      textDecoration: 'none'
    },
    '& .MuiInput-formControl': {
      marginTop: 0,
      paddingLeft: '0.6em',
      transform: 'none',
      position: 'relative'
    },
    '& .MuiInputLabel-formControl':{
      transform: 'none',
      position: 'absolute',
      top: 0,
    },
    '& .MuiIconButton-root': {
      paddingRight: 0
    },
    '& .MuiInput-formControl:before': {
      fontSize: '8pt',
      paddingLeft: '0.5em',
      height: '22px',
    }
  }
}))

export function TextFieldWithAddButton() {
  const classes = useStyles()


  const addToChips = (name) => () => {
    addToChips()
  }

  const handleChange = (name) => () => {
    console.log(name)
  }

  let newValue=''

  return (
    <FormControl className={classNames(classes.textField)}>
      <Input
        id="adornment-add"
        defaultValue="Add New"
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Add new value"
              onClick={addToChips}
            >
            <AddCircleIcon/>
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}