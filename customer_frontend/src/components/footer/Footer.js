import React from "react";
import '../footer/Footer.css'
import footLogo from '../../images/logoFooter.png';
import {Container, Row , Col} from 'react-bootstrap';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from "@material-ui/core";

const Footer = () => {
  return (

    <Container  fluid className="font-small pt-4 mt-4 footer_container">
      <Row fluid className="text-center text-md-left footer_inside_container">
      
          <Col sm={4} md={4} lg={4} className='footer_col_1'>
            <Link href='/'>
            <img className="img_logo_footer" alt="logo" src={footLogo} />
            </Link>
          </Col>
          <Col sm={4} md={4} lg={4} className='footer_col_2'>
          <ul>
              <li className="list-unstyled">
                <a className="footer_lists" href="#!">Contact Us</a>
              </li>
              <li className="list-unstyled">
                <a className="footer_lists" href="#!">About Us</a>
              </li>
              <li className="list-unstyled">
                <a className="footer_lists" href="#!">Return Policy</a>
              </li>
              <li className="list-unstyled">
                <a className="footer_lists" href="#!">Terms and Conditions</a>
              </li>
            </ul> 
          </Col>
          <Col sm={4} md={4} lg={4} className='footer_col_3'>
            <Link  href="https://www.facebook.com/peacotwear/">
              <FacebookIcon href="https://www.facebook.com/peacotwear/" className='icon_footer'/>
            </Link >
            <Link href="https://www.instagram.com/peacot_online/">
              <InstagramIcon className='icon_footer'/>
            </Link >
          </Col>
      </Row>
      <div className="footerdate">
          &copy; {new Date().getFullYear()} Copyright: Peacot
      </div>
    </Container>
  );
}

export default Footer;