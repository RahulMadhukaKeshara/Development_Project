import React , {useState , useEffect} from 'react';
import '../checkout/Checkout.css'
import {Container,Row ,Col, Button , Form} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import PaymentModal from '../checkout/PaymentModel';
// import PayModal from '../checkout/PayModel';


function Checkout() {

    const history = useHistory();
    let params = useParams();
    const url = "http://localhost:5000/orders/add";
    const [order , setOrder] = useState({

      order_User : "",
      order_Items: [{
          product : "", color : "", size : "", quantity : "", unit_Price : "",
      }],
  
      payment_Method:"",
      order_Status: "New",
      order_Total : "",
      order_Placed_Date :"", 
      expected_Delivery_Date : "",
      actual_Delivery_Date : "",
      delivery_Fname : "",
      delivery_Lname: "",
      delivery_Contact: "",
      delivery_Address_1: "",
      delivery_Address_2: "",
      delivery_Address_3: "",
      delivery_District: "",
      delivery_Postal: "",
      delivery_Instructions:"",
    })
    const [cartItems , setCartItems] = useState({});
    const [userData , setUserData] = useState({});
    const [deliveryCharges , setDeliveryCharges] = useState([]);

    const [subTotal , setSubTotal] = useState(0);
    const [totalDiscount , setTotalDiscount] = useState(0);
    const [numOfItems , setNumOfItems] = useState("")

    const [selectedDistrict , setSelectedDistrict] = useState("");
    const [delCharge , setDelCharge] = useState(0);
    const [plusDate , setPlusDate] = useState(0);

    const [isChecked , setIsChecked] = useState(false)

    
    const getUserData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/users/"+ params.id
          );
          //console.log(data.data.user_District);
          setUserData(data.data);
          // setSelectedDistrict(data.data.user_District);
          // handleDelCharges(data.data.user_District);

        } catch (e) {
          console.log(e);
        }
      };
   
    const getCartItemData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/cart/"+ params.id
          );
          // console.log(data.data);
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
        
        if (District !== "") {
          try {
            const data = await Axios.post(
              "http://localhost:5000/deliveryCharges/charges", {district : District}
            );
            //console.log(data.data.delivery_charge)
            setDelCharge(parseInt(data.data.delivery_charge));
            setPlusDate(parseInt(data.data.expected_range));
            
          } catch (e) {
            console.log(e);
          }  
        } else {
          setDelCharge(0)
        }
      };

      useEffect(() => {
        getUserData();
        getCartItemData();
        getDeliveryChargeData();
        calcSubTot();
      }, []);

      function handleDistrict(e){

        const newOrder = {...order};
         let newData = {...selectedDistrict};
         //console.log(newData)
         newData = e.target.value;
         //console.log(newData)
         setSelectedDistrict(newData);
         handleDelCharges(newData);
         newOrder.delivery_District = newData;
         setOrder(newOrder)

      }
    function handleChange(e) {
      const newOrder = {...order};
      newOrder[e.target.id] = e.target.value;
      setOrder(newOrder)
      console.log(newOrder)
    }

    function handleCheck(e){
        let check = isChecked;
        console.log(check)
        check = !check;
        console.log(check)
        setIsChecked(check)
        if (check === true) {
          const newOrder = {...order};
          let newData = {...selectedDistrict};
          newData = userData.user_District;
          setSelectedDistrict(newData);
          handleDelCharges(newData)

          newOrder.delivery_Address_1 = userData.user_Address_1;
          newOrder.delivery_Address_2 = userData.user_Address_2;
          newOrder.delivery_Address_3 = userData.user_Address_3;
          newOrder.delivery_Postal = userData.user_Postal;
          newOrder.delivery_District = newData;
          setOrder(newOrder);
          console.log("changes",newOrder)
        }
    }

    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;

    function handleSubmit(e) {
      e.preventDefault();
      const d = new Date();
      const date = d.toLocaleDateString();

      const s = new Date();
      s.setDate(s.getDate()+ plusDate);

      const setOrderID = d.getDate() + order.delivery_Contact + d.getHours() + d.getMinutes();

       let dataSet = {
         order_User : userID,
         order_ID : setOrderID,
         order_Items: cartItems.cart_Items,
         payment_Method: order.payment_Method,
         order_Status: order.order_Status,
         order_Total : subTotal - totalDiscount + delCharge,
         order_Placed_Date : date, 
         expected_Delivery_Date : s.toLocaleDateString(),
         actual_Delivery_Date : order.actual_Delivery_Date,
         delivery_Fname : order.delivery_Fname,
         delivery_Lname: order.delivery_Lname,
         delivery_Contact: order.delivery_Contact,
         delivery_Address_1: order.delivery_Address_1,
         delivery_Address_2: order.delivery_Address_2,
         delivery_Address_3: order.delivery_Address_3,
         delivery_District: order.delivery_District,
         delivery_Postal: order.delivery_Postal,
         delivery_Instructions: order.delivery_Instructions,
       }
       console.log(dataSet);
       try {
        Axios.post(
          url,
          dataSet,

        ).then((res) => {
            console.log(res.data)
            if (res.data === "Order Placed!") {
              Swal.fire({
                  icon: 'success',
                  title: 'Order Placed!',
                }).then(function() {
                  window.location = `/customer-orders/'+ ${userID}`;
              });
                // history.push('/customer-orders/'+ userID);

          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',

                })
          }
          }
        );
      } catch (err) {
        console.log(err.res.data)
      }

    }

    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Link color="inherit" href="/cart" >My Cart</Link>
            <Typography color="textPrimary">Checkout</Typography>
        </Breadcrumbs>
        <Divider />
           <h1 className="checkout_title">Checkout </h1>

           <Container  fluid className='cart_container'>
            <Row>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Container  className='checkout_item_container'>

            <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)}>
            

                <h4 className="add_product_category_sub_title" style={{marginBottom:'5px'}}>Shipping Details</h4>
                <span style={{color:'red'}}> <i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>  <em>required</em></span>
                <Form.Row style={{marginTop:'15px'}}>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="delivery_Fname">
                        <Form.Label>First Name (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                        <Form.Control required className='add_product_category_form_input' type="text" value={order.delivery_Fname} onChange={(e) => handleChange(e)} placeholder="First Name"/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="delivery_Lname">
                        <Form.Label>Last Name (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                        <Form.Control required className='add_product_category_form_input' type="text" value={order.delivery_Lname} onChange={(e) => handleChange(e)} placeholder="Last Name"/>
                    </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                <Col sm={12} lg={6} md={6}>
                <Form.Group  controlId="delivery_Contact">
                    <Form.Label>Contact Number (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                    <Form.Control required className='add_product_category_form_input' type="text" value={order.delivery_Contact} onChange={(e) => handleChange(e)} placeholder="Contact Number" />
                </Form.Group>
                </Col>
                </Form.Row>
                <Form.Group controlId="checkout_check">
                    <Form.Check type="checkbox" label="Use Billing Address as the Shipping Address" onClick={(e) => handleCheck(e)}/>
                </Form.Group>
               
                <Form.Row>
                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="delivery_Address_1">
                        <Form.Label>Address Line 1 (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                        <Form.Control required className='add_product_category_form_input' type="text"  onChange={(e) => handleChange(e)} placeholder="Address Line 1" value={order.delivery_Address_1}/>
                    </Form.Group>
                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="delivery_Address_2">
                        <Form.Label>Address Line 2 (<em>optional</em>)</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Address Line 2" value={order.delivery_Address_2}/>
                    </Form.Group>
                    </Col>
                </Form.Row>   
                <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="delivery_Address_3">
                        <Form.Label>Address Line 3 (<em>optional</em>)</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text"  onChange={(e) => handleChange(e)} placeholder="Address Line 3" value={order.delivery_Address_3}/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="delivery_District">
                        <Form.Label>District (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                        <Form.Control required as="select" onChange={(e) => handleDistrict(e)}  value={selectedDistrict}>
                                    <option>Choose...</option>
                        {
                                deliveryCharges && deliveryCharges.map(item => 
                                    <option>{item.district}</option>
                                )
                        }
                            </Form.Control>
                    </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="delivery_Postal">
                        <Form.Label>Postal Code (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                        <Form.Control required className='add_product_category_form_input' type="text"  onChange={(e) => handleChange(e)} placeholder="Postal Code" value={order.delivery_Postal}/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="delivery_Instructions">
                        <Form.Label>Delivery Instructions (<em>optional</em>)</Form.Label>
                        <Form.Control as="textarea" rows={3} className='add_product_category_form_input' value={order.delivery_Instructions} onChange={(e) => handleChange(e)}  type="text" placeholder="Delivery Instructions..."  />
                    </Form.Group>
                    </Col>
                </Form.Row>
                <h4 className="add_product_category_sub_title">Payment Details (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</h4>
                <Col sm={12} lg={12} md={12}>
                        <Form.Group  controlId="payment_Method" style={{display:'flex'}}>
                            <Form.Label>Select a Payment Method :</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)} value={order.payment_Method}>
                                    <option>Choose...</option>
                                    <option>Online Payment</option>
                                    <option>Cash On Delivery</option>
                            </Form.Control>
                        </Form.Group>
                </Col>   
                <div className='add_product_category_form_btns'>
                  {
                    order.payment_Method === "Cash On Delivery" ? 
                    (<Button className='add_product_category_form_btn1' type="submit">Place Order</Button>):

                    (order.payment_Method === "Online Payment" ? 
                    (<PaymentModal orderDetails={order} orderTotal={subTotal - totalDiscount + delCharge} orderItems={cartItems.cart_Items} dateGap={plusDate} />):
                //     (   
                //     <PayModal 
                // // Use a unique value for the orderId
                // orderId={45896588}
                // name="Just For You Mom Ribbon Cake"
                // amount="4500"
                //     />):
                    (
                      ""
                    ))

                  }             
                </div>          
                </Form>
            </Container>
            </Col>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col2'>
            <Container  className='checkout_summury_container'>
                
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
                        <h5>Delivery Charges : LKR {selectedDistrict === "Choose..." ? ("0"):(delCharge)}</h5>
                    </div>
                    <div className='col2_div'>
                        <h3>Grand Total : LKR {subTotal - totalDiscount + delCharge}</h3>
                    </div>
            </Container>
            </Col>

            </Row>

           </Container>
        </>
    )
}

export default Checkout;

//<Button className='add_product_category_form_btn1' type="submit">Proceed to Pay</Button>