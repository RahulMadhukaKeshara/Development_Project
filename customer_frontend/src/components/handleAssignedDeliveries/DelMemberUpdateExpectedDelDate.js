import React,{useState,useEffect} from 'react';
import {Modal , Button , Col , Row , Media , Container , Form} from 'react-bootstrap';
import '../cart/AddToCart.css';
import { useParams } from 'react-router';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function DelMemberUpdateExpectedDelDate(props) {

    let params = useParams();
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());

    const url = 'http://localhost:5000/orders/expectedDelDate/update/' + params.id;


    function handleSubmit(e){
        e.preventDefault();
        //console.log(startDate)
        //console.log(startDate.toLocaleDateString())
        Axios.post(url,{

            expected_Delivery_Date : startDate.toLocaleDateString()

        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Date  Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Date Updated!',
                  })
                  history.push('/deliveryStaff-view-orderDetails/' + params.id);

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
            Set Expected Delivery Date
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='add_product_category_form_container'>

            <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type="submit">

                <Form.Row>

                    <Col sm={12} >
                    <Form.Group  controlId="expected_Delivery_Date">
                        <Form.Label>Expected Delivery Date : </Form.Label>
                            <DatePicker selected={startDate} onChange={(date) => {setStartDate(date)}}/>
                    </Form.Group>
                    </Col>

                </Form.Row>

                <div className='add_product_category_form_btns'>             
                    <Button className='add_product_category_form_btn1' type="submit">Set Date</Button>
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

export default DelMemberUpdateExpectedDelDate;
