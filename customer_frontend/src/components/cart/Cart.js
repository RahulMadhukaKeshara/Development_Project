import React , {useState , useEffect} from 'react';
import {Container,Row ,Col, Button,Media} from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import './Cart.css'
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';


function Cart() {

    const [cartItems , setCartItems] = useState({});
    const [deliveryCharges , setDeliveryCharges] = useState([]);
    const [selectedDistrict , setSelectedDistrict] = useState("");
    const [subTotal , setSubTotal] = useState(0);
    const [delCharge , setDelCharge] = useState(0);
    const [totalDiscount , setTotalDiscount] = useState(0);
    const [numOfItems , setNumOfItems] = useState("")

    let params = useParams();

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

      const getDeliveryChargeData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/deliveryCharges/"
          );
          // console.log(data.data);
          setDeliveryCharges(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getCartItemData();
        getDeliveryChargeData();
        calcSubTot();
      }, []);

      function handleDelete(itemID , userID){
        console.log(itemID)
        console.log(userID)
        Axios.post(
            `http://localhost:5000/cart/remove/`, {itemID , userID}
          )
           .then(res => {
      
             console.log(res.data)
                    
             if(res.data === "Item Deleted"){
               Swal.fire({
                 icon: 'success',
                 title: 'Item Deleted!',
               })
               getCartItemData()
               calcSubTot();
      
      
             }else {
               Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                   text: 'Something went wrong!',
                 })
           }
           })
      }

      function handleDistrict(e){

        let newData = {...selectedDistrict};
        newData = e.target.value;
        setSelectedDistrict(newData);
        handleDelCharges(newData);


      }

      const calcSubTot = async () => {
        let sub = 0;
        let discount = 0;
        try {
          const data = await Axios.get(
            "http://localhost:5000/cart/"+ params.id
          );
           data.data.cart_Items.forEach((element) => {
             sub = sub + parseInt((element.quantity)*(element.unit_Price));
             discount = discount + parseInt((element.quantity)*(element.unit_Price)*(element.product.product_Discount/100));
           });
           setNumOfItems(data.data.cart_Items.length)
           setSubTotal(sub);
           setTotalDiscount(discount);
        } catch (e) {
          console.log(e);
        }
      };

      const handleDelCharges = async (District) => {
        try {
          const data = await Axios.post(
            "http://localhost:5000/deliveryCharges/charges", {district : District}
          );
          setDelCharge(parseInt(data.data.delivery_charge))
        } catch (e) {
          console.log(e);
        }
      };

      function handleErrCheckout(){
        Swal.fire({
          icon: 'error',
          title: 'No Items to Checkout',
          text: 'Add some items to the cart before checkout!',
          footer: '<a href="/all-items">Continue Shopping</a>'
        })
      }




    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Typography color="textPrimary">My Cart</Typography>
        </Breadcrumbs>
        <Divider />
           <h1 className="cart_title">My Cart</h1>
           <Container  fluid className='cart_container'>
            <Row>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Col  fluid className='item_container'>
            {
              cartItems.cart_Items && cartItems.cart_Items.length > 0 ? 
              (
                <>
                {
                  cartItems.cart_Items && cartItems.cart_Items.map(item =>

                  <>
                  <Row className="individual_item_div">
                  <div  className='item_col1'>
                      <Media >
                          <img 
                                  className="mr-3 item_image"
                                  src={"http://localhost:5000/products/photo/" + item.product._id}
                                  alt="Generic placeholder"
                              />                      
                      </Media>
                  </div>
                  <div  className='item_col2'>
                      <h6>{item.product.product_Name}</h6>
                      <h6>Price : LKR {item.unit_Price}</h6>
                      <h6 className='gg'>color : {item.color}</h6>
                      <h6 className='gg'>Size : {item.size}</h6>    
                      <h6 className='gg'>Qty : {item.quantity}</h6>                  
                  </div>
                  <div  className='item_col3'>
                  <IconButton aria-label="Edit">
                          <EditIcon/>
                  </IconButton>
                  <IconButton aria-label="Edit" onClick={()=>handleDelete(item._id , params.id )}>
                          <DeleteIcon/>
                  </IconButton>
                  </div>
                  </Row>
                  <Divider/>
                  </>
                  
                  )
                                                             
              }
              </>
              ):
              (<h4 className="cart_noItem_text">No Items to show in the Cart</h4>)
            }


            </Col>
            </Col>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col2'>
            <Container  className='summury_container'>
                
                    <h3 className='col2_title'>Cart Summary</h3>

                    <div className='col2_div'>
                        <h5>Sub Total( {numOfItems} items) : LKR {subTotal}</h5>
                        {
                            
                            cartItems.cart_Items && cartItems.cart_Items.map(item => {     
                          
                            return(<li>{item.product.product_Name}  X  {item.quantity} : LKR {(item.quantity)*(item.unit_Price)}</li>)

                            }
                            
                            )
                        }
                    </div>
                    <div className='col2_div'>
                        <h5>Total Discount : LKR {totalDiscount}</h5>
                    </div>
                    <div className='col2_div'>
                        <h6>Select District to see the Delivery Charges :</h6>
                        <select value={selectedDistrict} onChange={(e)=> handleDistrict(e)}>
                            <option>Choose...</option>
                        {
                          deliveryCharges && deliveryCharges.map(item => 
                              <option>{item.district}</option>
                          )
                        }
                                                
                        </select>
                         <h5>Delivery Charges : LKR {delCharge} </h5>
                    </div>
                    <div className='col2_div'>
                        <h3>Grand Total : LKR {subTotal - totalDiscount + delCharge }</h3>
                    </div>
                    <div className='col2_div  summry_btns'>             
                        <Button className='summury_btn1' href='/all-items'>Continue Shopping</Button>
                        {
                          cartItems.cart_Items && cartItems.cart_Items.length > 0 ? 
                          (<Button className='summury_btn2' href={'/checkout/' + params.id}>Checkout</Button>):
                          (<Button className='summury_btn2' onClick={handleErrCheckout}>Checkout</Button>)
                        }
                        
                    </div>
            </Container>
            </Col>

            </Row>

           </Container>
        </>
    )
}

export default Cart;


