import React from 'react';
import {Container,Row ,Col, Button,Media} from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import './Cart.css'

function Cart() {
    return (
        <>
           <h1 className="cart_title">My Cart</h1>
           <Container  fluid className='cart_container'>
            <Row>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Container  className='item_container'>
            <div className="item_div">
                <Col sm={12} lg={3} md={3} className='item_col1'>
                    <Media >
                        <img 
                                className="mr-3 item_image"
                                src="../../images/Cat01.jpg"
                                alt="Generic placeholder"
                            />                      
                    </Media>
                </Col>
                <Col sm={12} lg={6} md={6} className='item_col2'>
                    <h6>Butterfly Embroidered Tee</h6>
                    <h6>Price : LKR 900</h6>
                    <h6 className='gg'>color : Red</h6>
                    <h6 className='gg'>Size : M</h6>    
                    <h6 className='gg'>Qty : 5</h6>                  
                </Col>
                <Col sm={12} lg={3} md={3} className='item_col3'>
                <IconButton aria-label="Edit">
                        <EditIcon/>
                </IconButton>
                <IconButton aria-label="Edit">
                        <DeleteIcon/>
                </IconButton>
                </Col>
            </div>
            </Container>
            </Col>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col2'>
            <Container  className='summury_container'>
                
                    <h3 className='col2_title'>Cart Summary</h3>

                    <div className='col2_div'>
                        <h5>Sub Total(4 items) : LKR 3600</h5>
                        <li>Butterfly Embroidered Tee  X  1 : LKR 900</li>
                        <li>Butterfly Embroidered Tee  X  1 : LKR 900</li>
                        <li>Butterfly Embroidered Tee  X  1 : LKR 900</li>
                        <li>Butterfly Embroidered Tee  X  1 : LKR 900</li>
                    </div>
                    <div className='col2_div'>
                        <h5>Total Discount : LKR 260</h5>
                    </div>
                    <div className='col2_div'>
                        <h6>Select District for the Delivery Charges :</h6>
                        <select>
                            <option>Choose...</option>
                            <option>Kadawatha</option>
                            <option>Gampaha</option>
                        </select>
                        <h5>Delivery Charges : LKR 150</h5>
                    </div>
                    <div className='col2_div'>
                        <h3>Grand Total : LKR 2290</h3>
                    </div>
                    <div className='col2_div  summry_btns'>             
                        <Button className='summury_btn1' href='#'>Continue Shopping</Button>
                        <Button className='summury_btn2' type="submit">Checkout</Button>
                    </div>
            </Container>
            </Col>

            </Row>

           </Container>
        </>
    )
}

export default Cart;
