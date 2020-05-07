import React from 'react'

class AbsoluteRedirect extends React.Component {

    componentDidMount(){
        window.location = this.props.to
    }

    render(){
        return null
    }
}

export default AbsoluteRedirect
