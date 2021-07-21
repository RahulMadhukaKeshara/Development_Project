import React , {useState , useEffect} from 'react';
import {Modal , Button , Col , Form} from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';

function AddReview(props) {

    let params = useParams();
    const url = 'http://localhost:5000/products/addReview/' + props.productID;
    const [review , setReview ] = useState("");
    const jwt = localStorage.getItem("token");
    let userID;
    if (jwt) {
      userID = jwtDecode(jwt)._id;
    }

    function handleChange(e){

        let review  = e.target.value;
        setReview(review);
        console.log(review)

    }

    function handleSubmit(e){

        e.preventDefault();
        let d = new Date();

        Axios.post(url, {

            review_person : userID,
            review_date : d.toLocaleDateString(),
            review_text : review,
            revie_order : params.id

        })
        .then(res => {
            console.log(res.data)  
            if (res.data === "Review Added!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Review Added!',
                  })
                  props.onHide();
                  window.location = `/product-details/${props.productID}`;
                //history.push(`/product-details/${params.id}`);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',

                  })
            }          
        })
        .catch((e) => {
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

              })
          });


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
            Add Review
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='add_product_category_form_container'>

            <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type="submit">
            <Form.Row>

            <Col sm={12} >
            <Form.Group  controlId="review">
                <Form.Label>Review (100 characters)</Form.Label>
                <Form.Control as="textarea" rows={3} className='add_product_category_form_input' maxLength="100" value={review} required onChange={(e) => handleChange(e)}  type="text" placeholder="Review..." />

            </Form.Group>
            </Col>

            </Form.Row>

                <div className='add_product_category_form_btns'>             
                <Button className='add_product_category_form_btn1' type="submit">Add</Button>
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

export default AddReview;
