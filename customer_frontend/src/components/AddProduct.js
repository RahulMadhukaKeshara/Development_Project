import React from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../components/AddProduct.css';



function AddProduct() {
    return (
        <>


            <h1 className="add_product_category_title">Add Product</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form'>

                    <Form.Row>
                        <Col sm={12} lg={3} md={6}>
                        <Form.Group  controlId="addProductImg">
                            <Form.Label>Product Image</Form.Label>
                            <Form.File className='add_product_category_form_input' />
                        </Form.Group>

                        </Col>
                    </Form.Row>

                    <Form.Row>

                        <Col sm={12}>
                        <Form.Group  controlId="addProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Product Name" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductCategory">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Product Category"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductQuantity">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Product Quantity"  />
                        </Form.Group>

                        </Col>


                    </Form.Row>

                    <Form.Row>


                        <Col sm={12} >
                        <Form.Group  controlId="addProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' type="text" placeholder="Description..." />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="addProductSizes">
                            <Form.Label>Available Sizes</Form.Label>
                            <div key={`inline-checkbox`} className="mb-3 add_product_category_checkbox" style={{marginTop:'5px'} } >
                                <Form.Check inline label="XS" name="group1" type='checkbox' className="add_product_category_checkboxname" id={`inline-checkbox-1`} />
                                <Form.Check inline label="S" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-2`} />
                                <Form.Check inline label="M" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-3`} />
                                <Form.Check inline label="L" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-4`} />
                                <Form.Check inline label="XL" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-5`} />
                                <Form.Check inline label="XLL" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-6`} />
                            </div>
                            </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="addProductColours">
                            <Form.Label>Available Colours</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Product Colors"  />
                            </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductPrice">
                            <Form.Label>Product Price(LKR.)</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Product Price"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductDiscount">
                            <Form.Label>Product Discount</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Product Discount" />
                        </Form.Group>
                        </Col>
                    </Form.Row>    

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductReQuantity">
                            <Form.Label>Reorder Quantity</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Reorder Quantity"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductReLevel">
                            <Form.Label>Reorder Level</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" placeholder="Reorder Level" />
                        </Form.Group>
                        </Col>
                    </Form.Row>  

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductPublished">
                            <Form.Label>Published</Form.Label>
                            <Form.Control as="select" defaultValue="Select ...">
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductFeatured">
                            <Form.Label>Featured</Form.Label>
                            <Form.Control as="select" defaultValue="Select...">
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Form.Row>            

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="addProductNew">
                            <Form.Label>New</Form.Label>
                            <Form.Control as="select" defaultValue="Select ...">
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>
                    </Form.Row>  



                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Add</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default AddProduct;
