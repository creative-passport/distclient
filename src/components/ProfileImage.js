import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Storage } from 'aws-amplify'

import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import * as api from '../scripts'

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#f2f2f2',
    margin: '-3em auto 0 auto',
    '& > *': {
      margin: '0 auto',
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginTop: '-2em'
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
      ) 
    }
}

ProfileImage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileImage)