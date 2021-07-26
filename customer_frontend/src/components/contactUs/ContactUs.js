import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Container } from 'react-bootstrap';
import './Contact.css';
import img1 from '../../images/backdrop1.jpg'
import img2 from '../../images/backdrop2.jpg'


function ContactUs() {
    return (
        <>

        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" >Home</Link>
            <Typography color="textPrimary">Contact Us</Typography>
        </Breadcrumbs>
        <Divider />       
        
        <Container className="contact_cont">
            <h2 className="contact_title">Say Hello !!!</h2>
            <p className="about_para">
             Have something to say? Order status inquiry ? Can't find the answer you are looking for? <br/>
             Feel free to reach out to us.
            </p>
        </Container>
        <Container   className="contact_cont" style={{backgroundColor:'#f95957'}}>

                <p className="contact_item_P"><i class="fas fa-map-marker-alt contact_icon "></i> 25/M1, St Anthony’s Mawatha, Colombo 3, Sri Lanka</p>
                <p className="contact_item_P"><i class="fas fa-phone-alt  contact_icon"></i> +94 71 7 947 126</p>
                <p className="contact_item_P"><i class="fas fa-envelope  contact_icon"></i> peacotclothing@gmail.com</p>


        </Container>
        </>
    )
}

export default ContactUs;
