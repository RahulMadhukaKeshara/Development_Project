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
     let userID;
     let userFname;


    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">

            <Navbar.Brand className="navbar-logo" href="/">Peacot</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

            <Navbar.Collapse id="responsive-navbar-nav">

                {
                  jwt ?
                  (
                    type = jwtDecode(jwt).user_Type,
                    userID = jwtDecode(jwt)._id,
                    userFname = jwtDecode(jwt).user_Fname,
                    console.log(type),
                    type === "Customer" ? 
                    (
                      <>
                      <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                      </Form>
                      <Nav className="navbar-links mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/all-items">All Items</Nav.Link>
                        <NavDropdown title="Categories" id="collasible-nav-dropdown">
                            {
                                productCategories.map(productCategories =>
                                    
                                    <NavDropdown.Item key={productCategories.product_category_Name} href={"/display-items/" + productCategories._id} >{productCategories.product_category_Name}</NavDropdown.Item>
                                
                                )
                            }
                        </NavDropdown>
                     </Nav>
                      <Nav className="">
                      <IconButton className="icon_btn" aria-label="Go to Cart" href={"/cart/" + userID}>
                        <ShoppingCartRoundedIcon />
                      </IconButton>
                      <NavDropdown title={<i class="fas fa-user-circle" >{"  " + userFname}</i>} id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href={"/user-account/" + userID}>Account Details</NavDropdown.Item>
                            <NavDropdown.Item href={"/customer-orders/" + userID}>My Orders</NavDropdown.Item>
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>                   
                      </NavDropdown>
                      <Button className="navbar-btn" onClick={logOut}>Logout</Button>
                      </Nav>
                      </>                    
                    ):
                    (type === "Admin" ? 
                    (
                      <>
                     <Nav className="navbar-links mr-auto ">
                        <Nav.Link className="delNavLinks" href="/deliveryStaff-main-page">Home</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/users">User</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/products">Products</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/product-categories">Product Categories</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/owner-view-orders">Orders</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/suppliers">Suppliers</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/generate-reports">Reports</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/dashboard">Dashboard</Nav.Link>
                     </Nav>
                      <Nav className="">
                      <NavDropdown title={<i class="fas fa-user-circle" >{"  " + userFname}</i>} id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href={"/user-account/" + userID}>Account Details</NavDropdown.Item>
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>                   
                      </NavDropdown>
                      <Button className="navbar-btn" onClick={logOut}>Logout</Button>
                      </Nav>
                      </>                
                    ):
                    (type === "Delivery Staff" ? 
                    (
                      <>
                     <Nav className="navbar-links mr-auto ">
                        <Nav.Link className="delNavLinks" href="/deliveryStaff-main-page">Home</Nav.Link>
                        <Nav.Link className="delNavLinks" href={"/newly-assigned-deliveries/" + userID}>Newly Assigned Deliveries</Nav.Link>
                        <Nav.Link className="delNavLinks" href={"/newly-assigned-deliveries/" + userID}>Delivery History</Nav.Link>
                     </Nav>
                      <Nav className="">
                      <NavDropdown title={<i class="fas fa-user-circle" >{"  " + userFname}</i>} id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href={"/user-account/" + userID}>Account Details</NavDropdown.Item>
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>                   
                      </NavDropdown>
                      <Button className="navbar-btn" onClick={logOut}>Logout</Button>
                      </Nav>  
                      </>                
                    ):
                    ("")
                    )
                    )                                         
                  ):
                  (
                  <>
                      <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                      </Form>
                      <Nav className="navbar-links mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/all-items">All Items</Nav.Link>
                        <NavDropdown title="Categories" id="collasible-nav-dropdown">
                            {
                                productCategories.map(productCategories =>
                                    
                                    <NavDropdown.Item key={productCategories.product_category_Name} href={"/display-items/" + productCategories._id} >{productCategories.product_category_Name}</NavDropdown.Item>
                                
                                )
                            }
                        </NavDropdown>
                     </Nav>
                  <Nav className="">
                    <Button className="navbar-btn" href="/sign-up">Sign Up</Button>
                    <Button className="navbar-btn" href="/login">Login</Button>
                  </Nav>
                  </>                     
                  )

                }




            </Navbar.Collapse>

        </Navbar>



    )
}

export default NavigationBar;
