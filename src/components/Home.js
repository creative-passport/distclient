import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Auth } from 'aws-amplify'

import './Home.css'
import Layout from './Layout'
import Grid from '@material-ui/core/Grid'


const mapStateToProps = state => {
  return { login: state.fullName };
}

class ConnectedHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            verified: false,
            yoti_response: null,
            fullName: '',
            email: '',
            error: '',
            current_token: ''
        }
    }

    componentDidMount() {

        Auth.currentAuthenticatedUser().then(
        user => {
          this.setState({walletId: user.attributes.sub})
          this.setState({email: user.attributes.email})
          this.setState({jwtToken: user.signInUserSession.idToken.jwtToken})
        }).catch(error => console.log(error))

        try {
            var yoti_token = window.location.href.split('?token=')[1];
            if (yoti_token !== undefined) {
                axios.get('https://0.0.0.0:8080/imreal?token='+yoti_token).then(
                    res => {
                        console.log("YOTI CALLED in FrontEnd")
                        console.log(res.data)
                        this.setState({verified: true, yoti_response: res.data})

                        var data = {
                            email: res.data.email_address,
                            name: res.data.full_name,
                            gender: res.data.gender
                        }

                        var config = {
                            headers: {
                                data: data
                            }
                        }

                        axios.post('https://0.0.0.0:8080/save_yoti_verification', config
                        ).then((response) => {
                          console.log(response);
                        }, (error) => {
                          console.log(error);
                        });
                    }
                ).catch(function (error) {
                    console.log("YOTI Error")
                    console.log(error)
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }

    componentWillUnmount() {
    }

    render() {
        const name = this.state.fullName
        return (
            <Layout>
                <Grid container>
                    Welcome {name}
                </Grid>
            </Layout>
        )
    }
}

const Home = connect(mapStateToProps)(ConnectedHome)
export default Home

