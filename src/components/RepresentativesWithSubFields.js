import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    '& .MuiInput-underline': {
      borderRadius: '25%'
    },
    '& .MuiInput-underline:before': {
      marginTop: '2em',
      borderRadius: '5em'
    },
    '& .MuiInputBase-input': {
      paddingTop: '1em'
    },
    '& .MuiFormLabel-root': {
      fontSize: '10pt',
      position: 'absolute',
      top: '-10pt'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'none',
      position: 'absolute',
      top: '5pt'
    },
    '& .MuiTypography-root': {
      margin: theme.spacing(2),
      color: '#9e9e9e',
      alignItems:'center',
      alignSelf: 'center',
      textAlign: 'center'
    }
  },
  sub_categories: {
    marginLeft: theme.spacing(1),
    '& .MuiFormControl-root': {
      marginTop: '0.7em'
    }
  }
})

export class RepresentativesWithSubFields extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact_email: ' ',
      contact_name: ' ',
      contact_note: ' ',
      rep_name: ' ',
      detailed_data: {
        'fieldName': this.props.fieldName,
        'type': 'single_text_with_subcategories',
        'rep_name': '',
        'contact_name': '',
        'contact_email': '',
        'contact_note': ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.props.value !== null && this.props.value !== '') { 
      this.setState({detailed_data: this.props.value})
    }
    else if (this.props.textValue !== undefined && this.props.textValue.value !== undefined) {
      // Load previous saved data from artist_profiles representatives section
      this.setState({
        detailed_data: this.props.textValue.value,
        rep_name: this.props.textValue.value.rep_name,
        contact_email: this.props.textValue.value.contact_email,
        contact_name: this.props.textValue.value.contact_name,
        contact_note: this.props.textValue.value.contact_note
      })
    }
  }
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    
    var name_to_change = event.target.name
    var data = this.state.detailed_data
    data[name_to_change] = event.target.value
    
    this.setState({ detailed_data : data })
    this.props.onDataChange(data)
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <TextField fullWidth label="Name" name="rep_name" value={this.state.rep_name} onChange={this.handleChange} margin="normal"/>
        <div className={classes.sub_categories}>
          <TextField fullWidth label="Contact" name="contact_name" value={this.state.contact_name} onChange={this.handleChange}/>
          <TextField fullWidth label="Email" name="contact_email" value={this.state.contact_email} onChange={this.handleChange}/>
          <TextField fullWidth label="Note" name="contact_note" value={this.state.contact_note} onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(RepresentativesWithSubFields)


