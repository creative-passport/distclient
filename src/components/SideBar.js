import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import sample from '../images/sample.jpg'
import store from '../reducers/store'
import * as api from '../scripts'
import {getUserAttributes} from 'react-cognito/src/attributes.js'


const styles = theme => ({
  drawer: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0),
    position: 'relative',
    background: 'none',
    border: 'none'
  },
  realName: {
    textAlign: 'center',
    padding: theme.spacing(3)
  },
  dob:{
    textAlign: 'center',
    padding: theme.spacing(3)
  },
  cardcontent: {
    padding: theme.spacing(3),
  },
  card: {
    maxWidth: 345,
    root: { padding: 0},
    borderRadius: '5%'
  },
  cardHeaderStyle: {
      background:'-webkit-linear-gradient(180deg, #ff00b4, #82b4dc, #00ffcc)',
      height: '80px',
  },
  essentialFields: {
    paddingBottom: '15%'
  },
  imageCropper: {
    width: '5em',
    height: '5em',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    margin: '-18% auto auto'
  },
  secondCardHeaderStyle: {
    backgroundColor: '#cccccc',
    color: '#000',
    margin: '0 auto',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '14pt',
    fontWeight: '500'
  }
});


class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      realName: ' ',
      date_of_birth: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {

    var cog = store.getState().cognito

    if (cog.user !== undefined) {
      cog.user.getSession((err, session) => {
        if (err) {
          console.log(err)
        } else {
          this.setState({jwtToken: session.getIdToken().getJwtToken()})
        }
      })

      cog.user.getSession((err, session) => {
        if (err) {
          console.log(err)
        } else {
          this.setState({userEmail: session.getIdToken().payload.email})
        }
      })
    }

    getUserAttributes(cog.user).then(res => {
      api.getProfileData(res.sub).then(res => {
        if('dob' in res.data.PassportData) {
          this.setState({'date_of_birth': res.data.PassportData.dob})
        }
        if('real_name' in res.data.PassportData) {
          this.setState({'realName': res.data.PassportData.real_name})
        }
      }).catch(function (error) {
          console.log(error)
      })

    }).catch(function (error) {
      console.log(error)
    })
  }

  handleChange(){
    console.log("handle change in SideBar")
  }


  render() {
    const { classes } = this.props
    const state = store.getState();
    const user = state.cognito.user
    var user_real_name = this.state.realName.toUpperCase()

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawer,
        }}
      >
      <CssBaseline />
      <Card className={classes.card} style={{marginBottom: '1em'}}>
        <CardHeader className={classes.cardHeaderStyle}/>
        <Avatar alt="Remy Sharp" className={classes.imageCropper} src={sample} />
        <CardContent className={classes.cardcontent}>
          <Typography component="h5" variant="h5" className={classes.realName}>{user_real_name}</Typography>
          <Typography component="h6" variant="h6" className={classes.dob}>Date of Birth</Typography>
          <Typography component="h5" variant="h5" className={classes.dob}>{this.state.date_of_birth}</Typography>
        </CardContent>
        <Divider/>
      </Card>
      <Card className={classes.card}>
        <CardHeader title='CONTACT' className={classes.secondCardHeaderStyle}>
          <Typography gutterBottom variant="h5" component="h2">
          </Typography>            
        </CardHeader>
        <CardContent className={classes.cardcontent}>
            <TextField fullWidth id="standard-basic" label="Email" value={this.state.userEmail}/>
            <TextField fullWidth id="standard-basic" label="Mobile" defaultValue="(99) 99999999999" />
        </CardContent>
        <Divider/>
      </Card>
    </Drawer>
  )}  
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideBar)