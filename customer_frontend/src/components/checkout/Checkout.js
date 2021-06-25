import React from 'react'
import '../checkout/Checkout.css'
import {Container,Row ,Col, Button , Form} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';


function Checkout() {

    function handleChange(e) {

    }

    function handleSubmit(e) {

    }


    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Link color="inherit" href="/cart" >My Cart</Link>
            <Typography color="textPrimary">Checkout</Typography>
        </Breadcrumbs>
        <Divider />
           <h1 className="checkout_title">Checkout</h1>
           <Container  fluid className='cart_container'>
            <Row>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col1'>
            <Container  className='checkout_item_container'>

            <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)}>

                <h4 className="add_product_category_sub_title">Personal Details</h4>
                <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Fname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="First Name"/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Lname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Last Name"/>
                    </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                <Col sm={12} lg={6} md={6}>
                <Form.Group  controlId="user_Contact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Contact Number" />
                </Form.Group>
                </Col>
                </Form.Row>
                <Form.Group controlId="checkout_check">
                    <Form.Check type="checkbox" label="Use Billing Address as the Shipping Address" />
                </Form.Group>
               
                {/* <h6 className="add_product_category_sub_title">Use Billing Address as the Shipping Address</h6> */}
                <Form.Row>
                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Fname">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Address Line 1"/>
                    </Form.Group>
                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Lname">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Address Line 2"/>
                    </Form.Group>
                    </Col>
                </Form.Row>   
                <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Fname">
                        <Form.Label>Address Line 3</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Address Line 3"/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Lname">
                        <Form.Label>City</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="City"/>
                    </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Fname">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)} placeholder="Postal Code"/>
                    </Form.Group>

                    </Col>

                    <Col sm={12} lg={6} md={6}>
                    <Form.Group  controlId="user_Lname">
                        <Form.Label>Delivery Instructions</Form.Label>
                        <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  type="text" placeholder="Delivery Instructions..."  />
                    </Form.Group>
                    </Col>
                </Form.Row>
                <h4 className="add_product_category_sub_title">Payment Details</h4>
                <Col sm={12} lg={12} md={12}>
                        <Form.Group  controlId="user_Type" style={{display:'flex'}}>
                            <Form.Label>Select a Payment Method :</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)} >
                                    <option>Choose...</option>
                                    <option>Online Payment</option>
                                    <option>Cash On Delivery</option>
                            </Form.Control>
                        </Form.Group>
                </Col>   
                <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Proceed to Pay</Button>
                        {/* <Button className='add_product_category_form_btn1' type="submit">Place Order</Button> */}
                </div>          
                </Form>
            </Container>
            </Col>
            <Col sm={12} lg={6} md={6} xs={12} className='cart_col2'>
            <Container  className='checkout_summury_container'>
                
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
                        <h5>Delivery Charges : LKR 150</h5>
                    </div>
                    <div className='col2_div'>
                        <h3>Grand Total : LKR 2290</h3>
                    </div>
            </Container>
            </Col>

            </Row>

           </Container>
        </>
    )
}

export default Checkout;
