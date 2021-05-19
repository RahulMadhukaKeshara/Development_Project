import React from 'react';
import {Navbar , Nav ,  NavDropdown  , Button} from 'react-bootstrap';
import '../components/NavigationBar.css'

function NavigationBar() {
    return (


        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="navbar">

            <Navbar.Brand className="navbar-logo" href="/">Peacot</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav  className="mr-auto">
                    <Nav.Link  href="/">Home</Nav.Link>
                    <Nav.Link  href="/products">All Items</Nav.Link>
                    <NavDropdown  title="Categories" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/products">Men</NavDropdown.Item>
                        <NavDropdown.Item href="/products">Women</NavDropdown.Item>
                        <NavDropdown.Item href="/products">Couple</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Nav>
                    <Button className="navbar-btn" href="/sign-up">Sign Up</Button>
                    <Button className="navbar-btn" href="/login">Login</Button>
                </Nav>

            </Navbar.Collapse>

        </Navbar>



    )
}

export default NavigationBar;
