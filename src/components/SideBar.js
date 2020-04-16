import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/Save'
import CropFreeOutlinedIcon from '@material-ui/icons/CropFreeOutlined'

import * as api from '../scripts'
import { Auth } from 'aws-amplify'

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
    padding: theme.spacing(1)
  },
  dob:{
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  cardcontent: {
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: "center"
  },
  card: {
    maxWidth: 345,
    root: { padding: 0},
    borderRadius: '5%',
    marginBottom: '1em'
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
  },
  saveDataButton: {
    float:'right',
    margin: '10px',
    boxShadow: 'none'
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
      jwtToken: '',
      imageSrc: ''
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
        classes={{
          paper: classes.drawer,
        }}
      >
      <CssBaseline />
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeaderStyle}/>
        <Avatar alt="Remy Sharp" className={classes.imageCropper} src={this.state.imageSrc} />
        <CardContent className={classes.cardcontent}>
          <Typography component="h5" variant="h5" className={classes.realName}>{realName}</Typography>
          <Typography component="h6" variant="h6" className={classes.dob}>Date of Birth</Typography>
          <Typography component="h5" variant="h5" className={classes.dob}>{this.state.date_of_birth}</Typography>
          <Typography component="p" variant="body1" style={{textAlign: 'center', marginTop:'1em', color:'grey', marginBottom:'0'}}> This information is not made public </Typography>
          <Fab size='small' className={classes.cardcontent} style={{boxShadow: 'none', marginLeft:'42%', marginTop:'1em', marginBottom:'1.5em'}}>
            <CropFreeOutlinedIcon />
          </Fab>
        </CardContent>
        <Divider/>
      </Card>
      <Card className={classes.card}>
        <CardHeader title='CONTACT' className={classes.secondCardHeaderStyle}></CardHeader>
        <CardContent className={classes.cardcontent}>
          <TextField fullWidth label="Email" value={email} />
          <TextField fullWidth label="Mobile" value={mobile} onChange={this.changeMobile}/>
          <Fab size='small' className={classes.saveDataButton}>
            <SaveIcon onClick={this.saveData}/>
          </Fab>
        </CardContent>
      </Card>
    </Drawer>
  )}  
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideBar)