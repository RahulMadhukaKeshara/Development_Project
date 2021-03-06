import React, {useState} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleDeliveryCharges/AddDeliveryCharge.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';



function AddDeliveryCharge() {

    const history = useHistory();
    const url = 'http://localhost:5000/deliveryCharges/add';
    const [data , setData] = useState({

        district : "",
        delivery_charge : "",
        expected_range : "",

    })

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{
            district : data.district,
            delivery_charge : data.delivery_charge,
            expected_range : data.expected_range
        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Delivery Charge Added!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Delivery Charge Added!',
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
            <h1 className="add_product_category_title">Add Delivery Charge</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type='submit'>
                <span style={{color:'red'}}> <i class="fas fa-star-of-life" style={{fontSize:'7px' , marginBottom:'15px' }}></i>  <em>required</em></span>
                    <Form.Row>

                        <Col sm={12} lg={6}>
                        <Form.Group  controlId="district">
                            <Form.Label>District (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.Control className='add_product_category_form_input' required onChange={(e) => handleChange(e)}  value={data.district} type="text" placeholder="District..." />
                        </Form.Group>
                        </Col>

                        <Col sm={12} lg={6}>
                        <Form.Group  controlId="delivery_charge">
                            <Form.Label>Delivery Charge (LKR) (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.Control className='add_product_category_form_input' required onChange={(e) => handleChange(e)}  value={data.delivery_charge} type="number" placeholder="Delivery Charge..." />
                        </Form.Group>
                        </Col>

                    </Form.Row>
                    <Form.Row>

                    <Col sm={12} lg={6}>
                    <Form.Group  controlId="expected_range">
                        <Form.Label>Expected Date Gap (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                        <Form.Control className='add_product_category_form_input' required onChange={(e) => handleChange(e)}  value={data.expected_range} type="number" min="1" placeholder="Expected Date Gap..." />
                    </Form.Group>
                    </Col>

                    </Form.Row>



                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit" >Add</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default AddDeliveryCharge;
