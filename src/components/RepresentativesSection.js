import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import InputBase from '@material-ui/core/InputBase'
import Fab from '@material-ui/core/Fab'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Typography from '@material-ui/core/Typography'

import ProfileRow from './ProfileRow'
import CPButton from './CPButton'

import { text_fields, representative_fields } from '../text_fields'

const shortid = require('shortid')


const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
    overflow: 'auto'
  },
  container_grid: {
    marginTop: theme.spacing(0.5),
  },
  formControl: {
    width: '100%',
    '& .MuiSelect-root': {
      whiteSpace: 'pre-wrap'
    }
  },
  selectMenu: {
    '& .Mui-selected': {
      backgroundColor: '#d9fffc'
    }
  },
  chip: {
    border: 'solid 0.5px',
    borderColor: 'black',
    backgroundColor: 'white',
    marginRight: theme.spacing(0.3),
    marginBottom: theme.spacing(0.2),
    height: '22px',
    fontSize: '8pt',
    '& .MuiChip-root': {
      height: '28px'
    },
    '& .MuiChip-label': {
      textTransform: 'capitalize'
    }
  },
  menu: {
    opacity: 0,
    '& .MuiMenu-paper .MuiPopover-paper': {
      opacity: 0,
    }
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
      artist_data: this.props.artist_data,
      values: [],
      subfield: null,
      all_representatives: {},
      selected_value: '',
      selected_subfields: [],
      all_subfields: [],
      show_add_rep: false,
      new_unique_id: null,
      detailed_fields: {'fieldName': '', data: {}}
    }

    this.setType = this.setType.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
    this.showAddRep = this.showAddRep.bind(this)
  }

  static propTypes = {
    classes: PropTypes.object,
    key: PropTypes.number,
    label: PropTypes.string
  }

  componentDidMount() {
    this.setState({
      values: text_fields['representatives_contacts']['data_fields']['list_of_representatives']['list_items'],
      subfield: this.props.name,
      all_representatives: representative_fields})

    var selected_subfields = []

    Object.keys(representative_fields).map(key => {
      if (key in this.props.artist_data) {
        this.setState({ show_subfields: true })
        selected_subfields.push(key)
      }
    })
    this.setState({selected_subfields: selected_subfields})
    this.loadInitialRows(selected_subfields)
  }

  componentWillUnmount() {}

  setType = (event) => {
    this.setState({selected_value: event.target.value})

    var oldSubfields = this.state.selected_subfields
    oldSubfields.push(event.target.value)

    this.setState({selected_subfields: oldSubfields})

    if (oldSubfields.length > 0) {
      this.setState({show_subfields: true})
    }

    this.setState({new_unique_id: shortid.generate()})
    this.updateProfileRows(event.target.value, shortid.generate())
  }

  onDataChange(data) {
    var all_data = this.state.artist_data
    var rep_type = data.fieldName

    var uniqueKey = data['indexValue']

    if (!(rep_type in all_data)) {
      console.log("completely brand new")
      var dataToExport = {
        'fieldName' : rep_type,
        'data': {[uniqueKey] : data}
      }   
      all_data[rep_type] = dataToExport
      this.props.onDataChange(dataToExport)
    }
    else {
      for (let i in all_data[rep_type]['data']) {
        console.log("updating same data")
        all_data[rep_type]['data'][uniqueKey] = data
      }
      this.setState({artist_data: all_data})
      this.props.onDataChange(all_data[rep_type])
    }
  }

  showAddRep() {
    this.setState(prevState => ({
      show_add_rep: !prevState.show_add_rep
    }))
  }

  loadInitialRows(selected_subfields) {
    var all_subfields = []
    for (let i in selected_subfields) {
      var component_key = selected_subfields[i]
      for (let j in this.state.artist_data[component_key].data)
      { 
        var properindexVal = this.state.artist_data[component_key].data[j].indexValue
        all_subfields.push({
          'key': properindexVal,
          'indexValue': properindexVal,
          'fieldName': component_key,
          'textValue': this.state.artist_data[component_key].data[j],
          'name': component_key,
          'type': 'single_text_with_subcategories'
        })
      }
    }
    this.setState({all_subfields: all_subfields})
  }

  updateProfileRows(selected_subfield, new_unique_id) {
    const subfield = this.props.name
    let all_subfields = this.state.all_subfields

    var component_key = selected_subfield
    console.log(component_key)
    if (!(component_key in this.state.artist_data)) {
      console.log("BRAND NEW CATEGORY")
      var new_profile_row = {
        'key': new_unique_id,
        'indexValue': new_unique_id,
        'fieldName': component_key,
        'name': component_key,
        'type': 'single_text_with_subcategories'
      }
      all_subfields.push(new_profile_row)
      this.setState({all_subfields: all_subfields})
      return
    }
    else {
      var new_profile_row = {}
      for (let j in this.state.artist_data[component_key].data) {
        console.log(j)
        var properindexVal = this.state.artist_data[component_key].data[j].indexValue
        console.log(properindexVal)
        console.log(new_unique_id)
        if(properindexVal != new_unique_id) {
          console.log("GOT MAYBE NEW ROW")
          new_profile_row = {
            'key': new_unique_id,
            'indexValue': new_unique_id,
            'fieldName': component_key,
            'name': component_key,
            'type': 'single_text_with_subcategories'
          }
        }
      }
      all_subfields.push(new_profile_row)
      this.setState({all_subfields: all_subfields})
    }
  }

  loadProfileRows() {
    var all_subfields = []
    if(this.state.all_subfields != undefined) {
      all_subfields = Object.keys(this.state.all_subfields).map(i => {
        var component_key = this.state.all_subfields[i].fieldName
        return <ProfileRow
              key={this.state.all_subfields[i].key} 
              indexValue={this.state.all_subfields[i].indexValue}
              textValue={this.state.all_subfields[i].textValue}
              fieldName={this.state.all_subfields[i].fieldName}
              label={this.state.all_representatives[component_key].label}
              name={this.state.all_subfields[i].name}
              onDataChange={this.onDataChange} 
              type="single_text_with_subcategories"
            />
      })
    }
    return all_subfields
  }

  render() {
    const { classes } = this.props
    const all_subfields = this.loadProfileRows()

    return (
      <Grid container>
        <Typography variant="h6" component="h6" className={classes.persona_title}> Add Representative </Typography>
        <Fab size='small' component="span" onClick={this.showAddRep} className={classes.show_profile_button}>
          <AddCircleIcon style={{ color:'#02d1a8', marginTop: '-0.2em'}}/>
        </Fab>
        { this.state.show_add_rep ? 
          <FormControl className={classes.formControl}>
            <Select
              name={this.state.name}
              value={this.state.selected_value}
              onChange={this.setType}
              MenuProps={MenuProps}>
              {this.state.values.map((name) => (
                <MenuItem className={classes.selectMenu} key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        : null }
        {all_subfields}
      </Grid>
    )
  }
}

export default withStyles(styles)(RepresentativesSection)
