import React , {useState , useEffect} from 'react';
import './ViewOrderDetails.css'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import {Container,Row ,Col, Button,Media} from 'react-bootstrap';
import { useParams } from 'react-router';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import jwtDecode from "jwt-decode";

function ViewOrderDetails() {

    const history = useHistory();
    let params = useParams();
    let orderID = params.id;
    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;

    const [order , setOrder] = useState({});
    const [subTotal , setSubTotal] = useState(0);
    const [totalDiscount , setTotalDiscount] = useState(0);
    const [numOfItems , setNumOfItems] = useState("");
    const [delCharge , setDelCharge] = useState(0);

    const getOrderData = async () => {
        try {
          const data = await Axios.post(
            "http://localhost:5000/orders/orderDetails" , {orderID , userID}
          );
          console.log(data.data);
          setOrder(data.data);

        } catch (e) {
          console.log(e);
        }
      };

      const calcSubTot = async () => {
        let sub = 0;
        let discount = 0;
        try {
            const data = await Axios.post(
                "http://localhost:5000/orders/orderDetails" , {orderID , userID}
              );
             data.data.order_Items.forEach((element) => {
             sub = sub + parseInt((element.quantity)*(element.unit_Price));
             discount = discount + parseInt((element.quantity)*(element.unit_Price)*(element.product.product_Discount/100));
           });
           setNumOfItems(data.data.order_Items.length)
           setSubTotal(sub);
           setTotalDiscount(discount);
           handleDelCharges(data.data.delivery_District)
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

      useEffect(() => {
         getOrderData();
         calcSubTot();
      }, []);

    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Link color="inherit" href="/customer-orders" >My Orders</Link>
            <Typography color="textPrimary">Order Details</Typography>
        </Breadcrumbs>
        <Divider />
        <h1 className="order_detail_title">Order Details</h1>
        <Container fluid className='order_detail_container' >
        <Row>
        <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Col  fluid className='order_item_container'>
             {
                order.order_Items && order.order_Items.map(item => 
                <>
                    <Row className="order_individual_item_div">
                        <div  className='order_item_col1'>
                            <Media >
                                <img 
                                        className="mr-3 order_item_image"
                                        src={"http://localhost:5000/products/photo/" + item.product._id }
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
                    </Row>
                    <Divider/>                    
                </>
                )
            } 
            </Col>
            </Col>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Container  className='order_summury_container'>
                
                <h3 className='order_col2_title'>Summary</h3>
                <div className='order_col2_div'>
                    <h5>Order ID : {orderID}</h5>
                </div>
                <div className='order_col2_div_2'  >
                    <h6>Ordered Date : {order.order_Placed_Date}</h6>
                    <h6>Order Status : {order.order_Status}</h6>
                </div>
                <div className='order_col2_div'>
                    <h5>Payment Method : {order.payment_Method}</h5>
                    <Divider/>
                </div>
                <div className='order_col2_div'>
                    <h5>Sub Total( {numOfItems} items) : LKR {subTotal}</h5>
                    <Divider/>
                </div>
                <div className='order_col2_div'>
                    <h5>Total Discount : LKR {totalDiscount}</h5>
                    <Divider/>
                </div>
                <div className='order_col2_div'>
                <h5>Delivery Charges : LKR {delCharge} </h5>
                <Divider/>
                </div>
                <div className='order_col2_div'>
                    <h4>Grand Total : LKR {order.order_Total}</h4>
                </div>
                <div className='order_col2_div' style={{textAlign :'center'}}>             
                    <Button className='order_summury_btn' href='/all-items'>Request to Cancel Order</Button>
                </div>
            </Container>
                <Container  className='order_summury_container' >
                <h3 className='order_col2_title'>Delivery Details</h3>
                <div>
                <div className='order_col2_div'>
                    <h6>Expected Delivery Date : {order.expected_Delivery_Date}</h6>
                </div>
                <div className='order_col2_div'>
                    <h6>Actual Delivery Date : {order.actual_Delivery_Date}</h6>
                </div>
                <div className='order_col2_div'>
                    <h6>Delivery Member : {order.delivery_Member}</h6>
                </div>
                </div>
                <div>
                <div className='order_col2_div'>
                    <h5>To : </h5>
                    <h6>{order.delivery_Fname} {order.delivery_Lname}</h6>
                    <h6>{order.delivery_Address_1},</h6>
                    <h6>{order.delivery_Address_2},</h6>
                    <h6>{order.delivery_Address_3}</h6>
                    <h6>{order.delivery_Postal}</h6>
                </div>
                </div>
                </Container>
            </Col>
        </Row>

        </Container >       
        </>
    )
}

export default ViewOrderDetails;