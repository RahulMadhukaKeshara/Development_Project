import React from 'react'
import './MyOrders.css'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {Container,Row ,Col, Button,Media} from 'react-bootstrap';

function MyOrders() {
    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Typography color="textPrimary">My Orders</Typography>
        </Breadcrumbs>
        <Divider />
        <h1 className="order_title">My Orders</h1>
        <Container className="order_container">
        <Col >
            <Row className="individual_order">
                <div className="order_itemPart1">

                <h4>Order ID : 60d9e73f5573fb1090022d85</h4>
                <h6>Ordered Date : 02/06/2020</h6>
                <h6>Total Price : LKR 2500</h6>
                <h6>Order Status : New</h6>

                </div>
                <div className="order_itemPart2"> 
                    <Button className='order_btn'>View</Button>
                </div>
            </Row>
            <Divider/>
            <Row className="individual_order">
                <div className="order_itemPart1">

                <h4>Order ID : 60d9e73f5573fb1090022d85</h4>
                <h6>Ordered Date : 02/06/2020</h6>
                <h6>Total Price : LKR 2500</h6>
                <h6>Order Status : New</h6>
                </div>
                <div className="order_itemPart2"> 
                    <Button className='order_btn'>View</Button>
                </div>

            </Row>
            <Divider/>
            <Row className="individual_order">
                <div className="order_itemPart1">   

                <h4>Order ID : 60d9e73f5573fb1090022d85</h4>
                <h6>Ordered Date : 02/06/2020</h6>
                <h6>Total Price : LKR 2500</h6>
                <h6>Order Status : New</h6>

                </div>
                <div className="order_itemPart2"> 
                    <Button className='order_btn'>View</Button>
                </div>
            </Row>
            <Divider/>
        </Col>
        </Container>
        </>
    )
}

export default MyOrders;
