import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
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
  yoti: {
    padding: theme.spacing(4),
    paddingLeft: '30%'
  }
});


var loadScript = function(src) {
  var tag = document.createElement('script')
  tag.async = false
  tag.src = src
  document.getElementsByTagName('body')[0].appendChild(tag)

  tag.onload = function(){
    window.Yoti.Share.init({
      "elements": [{
          "domId": "yoti",
          "scenarioId": "5c9a9ab2-0a3e-40f2-b3d5-7e14de8f2a77", //"a0d94d28-3b32-4f0d-8bfa-45841b2c7b34",
          "clientSdkId": "184866a3-a2d9-493a-9502-6af64ba04a80", //"f8378961-dd6d-4fef-aad0-cfe4490b3dc3",
          "button": {
            "label": "Prove identity WITH US YOTI"
          }
      }]
    })
  }
}

class Verify extends Component {

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
      loadScript("https://www.yoti.com/share/client")
    }

    componentWillUnmount() {
    }

    handleChange(event) {
    }

    render() {
      const { classes } = this.props

      return (
        <Layout>
           <Paper className={classes.paper}>Connect to Yoti
          <div id="yoti" className={classes.yoti}></div>
          </Paper>
        </Layout>
      )
    }
}

Verify.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Verify)
  