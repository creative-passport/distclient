import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'


const StyledMenu = withStyles(theme => ({
  paper: {
    border: '1px solid #d3d4d5',
    padding: '8px',
    margin: '16px'
  }
}))(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function getPublishers(){
  return ['1', '2']
}

class PublishMenu extends React.Component  {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      checkedItems: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    // create a state for each of the checkbox states in the publishers list
    this.publishersState = getPublishers().reduce(function(result, item, index, array) {
      result[item] = false
      return result;
    }, {})

    this.setState({checkedItems: this.publishersState})
  }

  componentWillUnmount() {
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

    const menuItems = getPublishers().map(publisher => {
      return  <StyledMenuItem key={publisher}>
        <Checkbox label={publisher} name={publisher} onChange={this.handleChange} /> {publisher}
      </StyledMenuItem>
    })

    return (
      <Grid item xs={2}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        style={{marginTop: '16px', padding: '10px'}}
        onClick={this.handleClick}
      >
        Publishers
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
       {menuItems}
      </StyledMenu>
     </Grid>
    )
  }
}

export default PublishMenu