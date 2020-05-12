import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

import ProfileRow from './ProfileRow'

import { representative_fields } from '../text_fields'


const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
    overflow: 'auto'
  },
  container_grid: {
    marginTop: theme.spacing(0.5),
  },
  formControl: {
    width: '100%',
  }
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}


class RepresentativesSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show_subfields: false,
      values: [],
      subfield: null,
      all_representatives: {},
      selected_values: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
  }

  static propTypes = {
    classes: PropTypes.object,
    key: PropTypes.number,
    label: PropTypes.string,
    data: PropTypes.object
  }

  componentDidMount() {
    this.setState({
      values: this.props.data['list_items'],
      subfield: this.props.name,
      all_representatives: representative_fields})

    Object.keys(representative_fields).map(key => {
      var selected_values = []
      if (key in this.props.artist_data) {
        this.setState({ show_subfields: true })
        selected_values.push(key)
        this.setState({selected_values: selected_values})
      }
    })
  }

  componentWillUnmount() {}

  handleChange = (event) => {
    this.setState({selected_values: event.target.value})

    if (event.target.value.length > 0){
      this.setState({show_subfields: true})
    }
  }

  onDataChange(data) {
    console.log(data)
    this.props.onDataChange(data)
  }

  render() {
    const { classes } = this.props
    const subfield = this.props.name

    let all_subfields
    if(this.state.show_subfields) {
      all_subfields = Object.keys(this.state.selected_values).map(i => {
        var component_key = this.state.selected_values[i]
        let res = null
        if (component_key in this.state.all_representatives) {
          res = <ProfileRow
            key={i} 
            indexValue={i}
            textValue={this.props.artist_data[component_key]}
            fieldName={component_key}
            label={this.state.all_representatives[component_key].label}
            name={component_key}
            onDataChange={this.onDataChange} 
            type="single_text_with_subcategories"
        /> }
        return res
      })
    }

    return (
      <Grid container>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">{this.props.label}</InputLabel>
          <Select
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
            MenuProps={MenuProps}>
            {this.state.values.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {all_subfields}
      </Grid>
    )
  }
}

export default withStyles(styles)(RepresentativesSection)
