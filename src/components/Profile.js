import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Fab from '@material-ui/core/Fab'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { loadCSS } from 'fg-loadcss'
import { withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { CognitoState } from 'react-cognito'

import Icon from '@material-ui/core/Icon'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import * as api from '../scripts'
import store from '../reducers/store'
import ProfileRow from './ProfileRow'
import Iframe from './iframe.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 100,
    margin: 0
  },
  indicator: {
    backgroundColor: '#ffffff',
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
  inactive_tab: {
    backgroundColor: '#009678',
    color: '#c9c9c9',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginRight: '0.5em',
    padding: theme.spacing(1)
  },
  tab_content: {
    backgroundColor: '#ffffff',
  },
  active_tab: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginRight: '0.5em',
    padding: theme.spacing(1)
  }
})

const AntTabs = withStyles({
  root: {
    borderBottom: 'none',
  },
  indicator: {
    backgroundColor: '#ffffff',
  },
})(Tabs)

const AntTab = withStyles(theme => ({
  root: {
    minWidth: 90,
    padding: '2em',
    fontWeight: theme.typography.fontWeightRegular,
    // marginRight: theme.spacing(4),
    fontSize: 12,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#fff',
      opacity: 1,
    },
    '&$selected': {
      color: '#029679',
      fontWeight: theme.typography.fontWeightMedium,
    }
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />)

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      style={{width:'100%'}}
      role="tabpanel"
      id={`nav-tabpanel-${index}`}
      component={'span'}
      hidden={value !== index}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box m={3}>{children}</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          error: '',
          additionalRows: [],
          currentData: {},
          value: 0,
          jwtToken: '',
          walletId: '',
          cognitue_state: store.getState().cognito,
          src: '' 
      }
      this.addData = this.addData.bind(this)
      this.addRow = this.addRow.bind(this)
      this.saveProfile = this.saveProfile.bind(this)
      this.addNewProfile = this.addNewProfile.bind(this)
      this.a11yProps = this.a11yProps.bind(this)
      this.handleTabChange = this.handleTabChange.bind(this)
    }

    componentDidMount() {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      )

      const user = this.state.cognitue_state.user
      const attributes = this.state.cognitue_state.attributes

      if (user !== undefined) {
        user.getSession((err, session) => {
          if (err) {
            console.log(err)
          } else {
            this.setState({jwtToken: session.getIdToken().getJwtToken()})
          }
        })
      }

      var streemlinerRoot = 'https://streemliner.com/app/proCP/contributor.php?u='
      var stlUsername = 'imogen%20heap'
      console.log(user.username)
      if(user.username === 'imogenheap') {
        stlUsername = 'imogen%20heap'
      }
      else {
        stlUsername = user.username.replace('_','%20')
      }
      this.setState({src: streemlinerRoot + stlUsername})

      this.setState({currentData: this.props.artist_data})
    }

    addData(event) {
      var currentData = this.state.currentData
      var newIndex = event['indexValue']
      var fieldName = event['fieldName']
      var newEvent = {fieldName: event}

      if ('fieldName' in event && event['fieldName'] !== undefined) {
        currentData[event['fieldName']] = event
      }

      this.setState({currentData: currentData})
    }

    addRow(){
      this.setState(state => {
        const list = state.additionalRows.push(' ');
        return list
      })
    }

    handleShowProfile(){
      this.setState(prevState => ({
        show_profile: !prevState.show_profile
      }))
    }

    handleTabChange(event, newValue) {
      this.setState({value: newValue})
    }

    a11yProps(index) {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    }

    addNewProfile(name){
      console.log("create new persona profile")
    }

    deleteProfile(name){
      console.log("delete the selected profile")
    }

    saveProfile(){
      var results = api.updateProfileData(this.state.walletId, this.state.currentData, this.state.jwtToken)
      console.log(results)
    }

    render() {
      const { classes } = this.props

      const rows = this.state.additionalRows.length >= 1 ? 
        this.state.additionalRows.map((row, index) => {
          const trueIndex = index + 7
          return <ProfileRow key={trueIndex} fieldName={row} indexValue={trueIndex} required={false} label={row} name={row} onDataChange={this.addData}/>
        }) : null

      return (
          <Box className={classes.root} display="flex" flexWrap="wrap">
            <AntTabs
              value={this.state.value}
              onChange={this.handleTabChange}
              variant="fullWidth"
            >
              <AntTab className={this.state.value===0 ? classes.active_tab:classes.inactive_tab} label="My Passport" {...this.a11yProps(0)} />
              <AntTab className={this.state.value===1 ? classes.active_tab:classes.inactive_tab} label="Representatives" {...this.a11yProps(1)} />
              <AntTab className={this.state.value===2 ? classes.active_tab:classes.inactive_tab} label="Official Links" {...this.a11yProps(2)} />
              <AntTab className={this.state.value===3 ? classes.active_tab:classes.inactive_tab} label="Booking, Licensing" {...this.a11yProps(3)} />
              <AntTab className={this.state.value===4 ? classes.active_tab:classes.inactive_tab} label="Other" {...this.a11yProps(4)} />
              <AntTab className={this.state.value===5 ? classes.active_tab:classes.inactive_tab} label="External Data" {...this.a11yProps(5)} />
            </AntTabs>

            <TabPanel className={classes.tab_content} value={this.state.value} index={0}>
              <ProfileRow key='2' fieldName='home_loc' indexValue={2} name='home_loc' textValue={this.props.artist_data['home_loc']} label='Home Location' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='9' fieldName='skills' indexValue={9} name='skills' label='Skills' textValue={this.props.artist_data['skills']} multiline='true' onDataChange={this.addData}/>  
              <ProfileRow key='0' fieldName='bio' indexValue={0} name='bio' label='Bio' textValue={this.props.artist_data['bio']} multiline='true' onDataChange={this.addData}/>
              <ProfileRow key='1' fieldName='short_bio' indexValue={1} name='short_bio' textValue={this.props.artist_data['short_bio']} label='Short Bio' onDataChange={this.addData}/>
              <ProfileRow key='10' fieldName='roles' indexValue={10} name='roles' textValue={this.props.artist_data['roles']} label='Roles' onDataChange={this.addData}/>
              <ProfileRow key='12' fieldName='interests' indexValue={12} name='interests' textValue={this.props.artist_data['interests']} label='Interests' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='13' fieldName='inspirations' indexValue={13} name='inspirations' textValue={this.props.artist_data['inspirations']} label='Inspirations' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='6' fieldName='gender' indexValue={6} name='gender' label='Gender' textValue={this.props.artist_data['gender']} multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='3' fieldName='current_loc' indexValue={3} name='current_loc' textValue={this.props.artist_data['current_loc']} label='Current Location' multiline='false' onDataChange={this.addData}/>
              {rows}

              <Fab size='medium' className={classes.cardcontent} style={{boxShadow: 'none', marginTop:'1em', backgroundColor:"#fff"}}>
                <AddCircleIcon style={{fontSize: 'large', color:'#02d1a8', width:'3em', height:'3em'}} onClick={this.addRow}/>
              </Fab>
              <Typography component="p" variant="body1" style={{textAlign: 'center', marginTop:'1em', color:'grey', marginBottom:'0'}}> Suggested categories: religion, sexual orientation, projects, favourite quote, favourite songs/book/films </Typography>
            </TabPanel>
            <TabPanel className={classes.tab_content} value={this.state.value} index={1}>
              <ProfileRow key='14' fieldName='isni' indexValue={14} name='isni' label='ISNI' textValue={this.props.artist_data['isni']} multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='15' fieldName='ipi' indexValue={15} name='ipi' textValue={this.props.artist_data['ipi']} label='IPI' onDataChange={this.addData}/>
              <ProfileRow key='16' fieldName='ipn' indexValue={16} name='ipn' textValue={this.props.artist_data['ipn']} label='IPN' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='17' fieldName='names' indexValue={17} name='names' textValue={this.props.artist_data['names']} label='names' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='18' fieldName='publishers' indexValue={18} name='publishers' textValue={this.props.artist_data['publishers']} label='Publishers' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='19' fieldName='collection_societies' indexValue={19} name='collection_societies' textValue={this.props.artist_data['collection_societies']} label='Collection Societies' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='20' fieldName='distributors' indexValue={20} name='distributors' textValue={this.props.artist_data['distributors']} label='Distributors' multiline='false' onDataChange={this.addData}/>
            </TabPanel>
            <TabPanel className={classes.tab_content} value={this.state.value} index={2}>
              <ProfileRow key='21' fieldName='facebook' indexValue={21} name='facebook' label='Facebook' textValue={this.props.artist_data['facebook']} multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='22' fieldName='twitter' indexValue={22} name='twitter' textValue={this.props.artist_data['twitter']} label='Twitter' onDataChange={this.addData}/>
              <ProfileRow key='23' fieldName='merch' indexValue={23} name='merch' textValue={this.props.artist_data['merch']} label='Merch' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='24' fieldName='instagram' indexValue={24} name='instagram' textValue={this.props.artist_data['instagram']} label='Instagram' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='25' fieldName='apple' indexValue={25} name='apple' textValue={this.props.artist_data['apple']} label='Apple' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='26' fieldName='spotify' indexValue={26} name='spotify' textValue={this.props.artist_data['spotify']} label='Spotify' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='27' fieldName='youtube' indexValue={27} name='youtube' textValue={this.props.artist_data['youtube']} label='Youtube' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='28' fieldName='website' indexValue={28} name='website' textValue={this.props.artist_data['website']} label='Website' multiline='false' onDataChange={this.addData}/>
            </TabPanel>
            <TabPanel className={classes.tab_content} value={this.state.value} index={3}>
              <ProfileRow key='29' fieldName='contact_email' indexValue={29} name='contact_email' label='General contact email' textValue={this.props.artist_data['contact_email']} multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='30' fieldName='manager' indexValue={30} name='manager' textValue={this.props.artist_data['manager']} label='Manager' onDataChange={this.addData}/>
              <ProfileRow key='31' fieldName='licensing' indexValue={31} name='licensing' textValue={this.props.artist_data['licensing']} label='Licensing representatives' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='32' fieldName='sync' indexValue={32} name='sync' textValue={this.props.artist_data['sync']} label='Sync' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='33' fieldName='legal' indexValue={33} name='legal' textValue={this.props.artist_data['legal']} label='Legal' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='34' fieldName='pr' indexValue={34} name='pr' textValue={this.props.artist_data['pr']} label='PR' multiline='false' onDataChange={this.addData}/>
              <ProfileRow key='35' fieldName='agents' indexValue={35} name='agents' textValue={this.props.artist_data['agents']} label='AGENTS' multiline='false' onDataChange={this.addData}/>
            </TabPanel>
            <TabPanel className={classes.tab_content} value={this.state.value} index={4}>
              <ProfileRow key='36' fieldName='awards' indexValue={36} name='awards' label='Grammy Awards' textValue={this.props.artist_data['awards']} multiline='true' onDataChange={this.addData}/>
              <ProfileRow key='37' fieldName='performances' indexValue={37} name='performances' textValue={this.props.artist_data['performances']} label='Live Performances' onDataChange={this.addData}/>
              <ProfileRow key='38' fieldName='public_appearances' indexValue={38} name='public_appearances' textValue={this.props.artist_data['public_appearances']} label='Public Appereances' onDataChange={this.addData}/>
              <ProfileRow key='39' fieldName='commissions' indexValue={39} name='commissions' textValue={this.props.artist_data['commissions']} label='Commissioned Works' onDataChange={this.addData}/>
              <ProfileRow key='40' fieldName='products' indexValue={40} name='products' textValue={this.props.artist_data['products']} label='Hardware / Software / Products' onDataChange={this.addData}/>
              <ProfileRow key='41' fieldName='charities' indexValue={41} name='charities' textValue={this.props.artist_data['charities']} label='Charities Supported' onDataChange={this.addData}/>
              <ProfileRow key='42' fieldName='sponsors' indexValue={42} name='sponsors' textValue={this.props.artist_data['sponsors']} label='Sponsors / Brands' onDataChange={this.addData}/>
            </TabPanel>
            <TabPanel className={classes.tab_content} value={this.state.value} index={5}>
              <div style={{width:'100%', height:'auto', overflow:'auto'}}>
                <Iframe source={this.state.src} style={{width:'100%', border: 'none', height:'600px', position:'relative'}}/>
              </div>
            </TabPanel>
          </Box>
      )
    }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  profile_id: PropTypes.string,
  artist_name: PropTypes.string,
  artist_data: PropTypes.object
}

export default withStyles(styles)(Profile)
  