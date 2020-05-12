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
    marginLeft: theme.spacing(1)
  }
})

export class RepresentativesWithSubFields extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact_email: ' ',
      contact_name: ' ',
      contact_note: ' ',
      value: ' ',
      detailed_data: {
        'name': ' ',
        'value': ' ',
        'contact_email': ' ',
        'contact_name': ' ',
        'contact_note': ' ',
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubChange = this.handleSubChange.bind(this)
  }

  componentDidMount() {
    if (this.props.value !== null && this.props.value !== '') {
      this.setState({detailed_data: this.props.value})
    }
    else {
      this.setState({ detailed_data : {
          'name': this.props.fieldName,
          'value': this.state.value,
          'contact_name': this.state.contact_name,
          'contact_email': this.state.contact_email,
          'contact_note': this.state.contact_note
      }})

      if (this.props.textValue !== undefined && 'fieldName' in this.props.textValue) {

        var data = {
          'type': 'single_text_with_subcategories',
          'fieldName': this.props.fieldName,
          'textValue': this.props.textValue,
          'value': {
            'name': this.props.fieldName,
            'value': this.props.textValue.value.value,
            'contact_name': this.props.textValue.value.contact_name,
            'contact_email': this.props.textValue.value.contact_email,
            'contact_note': this.props.textValue.value.contact_note
          }
        }

        this.setState({
          value: this.props.textValue.value.value,
          contact_email: this.props.textValue.value.contact_email,
          contact_name: this.props.textValue.value.contact_name,
          contact_note: this.props.textValue.value.contact_note
        })
      }
      else {
        var data = {
          'type': 'single_text_with_subcategories',
          'fieldName': this.props.fieldName,
          'textValue': this.props.textValue,
          'value': {
            'name': this.props.fieldName,
            'value': this.state.value,
            'contact_name': this.state.contact_name,
            'contact_email': this.state.contact_email,
            'contact_note': this.state.contact_note
          }
        }
      }

      this.props.onDataChange(data)
    }
  }
  
  handleChange = (event) => {
    this.setState({value: event.target.value})

    this.setState({ detailed_data : {
      'name': this.props.fieldName,
      'value': event.target.value,
      'contact_name': this.state.contact_name,
      'contact_email': this.state.contact_email,
      'contact_note': this.state.contact_note
    }})

    var data = {
      'type': 'single_text_with_subcategories',
      'fieldName': this.props.fieldName,
      'value': {
        'name': this.props.fieldName,
        'value': event.target.value,
        'contact_name': this.state.contact_name,
        'contact_email': this.state.contact_email,
        'contact_note': this.state.contact_note
      }
    }

    this.props.onDataChange(data)
  }

  handleSubChange = (event) => {
    
    this.setState({[event.target.name]: event.target.value})

    var name = event.target.name
    var detailed_data = this.state.detailed_data
    detailed_data[name] = event.target.value

    var data = {
      'type': 'single_text_with_subcategories',
      'fieldName': this.props.fieldName,
      'value': detailed_data
    }

    this.props.onDataChange(data)
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <TextField 
          fullWidth
          value={this.state.value}
          label={this.props.label}
          name={this.props.label}
          onChange={this.handleChange}
          margin="normal"/>
        <div className={classes.sub_categories}>
          <TextField fullWidth label="Contact" name="contact_name" value={this.state.contact_name} onChange={this.handleSubChange}/>
          <TextField fullWidth label="Email" name="contact_email" value={this.state.contact_email} onChange={this.handleSubChange}/>
          <TextField fullWidth label="Note" name="contact_note" value={this.state.contact_note} onChange={this.handleSubChange}/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(RepresentativesWithSubFields)


