import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Amplify, { Analytics, Storage } from 'aws-amplify'
import { withAuthenticator, S3Album } from 'aws-amplify-react'

import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Auth } from 'aws-amplify'

import * as api from '../scripts'

const styles = theme => ({
  root: {
    display: 'flex',
    margin: '0 auto',
    '& > *': {
      margin: '0 auto',
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
})

function getFileByLatestDate(files) {
  return files.reduce((max, p) => p.lastModifiedDate > max.lastModifiedDate ? p : max, files[0])
}

class ProfileImage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          error: '',
          imageSrc: '',
          imageAltName: '',
          walletId: null,
          extensions: ['.png', '.jpeg']
      }
      this.updateImage = this.updateImage.bind(this)
      this.getCurrentProfileImage = this.getCurrentProfileImage.bind(this)
    }

    async componentDidMount() {
      api.SetS3Config("cp-dev08c815b6f3ca4c47a72f5018de38d419devtwo-devtwo", "private")
      this.getCurrentProfileImage()
    }

    getCurrentProfileImage = async () => {
      const files = await Storage.list('profile_photo')
      var latestFile = getFileByLatestDate(files)

      Storage.get(latestFile.key).then(imageReturn => {
        this.setState({
          imageSrc: imageReturn,
          imageAltName: "Profile Photo"
        })
      }).catch(function (error) {
          console.log(error)
      })
    }

    async updateImage(e) {
      const file = e.target.files[0]
      const file_type = file.type
      const extension = '.' + file_type.split('/')[1]
      const uploaded = await Storage.put('profile_photo/profile_photo_' + this.props.walletId + extension, file)
      Storage.get('profile_photo/profile_photo_' + this.props.walletId + '.jpeg').then(imageReturn => {
        this.setState({
          imageSrc: imageReturn,
          imageAltName: "Profile Photo"
        })
      }).catch(function (error) {
          console.log(error)
      })
    }

    render() {
      const { classes } = this.props
      const inputID = 'profile-photo'

      return (
        <div style={{margin:'0 auto'}}>
          <div className={classes.root}>
            <input
              id={inputID}
              type="file"
              accept='image/*'
              style={{ display: "none" }}
              onChange={this.updateImage}
            />
            <label htmlFor={inputID}>
              <IconButton size='medium' component="span">
                <Avatar src={this.state.imageSrc} alt={this.state.imageAltName} className={classes.large}/>
              </IconButton>
            </label>
          </div>
        </div>
      ) 
    }
}

ProfileImage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileImage)