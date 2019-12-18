import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'

// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
// import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
// import { Paper } from '@material-ui/core'


import sample from '../images/sample.jpg'

const styles = theme => ({
  drawer: {
    flex: 'auto',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    padding: theme.spacing(0)
  },
  drawerPaper: {
    position: 'relative'
  },
  content: {
    flexGrow: 1,
    padding: 0,
  },
  cardcontent: {
    padding: 0
  },
  toolbar: theme.mixins.toolbar,
  card: {
    maxWidth: 345,
    root: {
      padding: 0
    }
  },
  media: {
    height: 150,
    width: 150,
    paddingTop: '56.25%',
    borderRadius: '50%',
  },
  essentialFields: {
    paddingBottom: '15%'
  }
});


class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(){
    console.log("handle change in SideBar")
  }


  render() {
    const { classes } = this.props

    const inputProps = {
      step: 300,
    } 

    const fields = ['Real Name', 'DOB']

    const imageCropper = {
      width: '100px',
      height: '100px',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '50%',
      marginLeft: '30%'
    }

    const profilePic = {
      display: 'inline',
      margin: '0 auto',
      marginLeft: '-25%', //centers the image
      marginBottom: '25%',
      height: '200%',
      width: 'auto'
    }

    return (
      <Grid container>
        <CssBaseline />
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          <Card className={classes.card}>
          <CardHeader> </CardHeader>
            <div style={imageCropper} className="image-cropper">
              <img src={sample} style={profilePic} alt="avatar" className="profile-pic"/>
            </div>
          <CardContent className={classes.cardcontent}>
            <List className={classes.essentialFields}>
              {fields.map((text, index) => (
                <ListItem key={text}>
                  <TextField
                    fullWidth
                    id="real-name"
                    label={text}
                    name={text}
                    onChange={this.handleChange}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <Divider/>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
        </Drawer>
      </Grid>
  )}  
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideBar)