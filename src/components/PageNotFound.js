import React from 'react'
import { Link } from 'react-router-dom'
import PageNotFoundImage from '../images/PageNotFoundImage.png'
import Layout from './Layout'


const PageNotFound = () => (
  <Layout>
    <img src={PageNotFoundImage} style={{display: 'block', margin: 'auto', position: 'relative' }} alt="" />
    <center>
      <Link to="/">Return to Home Page</Link>
    </center>
  </Layout>
);
export default PageNotFound;