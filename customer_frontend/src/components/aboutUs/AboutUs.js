import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Container } from '@material-ui/core';
import './About.css';
import img1 from '../../images/backdrop1.jpg'
import img2 from '../../images/backdrop2.jpg'

function AboutUs() {
    return (
        <>

        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" >Home</Link>
            <Typography color="textPrimary">About Us</Typography>
        </Breadcrumbs>
        <Divider />       
        
        <Container className="about_cont">
            <h2 className="about_title">What We Do ?</h2>
            <p className="about_para">
            Our online purchasing facility provides you the comfort of ordering your desired T-Shirt while relaxing at your home. 
            We deliver your selection to your doorstep at the earliest possible. 
            Our collection is rich with latest designs for Ladies & Gents.
            </p>
        </Container>
        <Container className="about_cont">
            <img className="about_img" alt=""  src={img2}/>
        </Container>
        </>
    )
}

export default AboutUs;
