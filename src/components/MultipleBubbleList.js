import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'

import { avs } from '../text_fields'

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: 'white'
    },
  },
};

const styles = theme => ({
  grid: {
    zIndex: 1000
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    '& .MuiSelect-root': {
      whiteSpace: 'pre-wrap'
    }
  },
  selectMenu: {
    zIndex: 100,
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    minWidth: 250,
    '& .Mui-selected': {
      backgroundColor: '#d9fffc'
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chip: {
    border: 'solid 0.5px',
    borderColor: 'black',
    backgroundColor: 'white',
    marginRight: theme.spacing(0.3),
    marginBottom: theme.spacing(0.2),
    height: '22px',
    fontSize: '8pt',
    '& .MuiChip-root': {
      height: '28px'
    },
    '& .MuiChip-label': {
      textTransform: 'capitalize'
    }
  }
})

class MultipleBubbleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: [],
      selected_values: [],
      all_values: [],
      value: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.getOptions = this.getOptions.bind(this)
  }

  static propTypes = {
    key: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    classes: PropTypes.object
  }

  componentDidMount() {
    if (this.props.value !== null && this.props.value !== '') {
      this.setState({selected_values: this.props.value})
    }
    else if (this.props.textValue !== undefined && 'value' in this.props.textValue){
      this.setState({selected_values: this.props.textValue.value})
    }
    this.getOptions()
  }
  
  handleChange = (event) => {
    this.setState({selected_values: event.target.value})

    var data = {
      'type': 'multiple_bubble_list',
      'fieldName': this.props.fieldName,
      'value': event.target.value,
      'indexValue': this.props.indexValue
    }

    this.props.onDataChange(data)
  }

  getOptions() {
    if (this.props.fieldName in avs) {
      const key = this.props.fieldName
      this.setState({values: avs[key].values, name: avs[key].name, all_values: avs[key].values })
    }
  }

  render() {
    const { classes } = this.props

    let result = null
    if (this.props.value != null) {
      result = <Grid container name={this.props.fieldName}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">{this.props.label}</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            name={this.state.name}
            value={this.state.selected_values}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue = {(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.state.values.map((name) => (
              <MenuItem className={classes.selectMenu} key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    }

    return (
    <div className={classes.grid}>
      { result }
    </div>
    )
  }
}

export default withStyles(styles)(MultipleBubbleList)