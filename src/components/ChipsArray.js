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
    paddingTop: theme.spacing(0.1),
    paddingBottom: theme.spacing(0.1),
    fontSize: '8pt',
    '& .MuiChip-root': {
      height: '28px'
    },
    '& .MuiChip-deleteIcon': {
      color: 'red',
      margin: theme.spacing(0)
    }    
  },
  container_grid: {
    marginTop: theme.spacing(2),
  },
  text_field_add_chip: {
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
})

class ChipsArray extends Component {

  static propTypes = {
    key: PropTypes.number,
    label: PropTypes.string,
    helper_text: PropTypes.string,
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      published: false,
      publishers: {'Public Profile': false},
      fieldName: '',
      chipData : [],
      newChipText: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.addToChips = this.addToChips.bind(this)
  }

  componentDidMount() {
    this.setState({chipData: [{ key: 0, label: 'example', value: 'example' }]})
  }

  handleChange = (e) => {
    this.setState({newChipText: e.target.value})
  }

  handleDelete = name => event => {
    var newChips = this.state.chipData.filter((chip) => chip.key !== name)
    this.setState({chipData: newChips})
  }

  addToChips = () => {
    var oldChips = this.state.chipData
    console.log(oldChips)

    oldChips.push({key: oldChips.length, label: this.state.newChipText, name: this.state.newChipText})
    this.setState({chipData: oldChips})
  }

  render() {
    const { classes } = this.props

    const SwitchItem = <CPSwitch name='publish_switch' checked={this.state.published} onChange={this.handleChange} ></CPSwitch>

    const currentChips = this.state.chipData.map((data, index) => {
      return (
        <Chip
          key={data.key}
          label={data.label}
          onDelete={this.handleDelete(data.key)}
          className={classes.chip}
        />
      )
    })
    
    return (
      <Grid container direction="row" justify="center" alignItems="center" className={classes.container_grid}>
        <Grid item xs={12}>
          <Typography>{this.props.label}</Typography>
        </Grid>
        <Grid container direction="row" justify="flex-start">
          {currentChips}
          <FormControl className={classes.text_field_add_chip}>
            <Input
              id="adornment-add"
              defaultValue="Add New"
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
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
      </Grid>
    )
  }
}

export default withStyles(styles)(ChipsArray)

