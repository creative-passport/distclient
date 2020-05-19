import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import CPButton from './CPButton'

import streemliner_logo from '../images/streemliner_logo.svg'


const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
    overflow: 'auto',
  },
  title: {
    fontSize: '14pt'
  },
  text: {
    width: '100%',
    color: 'grey',
    marginBottom: '1em'
  },
  paper: {
    width: '100%',
    padding: theme.spacing(1)
  },
  image: {
    verticalAlign: 'middle',
    borderStyle: 'none',
    height: '80px',
    float: 'left',
    margin: '0.5em',
    borderRadius: '5px',
  }
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}


class RepresentativesSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show_subfields: false,
      values: [],
      subfield: null,
      all_representatives: {},
      selected_values: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
  }

  static propTypes = {
    classes: PropTypes.object,
    key: PropTypes.number,
    label: PropTypes.string,
    data: PropTypes.object
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleChange = (event) => {
    this.setState({selected_values: event.target.value})

    if (event.target.value.length > 0){
      this.setState({show_subfields: true})
    }
  }

  onDataChange(data) {
    console.log(data)
    this.props.onDataChange(data)
  }

  render() {
    const { classes } = this.props
    const subfield = this.props.name

    return (
      <Grid container>
        <Typography variant="body1" display='block' className={classes.text}> Connected Services</Typography>
        <Typography variant="body2" display='block' className={classes.text}> YouTube</Typography>
        <Typography variant="body2" display='block' className={classes.text}> Spotify</Typography>
        <Typography variant="body1" display='block' className={classes.text}> Optional Services</Typography>
        <Paper elevation={1} className={classes.paper}>
          <Typography variant="h6" display='block' className={classes.title}> Streemliner</Typography>
          <img src={streemliner_logo} alt="streemliner logo" className={classes.image} />
          <Typography variant="body2" display='block' className={classes.text}> Streemliner adds multiple levels of engagement associated with music including official original booklet artwork, interactive credits and user generated options. Connecting with streemliner allows you to control and/or verify your published credit data</Typography>
          <CPButton variant="contained" style={{width: '60px', height:'28px', position: 'absolute', bottom: '30px', right: '30px'}}> Add </CPButton>
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(RepresentativesSection)
