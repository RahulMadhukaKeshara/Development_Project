import React,{useState,useEffect} from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import '../navigationBar/NavigationBar.css';
import Axios from 'axios';
import jwtDecode from "jwt-decode";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import {useHistory} from 'react-router-dom';


function NavigationBar() {

  const history = useHistory();
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

     function logOut(){
       localStorage.clear();
       //history.push('/')
       window.location = '/'
     }
     const jwt = localStorage.getItem("token");
     let type;


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

                {
                  jwt ?
                  (
                    type = jwtDecode(jwt).user_Type,
                    console.log(type),
                    type === "Customer" ? 
                    (
                      <Nav className="">
                      <IconButton className="icon_btn" aria-label="Go to Cart">
                        <ShoppingCartRoundedIcon />
                      </IconButton>
                      <NavDropdown title={<i class="fas fa-user-circle"></i>} id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href="/#">Profile Details</NavDropdown.Item>
                            <NavDropdown.Item href="/#">My Orders</NavDropdown.Item>
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>                   
                      </NavDropdown>
                      <Button className="navbar-btn" onClick={logOut}>Logout</Button>
                      </Nav>                    
                    ):
                    (type === "Admin" ? 
                    (
                      <Nav className="">
                      <NavDropdown title="Profile" id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href="/#">Profile Details</NavDropdown.Item>
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>                   
                      </NavDropdown>
                      <Button className="navbar-btn" onClick={logOut}>Logout</Button>
                      </Nav>                
                    ):
                    (type === "Delivery Staff" ? 
                    (
                      <Nav className="">
                      <NavDropdown title="Profile" id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href="/#">Profile Details</NavDropdown.Item>
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>                   
                      </NavDropdown>
                      <Button className="navbar-btn" onClick={logOut}>Logout</Button>
                      </Nav>                  
                    ):
                    ("")
                    )
                    )                                         
                  ):
                  (
                  <Nav className="">
                    <Button className="navbar-btn" href="/sign-up">Sign Up</Button>
                    <Button className="navbar-btn" href="/login">Login</Button>
                  </Nav>                     
                  )

                }




            </Navbar.Collapse>

        </Navbar>



    )
}

export default NavigationBar;
