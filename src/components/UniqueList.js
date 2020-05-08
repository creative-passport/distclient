import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import { avs } from '../text_fields'

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})

class UniqueList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: [],
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
    this.getOptions()
  }
  
  handleChange = (event) => {
    const name = event.target.name
    this.setState({name:event.target.value})

    var data = {
      'fieldName': this.props.fieldName,
      'value': name,
      'indexValue': this.props.indexValue
    }
    this.props.onDataChange(data)
  }

  getOptions() {
    console.log(this.props.fieldName)

    if (this.props.fieldName in avs) {
      const key = this.props.fieldName
      this.setState({values: avs[key].values})
    }
  }

  render() {
    const { classes } = this.props

    const options = this.state.values.map((val, i) => <option value={i}>{val}</option>)

    return (
      <Grid container name={this.props.fieldName}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">{this.props.label}</InputLabel>
          <Select
            native
            value={this.state.name}
            onChange={this.handleChange}
          >
            <option aria-label="None" value="" />
            {options}
          </Select>
        </FormControl>
      </Grid>
    )
  }
}

export default withStyles(styles)(UniqueList)