import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import '../footer/Footer.css'


const Footer = () => {
  return (

    <MDBFooter  className="font-small pt-4 mt-4 footer_container">
      <MDBContainer fluid className="text-center text-md-left ">
        <MDBRow>
          <MDBCol md="4" className='footer_col_1'>
            <h5 className="title footer_title">Peacot</h5>
            <p>
              Peace & Cotton
            </p>
          </MDBCol>
          <MDBCol md="4" className='footer_col_2'>
            <h5 className="title">What's In Store ?</h5>
            <ul>
              <li className="list-unstyled">
                <a className="footer_lists" href="#!">Men's Collection</a>
              </li>
              <li className="list-unstyled">
                <a className="footer_lists" href="#!">Women's Collection</a>
              </li>
              <li className="list-unstyled">
                <a className="footer_lists" href="#!">Couple Collection</a>
              </li>

            </ul>
          </MDBCol>
          <MDBCol md="4" className='footer_col_3'>
            <h5 className="title"> </h5>
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
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3 ">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: Peacot
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;