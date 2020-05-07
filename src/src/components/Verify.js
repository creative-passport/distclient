import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


import logo from '../logo.png'

const styles = theme => ({
  root: {
    flexGrow: 1,
    '& .MuiTypography-root': {
      margin: 'auto',
      color: '#9e9e9e',
      alignItems:'center',
      alignSelf: 'center',
      textAlign: 'center'
    },
    '& .MuiTypography-h6': {
      marginTop: '2em',
    },
    '& .MuiTypography-body1': {
      margin: '1em',
    }
  },
  paper: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 345,
    height: '100%',
    textAlign: 'center',
  },
  paper2: {
    margin: theme.spacing(4)
  },
  title: {
    lineHeight: '20px',
    width: '40%',
    display:'inline-grid',
    marginLeft: '0.5em',
    verticalAlign: 'middle',
    fontSize: '14pt',
    fontStyle: 'SAN FRANCISCO TEXT BOLD',
    background: '-webkit-linear-gradient(180deg, #ff00b4, #82b4dc, #00ffcc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  yoti: {
    padding: theme.spacing(2),
  },
  skipButton: {
    backgroundColor: '#fff',
    color: '#02d1a8',
    margin: 'auto 2em'
  },
  helptext: {
    margin: 'auto',
    color: '#9e9e9e',
    alignSelf: 'center',
    textAlign: 'center',
    margin: 'auto 2em'
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
            "label": "Verify WITH YOTI"
          }
      }]
    })
  }
}

class Verify extends Component {

    constructor(props) {
      super(props);
      this.state = {}

      this.onSkip = this.onSkip.bind(this)
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
    }

    componentDidMount() {
      loadScript("https://www.yoti.com/share/client")
    }

    onSkip(event) {
      event.preventDefault()
      this.props.history.push('/')
      return <Redirect to="/" />
    }

    render() {
      const { classes } = this.props

      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container>
              <CssBaseline />
              <div style={{margin:'1.5em auto 1.5em auto'}}>
                <img src={logo} style={{verticalAlign: 'middle', marginBottom:'0.5em', marginLeft: '20%'}} className="App-logo" alt="logo" />
                <span className={classes.title}> THE CREATIVE PASSPORT</span>
              </div>
              <Paper className={classes.paper2}>
                <Typography align="center"  variant="h6"> Connect to Yoti </Typography>
                <div id="yoti" className={classes.yoti}></div>
                <Typography align="center"  variant="body1"> A verified account delivers the best opportunities </Typography>
              </Paper>
              <div style={{margin:'auto'}}>
                <Button className={classes.skipButton} onClick={this.onSkip}> Skip </Button>
              </div>
              <div style={{margin:'1em auto 3em auto'}}>
                <Typography className={classes.helptext} align="center"  variant="body1"> (You can complete this step later) </Typography>
              </div>
            </Grid>
          </Paper>
        </div>
      )
    }
}

Verify.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Verify))
  