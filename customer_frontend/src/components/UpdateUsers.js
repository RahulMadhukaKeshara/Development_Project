import React from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../components/AddUsers.css';

function UpdateUsers() {
    return (
        <>


            <h1 className="add_product_category_title">Update User</h1>
            <div className='add_product_category_form_container'>

                

                <Form className='add_product_category_form'>


                    <h4 className="add_product_category_sub_title">Personal Details</h4>
                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addUserFname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="First Name"  disabled/>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addUserLname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Last Name" disabled />
                        </Form.Group>
                        </Col>


                    </Form.Row>



                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addUserEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Email Address" disabled />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addUserContact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Contact Number" disabled/>
                        </Form.Group>
                        </Col>

                    </Form.Row>


                    <h4 className="add_product_category_sub_title">Account Details</h4>

                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addUserType">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control as="select" defaultValue="Delivery Staff">
                                    <option>Customer</option>
                                    <option>Delivery Staff</option>
                                    <option>Admin</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addUserType">
                            <Form.Label>User Status</Form.Label>
                            <Form.Control as="select" defaultValue="New">
                                    <option>New</option>
                                    <option>Verified</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                    </Form.Row>


                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Update User</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default UpdateUsers;
