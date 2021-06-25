import React , {useState , useEffect} from 'react';
import {Container,Row ,Col, Button,Media} from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import './Cart.css'
import Divider from '@material-ui/core/Divider';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Cart() {

    const [cartItems , setCartItems] = useState({});
    let params = useParams();
    const history = useHistory();

    const [subTotal , setSubTotal] = useState("0");

    const getCartItemData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/cart/"+ params.id
          );
          console.log(data.data);
          setCartItems(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getCartItemData();
    
      }, []);

      function handleDelete(itemID , userID){
        console.log(itemID)
        console.log(userID)
        Axios.post(
            `http://localhost:5000/cart/`, {itemID , userID}
          )
           .then(res => {
      
             console.log(res.data)
                    
             if(res.data === "Item Deleted"){
               getCartItemData()
               Swal.fire({
                 icon: 'success',
                 title: 'Item Deleted!',
               })
      
      
             }else {
               Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                   text: 'Something went wrong!',
                 })
           }
           })
      }


    return (
        <>
           <h1 className="cart_title">My Cart</h1>
           <Container  fluid className='cart_container'>
            <Row>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Container  className='item_container'>
            <div className="individual_item_div">
            {
                cartItems.cart_Items && cartItems.cart_Items.map(item =>
                    
                <>
                
                <div className="individual_item">
                <Col sm={12} lg={3} md={3} className='item_col1'>
                    <Media >
                        <img 
                                className="mr-3 item_image"
                                src={"http://localhost:5000/products/photo/" + item.product._id}
                                alt="Generic placeholder"
                            />                      
                    </Media>
                </Col>
                <Col sm={12} lg={6} md={6} className='item_col2'>
                    <h6>{item.product.product_Name}</h6>
                    <h6>Price : LKR {item.unit_Price}</h6>
                    <h6 className='gg'>color : {item.color}</h6>
                    <h6 className='gg'>Size : {item.size}</h6>    
                    <h6 className='gg'>Qty : {item.quantity}</h6>                  
                </Col>
                <Col sm={12} lg={3} md={3} className='item_col3'>
                <IconButton aria-label="Edit">
                        <EditIcon/>
                </IconButton>
                <IconButton aria-label="Edit" onClick={()=>handleDelete(item._id , params.id )}>
                        <DeleteIcon/>
                </IconButton>
                </Col>
                </div>
                <Divider />

                </>
                
                )
                                
                            
                            
            }

            </div>
            </Container>
            </Col>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col2'>
            <Container  className='summury_container'>
                
                    <h3 className='col2_title'>Cart Summary</h3>

                    <div className='col2_div'>
                        <h5>Sub Total(4 items) : LKR {subTotal}</h5>
                        {
                            cartItems.cart_Items && cartItems.cart_Items.map(item =>

                                <li>{item.product.product_Name}  X  {item.quantity} : LKR {(item.quantity)*(item.unit_Price)}</li>

                            )
                        }
                    </div>
                    <div className='col2_div'>
                        <h5>Total Discount : LKR 260</h5>
                    </div>
                    <div className='col2_div'>
                        <h6>Select District for the Delivery Charges :</h6>
                        <select>
                            <option>Choose...</option>
                            <option>Kadawatha</option>
                            <option>Gampaha</option>
                        </select>
                        <h5>Delivery Charges : LKR 150</h5>
                    </div>
                    <div className='col2_div'>
                        <h3>Grand Total : LKR 2290</h3>
                    </div>
                    <div className='col2_div  summry_btns'>             
                        <Button className='summury_btn1' href='#'>Continue Shopping</Button>
                        <Button className='summury_btn2' type="submit">Checkout</Button>
                    </div>
            </Container>
            </Col>

            </Row>

           </Container>
        </>
    )
}

export default Cart;
