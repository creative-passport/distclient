import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from '@material-ui/core/Switch'
import Layout from './Layout'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

class Settings extends Component {

    constructor(props) {
      super(props);
      this.state = {
          loggedIn: false,
          fullName: '',
          email: '',
          error: ''
      }
      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleChange(event) {
    }

    render() {
      const { classes } = this.props

      const NameItem = <Grid item xs={10} className={classes.paper}><Paper className={classes.paper}>Account Information</Paper></Grid>
      const SwitchItem = <Grid item xs={2} className={classes.paper2}>
        <Paper className={classes.paper}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checkedB}
                  onChange={this.handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                />
            } label="Make Public"
          />
          </FormGroup>
        </Paper>
      </Grid>

      const row = <Grid container>
          {NameItem}
          {SwitchItem}
        </Grid>

      return (
        <Layout>
          <div className={classes.root}>
            {row}
          </div>
        </Layout>
      )
    }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Settings)
  