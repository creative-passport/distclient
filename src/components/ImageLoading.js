import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Storage } from 'aws-amplify'

import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import CloseIcon from '@material-ui/icons/Close'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import * as api from '../scripts'

const styles = theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    delete: {
      width: theme.spacing(1),
      backgroundColor: '#fff'
    },
    add_image: {
      boxShadow: 'none',
      marginLeft: theme.spacing(1),
      backgroundColor: '#fff',
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    add_image_icon: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      color:'#02d1a8'
    }
})


class SingleImageGroup extends Component {

    constructor(props) {
      super(props);
      this.state = {
        open: true
      }
      this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(e) {
      this.props.handleDelete(e, this.props.fileName)
    }

    render() {
      return(
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          badgeContent={<IconButton aria-label="delete" size="small" onClick={this.handleDelete} style={{backgroundColor: '#fff'}}><CloseIcon fontSize="small"/></IconButton>}
        >
          <Avatar id={this.props.id} src={this.props.src} alt={this.props.alt} className={this.props.className} style={{width: '3em', height: '3em'}}/>
        </Badge>
      )
    }
}

SingleImageGroup.propTypes = {
  classes: PropTypes.object,
  src: PropTypes.string,
  handleDelete: PropTypes.func
}


class ImageLoading extends Component {
    constructor(props) {
      super(props);
      this.state = {
          error: '',
          artist_name: this.props.artist_name,
          files: [],
          images: [],
          combinedImagesSource: {}
      }
      this.addImage = this.addImage.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.listFiles = this.listFiles.bind(this)
    }

    async componentDidMount() {
      api.SetS3Config("cp-dev08c815b6f3ca4c47a72f5018de38d419devtwo-devtwo", "private")
      this.createFolder()
      this.listFiles()
    }

    addImage(e) {
      const file = e.target.files[0]
      Storage.put(this.props.artist_name +'/'+ file.name, file)
      .then (() => {
        this.listFiles()
      })
      .catch(err => console.log(err))
    }

    createFolder() {
      var today = new Date()
      var f = new File(["1"], "mock_file_for_folder.txt", {type: "text/plain"})
      Storage.put(this.props.artist_name +'/'+ f.name, f)
      .then (() => console.log("check new empty file"))
      .catch(err => console.log(err))
    }

    handleDelete(e, fileName) {
      Storage.remove(fileName)
      .then (() => {
        console.log("Removed file "+ fileName)
        // var newImages = oldImages.pop(file)
        // this.setState({images: newImages})
        this.listFiles()
      })
      .catch(err => console.log(err))
      //const images = this.state.images.filter(image => image.id !== item);
      //this.setState({ images: images });
    }
    
    listFiles = async () => {
      const files = await Storage.list(this.props.artist_name)

      var images = files.filter(function(file){
        var extension = file.key.split('.')[1]
        return (extension.indexOf('jpg') > -1 || extension.indexOf('png') > -1 || extension.indexOf('jpeg') > -1)
      })

      let signedFiles = images.map(f => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)

      var combinedImagesSource = {};
      images.forEach((image, i) => combinedImagesSource[image.key] = signedFiles[i])

      if (Object.keys(combinedImagesSource).length > 0) {
        var that = this
        this.currentImages = Object.keys(combinedImagesSource).map(function(image, i) {
          const imageId = "image" + i
          const file = combinedImagesSource[image]
          return (<SingleImageGroup key={i} id={imageId} src={file} alt={image} fileName={image} handleDelete={that.handleDelete} className={that.props.classes.large}/>)
        })
      }
      else {
        this.currentImages = []
      }
      this.setState({ files: signedFiles, combinedImagesSource: combinedImagesSource })
    }

    render() {
      const { classes } = this.props

      const inputID = "raised-button-file-"+this.props.artist_id

      return (
        <Grid container spacing={2} direction="row" justify="flex-end" alignItems="center">
            <div className={classes.root}>
              {this.currentImages}
            </div>

            <input
              id={inputID}
              type="file"
              accept='image/*'
              style={{ display: "none" }}
              onChange={this.addImage}
            />
            <label htmlFor={inputID}>
              <Fab size='small' component="span" className={classes.add_image}>
                <AddCircleIcon fontSize='large' className={classes.add_image_icon}/>
              </Fab>
            </label>
        </Grid>
      )
    }
}

ImageLoading.propTypes = {
  classes: PropTypes.object.isRequired,
  artist_name: PropTypes.string.isRequired,
  artist_id: PropTypes.string.isRequired
}

export default withStyles(styles)(ImageLoading)