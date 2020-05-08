import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CPSwitch from './CPSwitch'
import ChipsArray from './ChipsArray'
import UniqueList from './UniqueList'
import MultipleBubbleList from './MultipleBubbleList'
import Typography from '@material-ui/core/Typography'

import PublishMenu from './PublishMenu'

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 2500,
    marginTop: theme.spacing(2)
  },
  container_grid: {
    marginTop: theme.spacing(0.5),
  }
});


class ProfileRow extends Component {

  static propTypes = {
    key: PropTypes.number,
    label: PropTypes.string,
    helper_text: PropTypes.string,
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      published: false,
      publishers: {'Who am I': false},
      fieldName: '',
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)

    this.inputProps = {
      step: 300,
    }
  }

  componentDidMount() {
    if ('textValue' in this.props){
      if (this.props.textValue !== undefined && 'value' in this.props.textValue){
        this.setState({value: this.props.textValue.value})
        this.setState({published: this.props.textValue.published})
        this.setState({publishers: this.props.textValue.publishers})
      }
    }
  }

  componentWillUnmount() {
  }

  handleChange = (e) => {
    var data = {
      'fieldName': this.props.fieldName,
      'type': e.type,
      'value': this.state.value,
      'published': this.state.published,
      'publishers': this.state.publishers,
      'indexValue': this.props.indexValue
    }

    if(e.type == 'typing_bubble') {
      data = e
      this.setState({value: e.value})
    }
    else if (e.type == 'multiple_bubble_list'){
      data['value'] = e.value
      this.setState({value: e.value})
    }
    else if (typeof e === "boolean") {
        this.setState({published: e})
        data['published'] = e
        data['value'] = this.state.value
    }
    else if (e.hasOwnProperty('target')) {
      this.setState({value: e.target.value})
      data['value'] = e.target.value
    } else {
      this.setState({publishers: e})
      data['publishers'] = e
    }

    this.props.onDataChange(data)
  }

  getComponent(classes) {
    let comp
    if (this.props.type == 'single_text') {
      if (this.props.required) {
        comp = <Grid container direction="row" justify="flex-start" className={classes.root}> 
          <Grid item xs={9}> <TextField
            ref={(ref) => this.text = ref}
            required
            fullWidth
            id="standard-basic"
            label={this.props.label}
            name={this.props.name}
            onChange={this.handleChange}
            margin="normal"
            helperText={this.props.helper_text}
            inputProps={this.inputProps}
            value={this.state.value} />
            </Grid>
            <Grid item  xs={3}>
              <Grid container direction="row" justify="flex-start"> 
                <CPSwitch 
                  name='publish_switch'
                  checked={this.state.published}
                  onChange={this.handleChange}>
                </CPSwitch>
                <PublishMenu onCheckedChange={this.handleChange} publishers={this.state.publishers}/>
              </Grid>
            </Grid>
          </Grid> 
      } else {
        comp = <Grid container direction="row" justify="flex-start" className={classes.root}> 
          <Grid item xs={9}> <TextField
            ref={(ref) => this.text = ref}
            fullWidth
            multiline
            id="standard-basic"
            label={this.props.label}
            name={this.props.name}
            rowsMax="10"
            onChange={this.handleChange}
            margin="normal"
            helperText={this.props.helper_text}
            inputProps={this.inputProps}
            value={this.state.value}/>
            </Grid>
            <Grid item  xs={3}>
              <Grid container direction="row" justify="flex-start"> 
                <CPSwitch 
                  name='publish_switch'
                  checked={this.state.published}
                  onChange={this.handleChange}>
                </CPSwitch>
                <PublishMenu onCheckedChange={this.handleChange} publishers={this.state.publishers}/>
              </Grid>
            </Grid>
          </Grid>
      }
    }
    else if (this.props.type == 'long_text') {
      comp = <Grid container direction="row" justify="flex-start" className={classes.root}> 
        <Grid item xs={9} className={classes.container_grid}>
          <TextField
            ref={(ref) => this.text = ref}
            id="outlined-multiline-flexible"
            label={this.props.label}
            fullWidth
            multiline
            rowsMax={4}
            variant="outlined"
            onChange={this.handleChange}
            helperText={this.props.helper_text}
            inputProps={this.inputProps}
            value={this.state.value}/>
          </Grid>
        <Grid item xs={3}>
            <Grid container direction="row" justify="flex-start"> 
              <CPSwitch 
                name='publish_switch'
                checked={this.state.published}
                onChange={this.handleChange}>
              </CPSwitch>
              <PublishMenu onCheckedChange={this.handleChange} publishers={this.state.publishers}/>
            </Grid>
        </Grid>
      </Grid>
    }
    else if (this.props.type == 'unique_list') {
      comp = <Grid container direction="row" justify="flex-start" className={classes.root}> 
        <Grid item xs={12}>
          <Typography>{this.props.label}</Typography>
        </Grid>
        <Grid item xs={9} className={classes.container_grid}>
          <UniqueList
            key = {this.props.key}
            indexValue = {this.props.indexValue}
            textValue = {this.props.textValue}
            fieldName = {this.props.fieldName}
            label = {this.props.label}
            name = {this.props.name}
            value={this.state.value}
            onDataChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="row" justify="flex-start"> 
            <CPSwitch 
              name='publish_switch'
              checked={this.state.published}
              onChange={this.handleChange}>
            </CPSwitch>
            <PublishMenu onCheckedChange={this.handleChange} publishers={this.state.publishers}/>
          </Grid>
        </Grid>
      </Grid>
    }
    else if (this.props.type == 'multiple_bubble_list') {
      comp = <Grid container direction="row" justify="flex-start" className={classes.root}> 
        <Grid item xs={12}>
          <Typography>{this.props.label}</Typography>
        </Grid>
        <Grid item xs={9} className={classes.container_grid}>
        <MultipleBubbleList
          key = {this.props.key}
          indexValue = {this.props.indexValue}
          textValue = {this.props.textValue}
          fieldName = {this.props.fieldName}
          label = {this.props.label}
          name = {this.props.name}
          value = {this.state.value}
          onDataChange={this.handleChange}
        />
        </Grid>
        <Grid item  xs={3}>
          <Grid container direction="row" justify="flex-start"> 
            <CPSwitch 
              name='publish_switch'
              checked={this.state.published}
              onChange={this.handleChange}>
            </CPSwitch>
            <PublishMenu onCheckedChange={this.handleChange} publishers={this.state.publishers}/>
          </Grid>
        </Grid>
      </Grid>
    }
    else if (this.props.type == 'typing_bubble') {
      comp = <Grid container direction="row" justify="flex-start" className={classes.root}> 
        <Grid item xs={12}>
          <Typography>{this.props.label}</Typography>
        </Grid>
        <Grid item xs={9} className={classes.container_grid}>
          <ChipsArray
            key = {this.props.key}
            indexValue = {this.props.indexValue}
            textValue = {this.props.textValue}
            fieldName = {this.props.fieldName}
            label = {this.props.label}
            name = {this.props.name}
            value = {this.state.value}
            onDataChange={this.handleChange}
          />
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="row" justify="flex-start"> 
              <CPSwitch 
                name='publish_switch'
                checked={this.state.published}
                onChange={this.handleChange}>
              </CPSwitch>
              <PublishMenu onCheckedChange={this.handleChange} publishers={this.state.publishers}/>
            </Grid>
          </Grid>
        </Grid>
    }

    return comp
  }

  render() {
    const { classes } = this.props
    const ValueItem = this.getComponent(classes)

    return (
      <Grid container direction='row' name={this.props.fieldName} value={this.props.indexValue}>
        {ValueItem}    
      </Grid>
    )
  }
}

export default withStyles(styles)(ProfileRow)
