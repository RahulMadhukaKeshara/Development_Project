import React from 'react'
import './ViewOrderDetails.css'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import {Container,Row ,Col, Button,Media} from 'react-bootstrap';

function ViewOrderDetails() {
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
            <Row className="order_individual_item_div">
                <div  className='order_item_col1'>
                    <Media >
                        <img 
                                className="mr-3 order_item_image"
                                src={"http://localhost:5000/products/photo/" }
                                alt="Generic placeholder"
                            />                      
                    </Media>
                </div>
                <div  className='item_col2'>
                    <h6>Butterfly Tee</h6>
                    <h6>Price : LKR 2500</h6>
                    <h6 className='gg'>color : #fff</h6>
                    <h6 className='gg'>Size : M</h6>    
                    <h6 className='gg'>Qty : 2</h6>                  
                </div>
                </Row>
                <Divider/>
            </Col>
            </Col>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Container  className='order_summury_container'>
                
                <h3 className='order_col2_title'>Summary</h3>
                <div className='order_col2_div'>
                    <h5>Order ID : 60d9e73f5573fb1090022d85</h5>
                </div>
                <div className='order_col2_div_2'  >
                    <h6>Ordered Date : 02/06/2020</h6>
                    <h6>Order Status : New</h6>
                </div>
                <div className='order_col2_div'>
                    <h5>Payment Method : Cash on Delivery</h5>
                    <Divider/>
                </div>
                <div className='order_col2_div'>
                    <h5>Sub Total( 4 items) : LKR 5000</h5>
                    <Divider/>
                </div>
                <div className='order_col2_div'>
                    <h5>Total Discount : LKR 250</h5>
                    <Divider/>
                </div>
                <div className='order_col2_div'>
                <h5>Delivery Charges : LKR 100 </h5>
                <Divider/>
                </div>
                <div className='order_col2_div'>
                    <h4>Grand Total : LKR 5000</h4>
                </div>
                <div className='order_col2_div' style={{textAlign :'center'}}>             
                    <Button className='order_summury_btn' href='/all-items'>Request to Cancel Order</Button>
                </div>
            </Container>
                <Container  className='order_summury_container' >
                <h3 className='order_col2_title'>Delivery Details</h3>
                <div>
                <div className='order_col2_div'>
                    <h6>Expected Delivery Date : 02/06/2020</h6>
                </div>
                <div className='order_col2_div'>
                    <h6>Actual Delivery Date : 02/06/2020</h6>
                </div>
                <div className='order_col2_div'>
                    <h6>Delivery Member : Nuwan Thushara</h6>
                </div>
                </div>
                <div>
                <div className='order_col2_div'>
                    <h5>To : </h5>
                    <h6>Rahul Madhuka</h6>
                    <h6>Add line 1</h6>
                    <h6>Add line 2</h6>
                    <h6>Add line 3</h6>
                    <h6>11023</h6>
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
