import React,{useState} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../components/AddProduct.css';
import Axios from 'axios';



function AddProduct() {

    const url = 'http://localhost:5000/products/add';
    const [data , setData] = useState({

        product_Img : null,
        product_Name : "",
        product_Category : "",
        product_Quantity : "",
        product_Description : "",
        product_Sizes : "",
        product_Colors : "",
        product_Price : "",
        product_Discount : "",
        product_Re_Quantity : "",
        product_Re_Level : "",
        product_Published : "",
        product_Featured : "",
        product_New : "",

    })

    /*function handleUpload(e) {
        setData({
            product_Img: e.target.files[0],
        });
      }*/

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{
            
            product_Img : data.product_Img,
            product_Name : data.product_Name,
            product_Category : data.product_Category,
            product_Quantity : data.product_Quantity,
            product_Description : data.product_Description,
            product_Sizes : data.product_Sizes,
            product_Colors : data.product_Colors,
            product_Price : data.product_Price,
            product_Discount : data.product_Discount,
            product_Re_Quantity : data.product_Re_Quantity,
            product_Re_Level : data.product_Re_Level,
            product_Published : data.product_Published,
            product_Featured : data.product_Featured,
            product_New : data.product_New

        })
        .then(res => {
            console.log(res.data)
        })
    }

    return (
        <>


            <h1 className="add_product_category_title">Add Product</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)}>

                    <Form.Row>
                        <Col sm={12} lg={3} md={6}>
                        <Form.Group  controlId="product_Img">
                            <Form.Label>Product Image</Form.Label>
                            <Form.File className='add_product_category_form_input'  onChange={(e) => handleChange(e)} value={data.product_Img} type="text" name="product_Img"  />
                        </Form.Group>

                        </Col>
                    </Form.Row>

                    <Form.Row>

                        <Col sm={12}>
                        <Form.Group  controlId="product_Name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control  className='add_product_category_form_input'  onChange={(e) => handleChange(e)}  value={data.product_Name} type="text"  placeholder="Product Name" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Category">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Category} type="text" placeholder="Product Category"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Quantity">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Quantity} type="text" placeholder="Product Quantity"  />
                        </Form.Group>

                        </Col>


                    </Form.Row>

                    <Form.Row>


                        <Col sm={12} >
                        <Form.Group  controlId="product_Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Description} type="text" placeholder="Description..." />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="addProductSizes">
                            <Form.Label>Available Sizes</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Sizes} type="text" placeholder="Product Sizes"  />
                            </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="product_Colors">
                            <Form.Label>Available Colours</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Colors} type="text" placeholder="Product Colors"  />
                            </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Price">
                            <Form.Label>Product Price(LKR.)</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Price} type="text" placeholder="Product Price"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Discount">
                            <Form.Label>Product Discount</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Discount} type="text" placeholder="Product Discount" />
                        </Form.Group>
                        </Col>
                    </Form.Row>    

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Re_Quantity">
                            <Form.Label>Reorder Quantity</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Re_Quantity} type="text" placeholder="Reorder Quantity"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Re_Level">
                            <Form.Label>Reorder Level</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Re_Level} type="text"  placeholder="Reorder Level" />
                        </Form.Group>
                        </Col>
                    </Form.Row>  

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Published">
                            <Form.Label>Published</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={data.product_Published} >
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Featured">
                            <Form.Label>Featured</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={data.product_Featured} >
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Form.Row>            

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_New">
                            <Form.Label>New</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={data.product_New} >
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


                            /*<div key={`inline-checkbox`} className="mb-3 add_product_category_checkbox" style={{marginTop:'5px'} } >
                                <Form.Check inline label="XS" name="group1" type='checkbox' className="add_product_category_checkboxname" id={`inline-checkbox-1`} />
                                <Form.Check inline label="S" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-2`} />
                                <Form.Check inline label="M" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-3`} />
                                <Form.Check inline label="L" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-4`} />
                                <Form.Check inline label="XL" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-5`} />
                                <Form.Check inline label="XLL" name="group1" type='checkbox' className="add_product_category_checkboxname"  id={`inline-checkbox-6`} />
                            </div>*/