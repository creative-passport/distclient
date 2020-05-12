import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import ScrollBar from 'react-perfect-scrollbar'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

import { isMobile } from 'react-device-detect'

import Header from './Header'
import Footer from './Footer'
import SideBar from './SideBar'


export default class Layout extends Component {

    render() {

        let menuwidth = 8
        let sidebarwidth = 4
        if (isMobile) {
            sidebarwidth=12
            menuwidth=12
        }

        return (
            <ScrollBar component="div">
            <CssBaseline />
                <Header />
                <Container maxWidth="lg">
                    <Grid container direction="row">
                        <Grid item xs={sidebarwidth}>
                            <SideBar/>
                        </Grid>
                        <Grid item xs={menuwidth}>
                            {this.props.children}
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
        </ScrollBar>
        )
    }
}