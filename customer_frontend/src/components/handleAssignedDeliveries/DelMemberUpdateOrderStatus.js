import React , {useState , useEffect} from 'react';
import {Modal , Button , Col , Form} from 'react-bootstrap';
import { useParams } from 'react-router';
import Axios from 'axios';
import '../handleProductCategories/AddProductCategory.css';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function DelMemberUpdateOrderStatus(props) {
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
        if (newOrder.order_Status === "Delivery Assigned") {

            Swal.fire({
                icon: 'error',
                title: 'Invalid Order Status',
                text: 'Cannot change order status to Delivery Assigned!',

              })         
            
        } else {
            setOrder(newOrder);
            //console.log(newOrder)  
        }

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
                  props.onHide();
                  if ((order.order_Status === "Returned")||(order.order_Status === "Delivered")) {

                    history.push('/deliveryHistory/' + params.id);

                  } else {
                      
                    history.push('/newly-assigned-deliveries/' + params.id);

                  }
                  

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
        <Modal className='addToCart_modal'
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Update Order Status
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='add_product_category_form_container'>

            <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type="submit">
            <Form.Row>

            <Col sm={12} >
            <Form.Group  controlId="order_Status">
                <Form.Label>Order Status</Form.Label>
                <Form.Control as="select" onChange={(e) => handleChange(e)}  value={order.order_Status}>
                        <option>Delivery Assigned</option> 
                        <option>On The Way</option>
                        <option>Delivered</option>
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

        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
        </>
)
}
export default DelMemberUpdateOrderStatus;

