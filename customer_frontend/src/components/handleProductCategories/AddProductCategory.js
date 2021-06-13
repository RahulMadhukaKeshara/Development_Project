import React, {useState} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleProductCategories/AddProductCategory.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';



function AddProductCategory() {

    const history = useHistory();
    const url = 'http://localhost:5000/productCategories/add';
    const [data , setData] = useState({

        product_category_Name : ""

    })

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{
            product_category_Name : data.product_category_Name
        })
        .then(res => {
            console.log(res.data)
            if (res.data === "ProductCategory Added!") {
                Swal.fire({
                    icon: 'success',
                    title: 'ProductCategory Added!',
                  })
                  history.push('/product-categories');

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
            <h1 className="add_product_category_title">Add Product Category</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type='submit'>

                    <Form.Row>

                        <Col sm={12}>
                        <Form.Group  controlId="product_category_Name">
                            <Form.Label>Product Category Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_category_Name} type="text" placeholder="Product Category Name" />
                        </Form.Group>
                        </Col>

                    </Form.Row>



                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit" >Add</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default AddProductCategory;
