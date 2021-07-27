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
import Swal from 'sweetalert2';
import AddReview from '../productDetails/AddReview';

function ViewOrderDetails() {

    const history = useHistory();
    let params = useParams();
    let orderID = params.id;
    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;


    const url = 'http://localhost:5000/orders/orderStatus/update/' + params.id;
    const [order , setOrder] = useState({});
    const [subTotal , setSubTotal] = useState(0);
    const [totalDiscount , setTotalDiscount] = useState(0);
    const [numOfItems , setNumOfItems] = useState("");
    const [delCharge , setDelCharge] = useState(0);
    const [modalShow, setModalShow] = React.useState(false);
    const [returnGap , setReturnGap] = useState(0);

    let today = new Date();
    let date;

    const getOrderData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/orders/orderDetails/" + orderID
          );
          setOrder(data.data);
          if(data.data.actual_Delivery_Date !== ""){
              const delDate = new Date(`${data.data.actual_Delivery_Date}`);
              date = delDate;
              let Difference_In_Time = today.getTime() - date.getTime();
              let dateGap = Difference_In_Time / (1000 * 3600 * 24);
              setReturnGap(parseInt(dateGap));
          }

          //console.log("dws gaaana" , parseInt(returnCheckDate))

        } catch (e) {
          console.log(e);
        }
      };

      const calcSubTot = async () => {
        let sub = 0;
        let discount = 0;
        try {
            const data = await Axios.get(
                "http://localhost:5000/orders/orderDetails/" + orderID
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

      function confirmCancelClick(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Request!'
          }).then((result) => {
            if (result.isConfirmed) {
               handleReqtoCancel();
            }
          })
      }

      function confirmReturnClick(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Request!'
          }).then((result) => {
            if (result.isConfirmed) {
                handleReqtoReturn();
            }
          })   
      }

      function handleReqtoCancel(){

        Axios.post(url,{

            order_Status : "Requested to Cancel"

        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Order Status Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Request has Placed successfully',
                    text: 'Staff Member will contact you soon!!!',
                  })
                history.push('/customer-orders/' + userID);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',

                  })
            }            
        })
    }

    function handleReqtoReturn(){

        Axios.post(url,{

            order_Status : "Requested to Return"

        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Order Status Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Request has Placed successfully',
                    text: 'Staff Member will contact you soon!!!',
                  })
                history.push('/customer-orders/' + userID);

            } else {
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
                 (order.order_Status === "Delivered")||(order.order_Status === "Returned")||(order.order_Status === "Cancelled") ?
                 (
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
                                <div  className='order_item_col2'>
                                    <div><h5>{item.product.product_Name}</h5></div>
                                    <div><h6>Price : LKR {item.unit_Price}</h6></div>
                                    <div style={{display:'flex'}}>
                                    <div style={{display:'flex' , alignItems:'center'}}>
                                        <div><h6 className='gg'>color : </h6></div>
                                        <div style={{width:"14px" , height:"14px" , backgroundColor:`${item.color}`, borderRadius:"40px" ,  marginRight:'10px'}}></div> 
                                    </div>
                                    <div><h6 className='gg'>Size : {item.size}</h6></div>    
                                    <div><h6 className='gg'>Qty : {item.quantity}</h6> </div>
                                    </div>                 
                                </div>
                                <div  className='item_col3'>
                                <Button className='add_Review_btn' onClick={() => setModalShow(true)} >Add Review</Button>                           
                                <AddReview productID={item.product._id} show={modalShow} onHide={() => setModalShow(false)}/>
                                </div>
                            </Row>
                            <Divider/>                    
                        </>
                        )      
                    
                 ):
                 (
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
                                <div  className='order_item_col2'>
                                    <div><h5>{item.product.product_Name}</h5></div>
                                    <div><h6>Price : LKR {item.unit_Price}</h6></div>
                                    <div style={{display:'flex'}}>
                                    <div style={{display:'flex' , alignItems:'center'}}>
                                        <div><h6 className='gg'>color : </h6></div>
                                        <div style={{width:"14px" , height:"14px" , backgroundColor:`${item.color}`, borderRadius:"40px" ,  marginRight:'10px'}}></div> 
                                    </div>
                                    <div><h6 className='gg'>Size : {item.size}</h6></div>    
                                    <div><h6 className='gg'>Qty : {item.quantity}</h6> </div>
                                    </div>                 
                                </div>
                            </Row>
                            <Divider/>                    
                        </>
                        )
                 )
             }

            </Col>
            </Col>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Container  className='order_summury_container'>
                
                <h3 className='order_col2_title'>Summary</h3>
                <div className='order_col2_div'>
                    <h5>Order ID : {order.order_ID}</h5>
                </div>
                <div className='order_col2_div_2'  >
                    <h6>Ordered Date : {order.order_Placed_Date}</h6>
                    <h6 style={{color:'#f95957' , fontWeight:'bolder'}} >Order Status : {order.order_Status}</h6>
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
                <div className='order_col2_div' style={{color:'#f95957'}}>
                    <h3>Grand Total : LKR {order.order_Total}</h3>
                </div>
                {
                    (order.order_Status === "New")||(order.order_Status === "Delivery Assigned") ?
                    (
                    <div className='order_col2_div' style={{textAlign :'center'}}>             
                        <Button className='order_summury_btn' onClick={confirmCancelClick}>Request to Cancel Order</Button>
                    </div>
                    ):
                    ((order.order_Status === "Delivered") && (returnGap <= 7) ? 
                    (
                    <div className='order_col2_div' style={{textAlign :'center'}}>             
                        <Button className='order_summury_btn' onClick={confirmReturnClick}>Request to Return</Button>
                    </div>
                    ):
                    (""))
                }

                {/* <div className='order_col2_div' style={{textAlign :'center'}}>             
                    <Button className='order_summury_btn' href='#'>Request to Return Order</Button>
                </div> */}
            </Container>
                <Container  className='order_summury_container' >
                <h3 className='order_col2_title'>Delivery Details</h3>
                <div>
                <div className='order_col2_div'>
                    <h6>Expected Delivery Date : {order.expected_Delivery_Date === "" ? ("Not Assigned"):(order.expected_Delivery_Date)}</h6>
                </div>
                <div className='order_col2_div'>
                    <h6>Actual Delivery Date : {order.actual_Delivery_Date === "" ? ("Not Assigned"):(order.actual_Delivery_Date)}</h6>
                </div>
                <div className='order_col2_div'>
                <h6>Delivery Member : {order.delivery_Member ? (`${order.delivery_Member.user_Fname} ${order.delivery_Member.user_Lname}`):("Not Assigned")}</h6>
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
