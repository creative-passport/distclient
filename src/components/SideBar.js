import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import TextField from '@material-ui/core/TextField'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import * as api from '../scripts'
import { Auth } from 'aws-amplify'
import './App.css'

import ProfileImage from './ProfileImage'

const drawerWidth = 310;

const styles = theme => ({
  drawer: {
    position: 'relative',
    background: 'none',
    border: 'none',
    width: drawerWidth,
    flexShrink: 0,
    margin: '0 auto',
    '& .MuiDrawer-paper': {
      position: 'relative'
    }
  },
  realName: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  dob:{
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  cardcontent: {
    padding: theme.spacing(3),
    alignItems: 'center',
    justifyContent: "center",
    '& .MuiTextField-root': {
      marginTop: theme.spacing(3),
      width: '32ch',
    },
    '& .MuiInputBase-input': {
      paddingTop: '1em',
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1)
    },
    '& .MuiInputLabel-shrink': {
      transform: 'none',
      position: 'absolute',
      top: '5pt'
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none'
    },
    '& .MuiInput-underline:before': {
      marginTop: '2em',
      borderRadius: '5em',
      transition: 'none'
    },
    '& .MuiFormLabel-root': {
      fontSize: '10pt',
      position: 'absolute',
      top: '-10pt'
    },
    '& .MuiTypography-root': {
      margin: theme.spacing(2),
      color: '#9e9e9e',
      alignItems:'center',
      alignSelf: 'center',
      textAlign: 'center'
    }
  },
  card: {
    maxWidth: 345,
    root: { padding: 0},
    borderRadius: '20px',
    boxShadow: 'none',
    marginBottom: '1em'
  },
  cardHeaderStyle: {
      background:'-webkit-linear-gradient(180deg, #ff00b4, #82b4dc, #00ffcc)',
      height: '80px',
  },
  essentialFields: {
    paddingBottom: '15%'
  },
  secondCardHeaderStyle: {
    backgroundColor: '#cccccc',
    color: '#000',
    margin: '0 auto',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '14pt',
    fontWeight: '500'
  },
  saveDataButton: {
    float:'right',
    margin: '10px',
    boxShadow: 'none'
  },
  profileImage: {
    width: '5em',
    height: '5em',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    margin: '-5em auto 0 auto'
  }
});


class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      mobile: '',
      realName: ' ',
      date_of_birth: '',
      profile_data: '',
      walletId: '',
      jwtToken: ''
    }
    this.changeMobile = this.changeMobile.bind(this)
    this.saveData = this.saveData.bind(this)
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(
      user => {
        this.setState({walletId: user.attributes.sub})
        this.setState({email: user.attributes.email})
        this.setState({jwtToken: user.signInUserSession.idToken.jwtToken})

        api.getProfileData(user.attributes.sub).then(res => {

          if('dob' in res.data.PassportData) {
            this.setState({'date_of_birth': res.data.PassportData.dob})
          }
          if('real_name' in res.data.PassportData) {
            this.setState({'realName': res.data.PassportData.real_name})
          }

          if('mobile' in res.data.PassportData) {
            this.setState({'mobile': res.data.PassportData.mobile})
          }

          this.setState({'profile_data': res.data.PassportData})

        }).catch(function (error) {
            console.log(error)
        })

      }
    ).catch(
      error => {
        console.log("NO AUTH USER " + error)
      }
    )
  }

  changeMobile(e) {
    this.setState({mobile: e.target.value})
  }

  saveData(){
    var data = this.state.profile_data
    data['mobile'] = this.state.mobile

    api.updateProfileData(this.state.walletId, data, this.state.jwtToken)
  }

  render() {
    const { classes } = this.props
    var realName = this.state.realName.toUpperCase()
    const mobile = this.state.mobile
    const email = this.state.email

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
      >
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeaderStyle}/>
        <ProfileImage className={classes.profileImage} walletId={this.state.walletId}/>
        <CardContent className={classes.cardcontent}>
          <Typography component="h6" variant="h6">Real Name</Typography>
          <Typography component="h6" variant="h6">{this.state.real_name}</Typography>
          <Typography component="h6" variant="h6">Date of Birth</Typography>
          <Typography component="h6" variant="h6">{this.state.date_of_birth}</Typography>
          <TextField label="Email" value={email} />
          <TextField label="Mobile" value={mobile} />
          <Typography component="p" variant="body1" style={{textAlign: 'center', marginTop:'2em', color:'grey', marginBottom:'1em'}}> This information is not made public </Typography>
        </CardContent>
      </Card>
    </Drawer>
  )}  
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideBar)