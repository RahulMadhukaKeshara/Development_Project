import React , {useState , useEffect} from 'react';
import '../checkout/Checkout.css'
import {Container,Row ,Col, Button , Form} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router';
import Axios from 'axios';


function Checkout() {

    let params = useParams();
    const [cartItems , setCartItems] = useState({});
    const [userData , setUserData] = useState({});
    const [deliveryCharges , setDeliveryCharges] = useState([]);

    const [subTotal , setSubTotal] = useState(0);
    const [totalDiscount , setTotalDiscount] = useState(0);
    const [numOfItems , setNumOfItems] = useState("")

    const [selectedDistrict , setSelectedDistrict] = useState("");
    const [delCharge , setDelCharge] = useState(0);

    const [isChecked , setIsChecked] = useState(false)

    const [payMethod , setPayMethod] = useState("");
    
    const getUserData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/users/"+ params.id
          );
          // console.log(data.data);
          setUserData(data.data);

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
            setDelCharge(parseInt(data.data.delivery_charge))
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

         let newData = {...selectedDistrict};
         //console.log(newData)
         newData = e.target.value;
         //console.log(newData)
         setSelectedDistrict(newData);
         handleDelCharges(newData);

      }
    function handleChange(e) {

    }

    function handleSubmit(e) {

    }

    function handlePay(e){
      let pay = {...payMethod};
      pay = e.target.value;
      console.log(pay)
      setPayMethod(pay)
    }

    function handleCheck(e){
        let check = isChecked;
        //console.log(check)
        check = !check;
        //console.log(check)
        setIsChecked(check)
        if (check === true) {
          let newData = {...selectedDistrict};
          newData = userData.user_District;
          setSelectedDistrict(newData);
          handleDelCharges(newData)
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

                <h4 className="add_product_category_sub_title">Personal Details</h4>
                <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Fname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="First Name"/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Lname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Last Name"/>
                    </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                <Col sm={12} lg={6} md={6}>
                <Form.Group  controlId="user_Contact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Contact Number" />
                </Form.Group>
                </Col>
                </Form.Row>
                <Form.Group controlId="checkout_check">
                    <Form.Check type="checkbox" label="Use Billing Address as the Shipping Address" onClick={(e) => handleCheck(e)}/>
                </Form.Group>
               
                {/* <h6 className="add_product_category_sub_title">Use Billing Address as the Shipping Address</h6> */}
                <Form.Row>
                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Address_1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Address Line 1" value={isChecked === true ? (userData.user_Address_1):("")}/>
                    </Form.Group>
                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Address_2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Address Line 2" value={isChecked === true ? (userData.user_Address_2):("")}/>
                    </Form.Group>
                    </Col>
                </Form.Row>   
                <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Address_3">
                        <Form.Label>Address Line 3</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Address Line 3" value={isChecked === true ? (userData.user_Address_3):("")}/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_District">
                        <Form.Label>District</Form.Label>
                        <Form.Control as="select" onChange={(e) => handleDistrict(e)}  value={selectedDistrict}>
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
                    <Form.Group  controlId="user_Postal">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Postal Code" value={isChecked === true ? (userData.user_Postal):("")}/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="#">
                        <Form.Label>Delivery Instructions</Form.Label>
                        <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  type="text" placeholder="Delivery Instructions..."  />
                    </Form.Group>
                    </Col>
                </Form.Row>
                <h4 className="add_product_category_sub_title">Payment Details</h4>
                <Col sm={12} lg={12} md={12}>
                        <Form.Group  controlId="user_Type" style={{display:'flex'}}>
                            <Form.Label>Select a Payment Method :</Form.Label>
                            <Form.Control as="select" onChange={(e) => handlePay(e)} value={payMethod}>
                                    <option>Choose...</option>
                                    <option>Online Payment</option>
                                    <option>Cash On Delivery</option>
                            </Form.Control>
                        </Form.Group>
                </Col>   
                <div className='add_product_category_form_btns'>
                  {
                    payMethod === "Cash On Delivery" ? 
                    (<Button className='add_product_category_form_btn1' type="submit">Place Order</Button>):

                    (payMethod === "Online Payment" ? 
                    (<Button className='add_product_category_form_btn1' type="submit">Proceed to Pay</Button>):
                    (
                      ""
                      // <>
                      // <Button className='add_product_category_form_btn1' type="submit" disabled>Proceed to Pay</Button>
                      // <Button className='add_product_category_form_btn1' type="submit" disabled>Place Order</Button> 
                      // </>
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
