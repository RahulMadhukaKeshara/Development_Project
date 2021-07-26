import React , {useState , useEffect} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleDeliveryCharges/AddDeliveryCharge.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';



function UpdateDeliveryCharges() {

    let params = useParams();
    const history = useHistory();
    const [deliveryCharge , setDeliveryCharge] = useState({});

    const url = 'http://localhost:5000/deliveryCharges/update/' + params.id;

    const getProductData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/deliveryCharges/"+ params.id
          );
          console.log(data.data);
          setDeliveryCharge(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getProductData();
      }, []);

    function handleChange(e) {
        const newDeliveryCharge = {...deliveryCharge};
        newDeliveryCharge[e.target.id] = e.target.value;
        setDeliveryCharge(newDeliveryCharge);
        console.log(newDeliveryCharge)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{
            delivery_charge : deliveryCharge.delivery_charge,
            expected_range : deliveryCharge.expected_range
        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Delivery Charge Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Delivery Charge Updated!',
                  })
                  history.push('/deliveryCharges');

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
            <h1 className="add_product_category_title">Update Delivery Charge</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type='submit'>

                    <Form.Row>

                        <Col sm={12} lg={6}>
                        <Form.Group  controlId="district">
                            <Form.Label>District</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={deliveryCharge.district} type="text" disabled  />
                        </Form.Group>
                        </Col>

                        <Col sm={12} lg={6}>
                        <Form.Group  controlId="delivery_charge">
                            <Form.Label>Delivery Charge (LKR)</Form.Label>
                            <Form.Control className='add_product_category_form_input' required  onChange={(e) => handleChange(e)}  value={deliveryCharge.delivery_charge} type="number" placeholder="Delivery Charge..." />
                        </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Row>

                    <Col sm={12} lg={6}>
                    <Form.Group  controlId="expected_range">
                        <Form.Label>Expected Date Gap (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                        <Form.Control className='add_product_category_form_input' required  onChange={(e) => handleChange(e)}  value={deliveryCharge.expected_range} type="number" min="1" placeholder="Expected Date Gap..." />
                    </Form.Group>
                    </Col>

                    </Form.Row>



                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit" >Update</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default UpdateDeliveryCharges;
