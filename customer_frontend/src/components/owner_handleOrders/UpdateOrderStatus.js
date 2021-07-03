import React , {useState , useEffect} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import { useParams } from 'react-router';
import Axios from 'axios';
import '../handleProductCategories/AddProductCategory.css';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function UpdateOrderStatus() {
    let params = useParams();
    const history = useHistory();
    const [order , setOrder] = useState({});

    const url = 'http://localhost:5000/orders/orderStatus/update/' + params.id;

    const getOrderData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/orders/orderDetails/"+ params.id
          );
          console.log(data.data);
          setOrder(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getOrderData();
      }, []);


    function handleChange(e) {
        const newOrder = {...order};
        newOrder[e.target.id] = e.target.value;
        setOrder(newOrder);
        console.log(newOrder)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{

            order_Status : order.order_Status

        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Order Status Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Status Updated!',
                  })
                  history.push('/owner-view-orderDetails/' + params.id);

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
            <h1 className="add_product_category_title">Update Order Status</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type="submit">

                    <Form.Row>

                        <Col sm={12} >
                        <Form.Group  controlId="order_Status">
                            <Form.Label>Order Status</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={order.order_Status}>
                                    <option>New</option>
                                    <option>Delivery Assigned</option>
                                    <option>Cancelled</option>
                                    <option>Returned</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>

                    </Form.Row>

                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Update</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}
export default UpdateOrderStatus;
