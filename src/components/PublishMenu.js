import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import ShareRoundedIcon from '@material-ui/icons/ShareRounded'
import Fab from '@material-ui/core/Fab'


const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 'auto 0',
  },
  button: {
    border: 'none',
    backgroundColor: '#02d1a8',
    color: '#fff',
    textAlign: 'center',
    boxShadow: 'none',
    marginBottom:'-1.4em',
    marginLeft: '-1em',
    width: '35px',
    height: '25px'
  },
  icon: {
    fontSize: '1rem'
  }
})



class PublishMenu extends React.Component  {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      checkedItems: {'Public Profile': false, 'Universal': false, 'Streemliner': false},
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    if(Object.keys(this.props.publishers).length > 0 && this.props.publishers.constructor === Object) {
      this.setState({checkedItems: this.props.publishers})
    }
  }

  handleChange(event) {
    var tempDict = this.state.checkedItems
    for (var i in this.state.checkedItems) {
      if (event.target.name === i){
        tempDict[i] = event.target.checked
      }
    }
    this.setState({checkedItems: tempDict})
    this.props.onCheckedChange(tempDict)
  }

  handleClick(event) {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {

    const { classes } = this.props

    const menuItems = Object.keys(this.state.checkedItems).map((publisher, i) => {
      return <MenuItem key={i}>
        <Checkbox label={publisher} name={publisher} onChange={this.handleChange} checked={this.state.checkedItems[publisher]}/>{publisher}
      </MenuItem>
    })

    const checkedValue = Boolean(this.state.anchorEl)

    return (
      <Grid item xs={1} className={classes.root}>
      <Fab component="span" className={classes.button} onClick={this.handleClick}>
        <ShareRoundedIcon className={classes.icon}/>
      </Fab>
      <Menu
        id="customized-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={checkedValue}
        onClose={this.handleClose}
      >
       {menuItems}
      </Menu>
     </Grid>
    )
  }
}

PublishMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  publishers: PropTypes.object
}

export default withStyles(styles)(PublishMenu)