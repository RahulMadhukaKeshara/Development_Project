import React , {useState , useEffect} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import { useParams } from 'react-router';
import Axios from 'axios';
import '../handleProductCategories/AddProductCategory.css';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';




function UpdateProductCategory() {

    let params = useParams();
    const history = useHistory();
    const [productCat , setProductCat] = useState({});

    const url = 'http://localhost:5000/productCategories/update/' + params.id;

    const getProductData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/productCategories/"+ params.id
          );
          console.log(data.data);
          setProductCat(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getProductData();
      }, []);


    function handleChange(e) {
        const newproductCat = {...productCat};
        newproductCat[e.target.id] = e.target.value;
        setProductCat(newproductCat);
        console.log(newproductCat)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{

            product_category_Name : productCat.product_category_Name

        })
        .then(res => {
            console.log(res.data)
            if (res.data === "ProductCategory Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'ProductCategory Updated!',
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
            <h1 className="add_product_category_title">Update Product Category</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type="submit">

                    <Form.Row>

                        <Col sm={12} >
                        <Form.Group  controlId="product_category_Name">
                            <Form.Label>Product Category Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={productCat.product_category_Name} type="text"  />
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