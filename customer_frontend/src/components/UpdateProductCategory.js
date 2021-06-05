import React from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../components/AddProductCategory.css';



function UpdateProductCategory() {
    return (
        <>


            <h1 className="add_product_category_title">Update Product Category</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form'>

                    <Form.Row>

                        <Col sm={12} >
                        <Form.Group  controlId="updateProductCatName">
                            <Form.Label>Product Category Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" defaultValue='Men' />
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

export default UpdateProductCategory;