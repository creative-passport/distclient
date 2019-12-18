import React, { Component } from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

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
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});


class ProfileRow extends Component {

  static propTypes = {
    // required: PropTypes.bool.isRequired,
    label: PropTypes.string,
    helper_text: PropTypes.string,
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      published: false,
      publishers: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    console.log(this.props.name)
  }


  handleChange = (e) => {
      var data = {'value':this.state.value, 'published': this.state.published, 'publishers': this.state.publishers}

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

    const ValueItem = (this.props.required) ? <Grid item xs={8}> <TextField
      ref={(ref) => this.text = ref}
      required
      fullWidth
      id="outlined-bio"
      label={this.props.name}
      name={this.props.name}
      multiline
      rowsMax="3"
      className={clsx(classes.textField, classes.dense)}
      onChange={this.handleChange}
      margin="normal"
      variant="outlined"
      helperText={this.props.helper_text}
      inputProps={inputProps}

    /> </Grid> : <Grid item xs={8}> <TextField
      ref={(ref) => this.text = ref}
      fullWidth
      id="outlined-bio"
      label={this.props.name}
      name={this.props.name}
      multiline
      rowsMax="10"
      className={clsx(classes.textField, classes.dense)}
      onChange={this.handleChange}
      margin="normal"
      variant="outlined"
      helperText={this.props.helper_text}
      inputProps={inputProps}
    /></Grid>;

    const SwitchItem = <Grid item xs={2}>
      <Paper className={clsx(classes.paper, classes.dense)}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                name='publish_switch'
                ref={(ref) => this.switch = ref}
                checked={this.state.checked}
                onChange={this.handleChange}
                color="primary"
              />
          } label="Public"
        />
        </FormGroup>
      </Paper>
    </Grid>

    const pMenu = <PublishMenu onCheckedChange={this.handleChange} />;

    return (
      <Grid container>
        {ValueItem}
        {SwitchItem}
        {pMenu}
      </Grid>
    )
  }
}

export default withStyles(styles)(ProfileRow)
