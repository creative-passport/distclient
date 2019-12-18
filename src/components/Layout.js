import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'

import Header from './Header'
import Footer from './Footer'
import SideBar from './SideBar'


export default class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <Grid container>
                    <Grid item xs={3}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={8}>
                        {this.props.children}
                    </Grid>
                </Grid>
                <Footer />
            </div>
        )
    }
}