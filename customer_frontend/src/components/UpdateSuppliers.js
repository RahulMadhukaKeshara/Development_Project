import React from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../components/AddSuppliers.css';



function UpdateSuppliers() {
    return (
        <>


            <h1 className="add_product_category_title">Update Supplier</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form'>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="updateSupplierID">
                            <Form.Label>Supplier ID</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Supplier ID"  />
                        </Form.Group>

                        </Col>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="updateSupplierName">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Supplier Name" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="updateSupplierEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Email Address"  />
                        </Form.Group>

                        </Col>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="updateSupplierContact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Contact Number" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="updateSupplierAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' type="text" placeholder="Address..."  />
                        </Form.Group>

                        </Col>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="updateSupplierDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' type="text" placeholder="Description..." />
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

export default UpdateSuppliers;