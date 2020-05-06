import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

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
      age: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    key: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    classes: PropTypes.object
  }
  
  handleChange = (event) => {
    const name = event.target.name
    this.setState({name:event.target.value})
  }

  render() {
    const { classes } = this.props

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
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
      </Grid>
    )
  }
}

export default withStyles(styles)(UniqueList)