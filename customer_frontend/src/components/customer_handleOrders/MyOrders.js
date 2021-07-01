import React , {useState , useEffect} from 'react';
import './MyOrders.css'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {Container,Row ,Col, Button} from 'react-bootstrap';
import Axios from 'axios';
import { useParams } from 'react-router';


function MyOrders() {

    let params = useParams();
    const [orderData , setOrderData] = useState([]);

    const getOrderData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/orders/"+ params.id
          );
          // console.log(data.data);
          setOrderData(data.data);

        } catch (e) {
          console.log(e);
        }
      };

      useEffect(() => {
        getOrderData();
      }, []);

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
        {
            orderData && orderData.map(item => 
            <>
            <Row className="individual_order">
                <div className="order_itemPart1">

                <h4>Order ID : {item._id}</h4>
                <h6>Ordered Date : {item.order_Placed_Date}</h6>
                <h6>Total Price : LKR {item.order_Total}</h6>
                <h6>Order Status : {item.order_Status}</h6>

                </div>
                <div className="order_itemPart2"> 
                    <Button className='order_btn' href={"/customer-view-orderDetails/"+ item._id}>View</Button>
                </div>
            </Row>
            <Divider/>           
            </>
            )
        }
        </Col>
        </Container>
        </>
    )
}

export default MyOrders;
