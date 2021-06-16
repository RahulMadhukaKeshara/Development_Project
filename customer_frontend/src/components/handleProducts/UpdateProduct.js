import React,{useState,useEffect} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleProducts/AddProduct.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';



function UpdateProduct() {


    let params = useParams();
    const history = useHistory();
    const [product , setProduct] = useState({});
    const [productCategories, setProductCategories] = useState([]);

    const url = 'http://localhost:5000/products/update/' + params.id;

    const getProductData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/products/"+ params.id
          );
          console.log(data.data);
          setProduct(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getProductData();
      }, []);


   
    const getProductCatData = async () => {
      try {
        const data = await Axios.get(
          "http://localhost:5000/productCategories/"
        );
        console.log(data.data);
        setProductCategories(data.data);

      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
        getProductCatData();
    }, []);


    function handleChange(e) {
        const newProduct = {...product};
        newProduct[e.target.id] = e.target.value;
        setProduct(newProduct);
        console.log(newProduct)
    }

    //function handleUpload(e) {

       // setProduct({product_Img : e.target.files[0]})

   // }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{

            //product_Img : product.product_Img,
            product_Name : product.product_Name,
            product_Category : product.product_Category,
            product_Quantity : product.product_Quantity,
            product_Description : product.product_Description,
            product_Sizes : product.product_Sizes,
            product_Colors : product.product_Colors,
            product_Price : product.product_Price,
            product_Discount : product.product_Discount,
            product_Re_Quantity : product.product_Re_Quantity,
            product_Re_Level : product.product_Re_Level,
            product_Published : product.product_Published,
            product_Featured : product.product_Featured,
            product_New : product.product_New,

        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Product Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Updated!',
                  })
                  history.push('/products');

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


            <h1 className="add_product_category_title">Update Product</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form'  onSubmit={(e) => handleSubmit(e)}>

                    <Form.Row>
                        <Col sm={12} lg={3} md={6}>
                        <Form.Group  controlId="product_Img">
                            <Form.Label>Product Image</Form.Label>
                            <Form.File className='add_product_category_form_input'    type="file" name="product_Img" />
                        </Form.Group>

                        </Col>
                    </Form.Row>

                    <Form.Row>

                        <Col sm={12}>
                        <Form.Group  controlId="product_Name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Name} type="text" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Category">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={product.product_Category} >
                                    <option>Select ...</option>
                            {
                            productCategories.map(productCategories =>
                                
                                <option key={productCategories.product_category_Name}>{productCategories.product_category_Name}</option>
                                )
                            }
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Quantity">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={product.product_Quantity} />
                        </Form.Group>

                        </Col>


                    </Form.Row>

                    <Form.Row>


                    <Col sm={12} >
                        <Form.Group  controlId="product_Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={product.product_Description} />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>

                    <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="product_Sizes">
                            <Form.Label>Available Sizes</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={product.product_Sizes}>
                                    <option>Select ...</option>
                                    <option>XS</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                            </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="product_Colors">
                            <Form.Label>Available Colours</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Colors}  type="color"  title="Choose Item Color :"/>
                            </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Price">
                            <Form.Label>Product Price(LKR.)</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={product.product_Price} />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Discount">
                            <Form.Label>Product Discount</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={product.product_Discount}  />
                        </Form.Group>
                        </Col>
                    </Form.Row>    

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Re_Quantity">
                            <Form.Label>Reorder Quantity</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={product.product_Re_Quantity}  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Re_Level">
                            <Form.Label>Reorder Level</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={product.product_Re_Level} />
                        </Form.Group>
                        </Col>
                    </Form.Row>  

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Published">
                            <Form.Label>Published</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={product.product_Published}>
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Featured">
                            <Form.Label>Featured</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={product.product_Featured}>
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
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={product.product_New}>
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
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

export default UpdateProduct;
