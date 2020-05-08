import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { TextFieldWithAddButton } from './TextFieldWithAddButton'
import CPSwitch from './CPSwitch'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    border: 'solid 0.5px',
    borderColor: 'black',
    backgroundColor: 'white',
    marginRight: theme.spacing(0.5),
    height: '22px',
    // paddingTop: theme.spacing(0.1),
    // paddingBottom: theme.spacing(0.1),
    fontSize: '8pt',
    '& .MuiChip-root': {
      height: '28px'
    },
    '& .MuiChip-deleteIcon': {
      color: 'red',
      margin: theme.spacing(0)
    },
    '& .MuiChip-label': {
      margin: theme.spacing(0.1)
    }
  },
  container_grid: {
    marginTop: theme.spacing(2),
  },
  text_field_add_chip: {
    '& .MuiInputBase-root': {
      border: 'solid 0.5px',
      borderRadius: '25px',
      fontSize: '8pt',
      height: '22px'
    },
    '& .MuiInputBase-input:focus:hover': {
      outline: 0,
      border: 'none'
    },
    '& .MuiFormControl-root': {
      marginTop: 0,
      marginBottom: 0
    },
    '& .MuiFormLabel-root': {
      transition: 'none'
    },
    '& .MuiInput-underline:before': {
      border: 'none',
      fontSize: '8pt',
    },
    '& .MuiInput-formControl': {
      marginTop: 0,
      transform: 'none',
      position: 'relative',
      paddingLeft: theme.spacing(1)
    },
    '& .MuiInput-formControl:before': {
      fontSize: '8pt',
      height: '22px',
    },
    '& .MuiInputBase-formControl:before:input': {
      paddingRight: theme.spacing(1)
    },
    '& .MuiInput-underline:hover': {
      textDecoration: 'none'
    },
    '& .MuiInputLabel-formControl':{
      transform: 'none',
      position: 'absolute',
      top: 0,
    },
    '& .MuiIconButton-root': {
      color: '#02d1a8'
    },
    '& .MuiSvgIcon-root': {
      width: '22px',
      padding: 0
    },
    '& .MuiIconButton-edgeEnd': {
      marginRight: '-13px'
    }
  }
})

// MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedEnd

class ChipsWithSubFields extends Component {

  static propTypes = {
    key: PropTypes.number,
    label: PropTypes.string,
    helper_text: PropTypes.string,
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      fieldName: '',
      chipData : [],
      newChipText: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.addToChips = this.addToChips.bind(this)
  }

  componentDidMount() {
    if (this.props.value !== null && this.props.value !== '') {
      this.setState({chipData: this.props.value})
    }
    else if (this.props.textValue !== undefined && 'value' in this.props.textValue){
      this.setState({chipData: this.props.textValue.value})
    }
  }

  handleChange = (e) => {
    this.setState({newChipText: e.target.value})
  }

  handleDelete = name => event => {
    var newChips = this.state.chipData.filter((chip) => chip.key !== name)
    this.setState({chipData: newChips})

    var data = {
      'type': 'typing_bubble',
      'fieldName': this.props.fieldName,
      'value': newChips,
    }
    this.props.onDataChange(data)
  }

  addToChips = () => {
    var oldChips = this.state.chipData

    oldChips.push({key: oldChips.length, label: this.state.newChipText, name: this.state.newChipText})
    this.setState({chipData: oldChips})

    var data = {
      'type': 'typing_bubble',
      'fieldName': this.props.fieldName,
      'value': oldChips
    }
    this.props.onDataChange(data)
  }

  render() {
    const { classes } = this.props

    const currentChips = this.state.chipData.map((data, index) => {
      return (
        <Chip
          key={data.key}
          label={data.label}
          onDelete={this.handleDelete(data.key)}
          className={classes.chip}
        />
        <TextField fullWidth label="Contact" value={data.contact_name} />
        <TextField fullWidth label="Email" value={data.contact_email} />
        <TextField fullWidth label="Note" value={data.contact_note} />
      )
    })

    const result = <Grid container direction="row" justify="flex-start">
      {currentChips}
      <FormControl className={classes.text_field_add_chip}>
        <Input
          id="adornment-add"
          defaultValue="Add New"
          onChange={this.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disableRipple={true}
                edge='end'
                aria-label="Add new value"
                onClick={this.addToChips}
              >
              <AddCircleIcon/>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
    
    return (<div> { result } </div>)
  }
}

export default withStyles(styles)(ChipsWithSubFields)

