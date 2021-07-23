import React,{useState,useEffect} from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import '../navigationBar/NavigationBar.css';
import Axios from 'axios';
import jwtDecode from "jwt-decode";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import {useHistory} from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import imgeka from '../../images/logo.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

function NavigationBar() {

    const history = useHistory();
    const [productCategories, setProductCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [cart, setCart] = useState(0);
    const jwt = localStorage.getItem("token");
    let type;
    let userID;
    let userFname;
    
    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(0),
        },
      },
    }));

    const classes = useStyles();


    const getCartData = async () => {
      if(jwt){
        let cartUser = jwtDecode(jwt)._id;
      try {
        const data = await Axios.get(
          "http://localhost:5000/cart/" + cartUser
        );
        console.log("000000000000000000000000",data.data);
        setCart(data.data.cart_Items.length);

      } catch (e) {
        console.log(e);
      }
      }

    };

     const getProductCategoryData = async () => {
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

     const getProductData = async () => {
      try {
        const data = await Axios.get(
          "http://localhost:5000/products/"
        );
        console.log(data.data);
        setProducts(data.data);

      } catch (e) {
        console.log(e);
      }
    };
   
     useEffect(() => {
      getProductCategoryData();
      getProductData();
      getCartData();
     }, []);



     function logOut(){
       localStorage.clear();
       //history.push('/')
       window.location = '/'
     }


     function handleFilter(e){
      const searchWord = e.target.value;
      setWordEntered(searchWord);
      const newFilter = products.filter((value => {
        return value.product_Name.toLowerCase().includes(searchWord.toLowerCase());
      }));

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
      
     }

     function clearInputs(){
       setFilteredData([]);
       setWordEntered("")
     }


    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">

            <Navbar.Brand className="navbar-logo" href="/"><img alt="" src={`${imgeka}`}/></Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ham_icon"/>

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
                      <div className="search" >
                        <div className="searchInputs">
                            <input type="text" placeholder="Search Items...." value={wordEntered} onChange={(e)=>handleFilter(e)} />
                            <div className="searchIcon">
                            {
                              wordEntered === "" ? (<SearchIcon/>):(<CloseIcon onClick={clearInputs}/>)
                            }                          
                            </div>
                        </div>
                        { filteredData.length !== 0 &&(
                          <div className="dataResult">
                          {
                          filteredData.slice(0,10).map((value,key)=>{
                             return (
                             <a className="dataItem" href={"/product-details/"+value._id}>
                                <p>{value.product_Name}</p>
                              </a>
                              )
                          })
                          }
                          </div>
                        )

                        }

                      </div>
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
                      <Badge color="secondary" badgeContent={cart} showZero className="icon_btn mt-2 mr-3" aria-label="Go to Cart" href={"/cart/" + userID}>
                        <ShoppingCartRoundedIcon />
                      </Badge>
                      {/* <IconButton className="icon_btn" aria-label="Go to Cart" href={"/cart/" + userID}>
                        <ShoppingCartRoundedIcon />
                      </IconButton> */}
                      <NavDropdown title={<i class="fas fa-user-circle" >{"  " + userFname}</i>} id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href={"/user-account/" + userID}>Account Details</NavDropdown.Item>
                            <NavDropdown.Item href={"/customer-orders/" + userID}>My Orders</NavDropdown.Item>
                            <NavDropdown.Item href={"/passwordReset/" + userID}>Change Password</NavDropdown.Item>
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
                        <Nav.Link className="delNavLinks" href="/owner-main-page">Home</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/users">User</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/products">Products</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/product-categories">Product Categories</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/owner-view-orders">Orders</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/suppliers">Suppliers</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/generate-reports">Reports</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link className="delNavLinks" href="/warnings">Inventory Warnings</Nav.Link>
                     </Nav>
                      <Nav className="">
                      <NavDropdown title={<i class="fas fa-user-circle" >{"  " + userFname}</i>} id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href={"/user-account/" + userID}>Account Details</NavDropdown.Item>
                            <NavDropdown.Item href={"/passwordReset/" + userID}>Change Password</NavDropdown.Item>
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
                        <Nav.Link className="delNavLinks" href={"/newly-assigned-deliveries/" + userID}>Assigned Deliveries</Nav.Link>
                        <Nav.Link className="delNavLinks" href={"/deliveryHistory/" + userID}>Delivery History</Nav.Link>
                     </Nav>
                      <Nav className="">
                      <NavDropdown title={<i class="fas fa-user-circle" >{"  " + userFname}</i>} id="collasible-nav-dropdown">                   
                            <NavDropdown.Item href={"/user-account/" + userID}>Account Details</NavDropdown.Item>
                            <NavDropdown.Item href={"/passwordReset/" + userID}>Change Password</NavDropdown.Item>
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
                      <div className="search" >
                        <div className="searchInputs">
                            <input type="text" placeholder="Search Items...." value={wordEntered} onChange={(e)=>handleFilter(e)} />
                            <div className="searchIcon">
                            {
                              wordEntered === "" ? (<SearchIcon/>):(<CloseIcon onClick={clearInputs}/>)
                            }                          
                            </div>
                        </div>
                        { filteredData.length !== 0 &&(
                          <div className="dataResult">
                          {
                          filteredData.slice(0,10).map((value,key)=>{
                             return (
                             <a className="dataItem" href={"/product-details/"+value._id}>
                                <p>{value.product_Name}</p>
                              </a>
                              )
                          })
                          }
                          </div>
                        )

                        }

                      </div>
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
