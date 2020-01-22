import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import ScrollBar from 'react-perfect-scrollbar'
import Container from '@material-ui/core/Container'

import Header from './Header'
import Footer from './Footer'
import SideBar from './SideBar'


export default class Layout extends Component {
    render() {
        return (
            <ScrollBar component="div">
                <Header />
                <Container maxWidth="lg">
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <SideBar/>
                        </Grid>
                        <Grid item xs={8}>
                            {this.props.children}
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
        </ScrollBar>
        )
    }
}