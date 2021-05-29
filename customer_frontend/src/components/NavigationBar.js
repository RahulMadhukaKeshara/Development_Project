import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import '../components/NavigationBar.css'

function NavigationBar() {
    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">

            <Navbar.Brand className="navbar-logo" href="/">Peacot</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
            <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                <Nav className="navbar-links mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/add-product-categories">All Items</Nav.Link>
                    <NavDropdown title="Categories" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/owner-main-page">Men</NavDropdown.Item>
                        <NavDropdown.Item href="/products">Women</NavDropdown.Item>
                        <NavDropdown.Item href="/products">Couple</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
                <Nav className="">
                    <Button className="navbar-btn" href="/sign-up">Sign Up</Button>
                    <Button className="navbar-btn" href="/login">Login</Button>
                </Nav>

            </Navbar.Collapse>

        </Navbar>



    )
}

export default NavigationBar;
