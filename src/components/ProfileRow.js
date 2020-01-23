import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CPSwitch from './CPSwitch'

import PublishMenu from './PublishMenu'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    verticalAlight: 'middle',
    marginTop: '16px',
    margin: theme.spacing(2),
    color: theme.palette.text.secondary,
  }
});


class ProfileRow extends Component {

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
      publishers: {'my_public_profile': false},
      fieldName: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if ('textValue' in this.props){
      if (this.props.textValue != undefined && 'value' in this.props.textValue){
        this.setState({value: this.props.textValue.value})
        this.setState({published: this.props.textValue.published})
        this.setState({publishers: this.props.textValue.publishers})
      }
    }
    
  }

  componentWillUnmount() {
    console.log(this.props.name)
  }


  handleChange = (e) => {
      var data = {
        'fieldName': this.props.fieldName,
        'value': this.state.value,
        'published': this.state.published,
        'publishers': this.state.publishers,
        'indexValue': this.props.indexValue
      }
      if (e.hasOwnProperty('target')) {
        if (e.target.name === 'publish_switch') {
          this.setState({published: e.target.checked})
          data['published'] = e.target.checked
        }
        else {
          this.setState({value: e.target.value})
          data['value'] = e.target.value
        }
      } else {
        this.setState({publishers: e})
        data['publishers'] = e
      }

      this.props.onDataChange(data)
  }

  render() {
    const inputProps = {
      step: 300,
    }

    const { classes } = this.props

    const SwitchItem = <CPSwitch 
        name='publish_switch'
        ref={(ref) => this.switch = ref}
        checked={this.state.published}
        onChange={this.handleChange}>
    </CPSwitch>

    const ValueItem = (this.props.required) ? <Grid item xs={8}> <TextField
      ref={(ref) => this.text = ref}
      required
      fullWidth
      id="standard-basic"
      label={this.props.name}
      name={this.props.name}
      onChange={this.handleChange}
      margin="normal"
      helperText={this.props.helper_text}
      inputProps={inputProps}
      value={this.state.value}
    /> </Grid> : <Grid item xs={8}> <TextField
      ref={(ref) => this.text = ref}
      fullWidth
      multiline
      id="standard-basic"
      label={this.props.name}
      name={this.props.name}
      rowsMax="10"
      onChange={this.handleChange}
      margin="normal"
      helperText={this.props.helper_text}
      inputProps={inputProps}
      value={this.state.value}
    />
    </Grid>

    return (
      <Grid container name={this.props.fieldName} value={this.props.indexValue}>
        {ValueItem}
        {SwitchItem}
        <PublishMenu onCheckedChange={this.handleChange} publishers={this.state.publishers}/>
      </Grid>
    )
  }
}

export default withStyles(styles)(ProfileRow)
