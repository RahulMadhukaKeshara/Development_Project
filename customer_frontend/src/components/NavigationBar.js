import React,{useState,useEffect} from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import '../components/NavigationBar.css';
import Axios from 'axios';

function NavigationBar() {


    const [productCategories, setProductCategories] = useState([]);
   
     const getProductData = async () => {
       try {
         const data = await Axios.get(
           "http://localhost:5000/productCategories/"
         );
         console.log(data.data);
         setProductCategories(data.data);

       } catch (e) {
         console.log(e);
       }
     };
   
     useEffect(() => {
       getProductData();
     }, []);

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
                    <Nav.Link href="/display-items">All Items</Nav.Link>
                    <NavDropdown title="Categories" id="collasible-nav-dropdown">
                        {
                            productCategories.map(productCategories =>
                                
                                <NavDropdown.Item key={productCategories.product_category_Name} href="/display-items">{productCategories.product_category_Name}</NavDropdown.Item>
                            
                            )
                        }
                        
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
