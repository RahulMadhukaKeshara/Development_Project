import React , {useState , useEffect} from 'react';
import {Modal , Button , Col , Row , Media , Container , Form} from 'react-bootstrap';
import './AddToCart.css';
import { useParams } from 'react-router';
import Axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";

function UpdateCartItem(props) {

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
            Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container className='addToCart_container'>
                <Row>
                    
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}

export default UpdateCartItem;
