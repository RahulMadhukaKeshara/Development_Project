import React,{useState,useEffect} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleProducts/AddProduct.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';


function AddProduct() {

    const history = useHistory();
    const url = 'http://localhost:5000/products/add';
    const [data , setData] = useState({

        product_Img : null,
        product_Name : "",
        product_Category : "",
        product_Quantity : "",
        product_Description : "",
        product_Sizes : "",
        product_Colors : "#563d7c",
        product_Price : "",
        product_Discount : "",
        product_Re_Quantity : "",
        product_Re_Level : "",
        product_Published : "",
        product_Featured : "",
        product_New : "",

    })

    const [productCategories, setProductCategories] = useState([]);
   
    const getProductData = async () => {
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
      getProductData();
    }, []);

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData)
    }


   function handleUpload(e) {

        setData({product_Img : e.target.files[0]})

      }

    function handleSubmit(e){
        e.preventDefault(); 
    
        const formData = new FormData();
        formData.append("product_Name", data.product_Name);
        formData.append("product_Category", data.product_Category);
        formData.append("product_Quantity", data.product_Quantity);
        formData.append("product_Description", data.product_Description);
        formData.append("product_Sizes", data.product_Sizes);
        formData.append("product_Colors", data.product_Colors);
        formData.append("product_Price", data.product_Price);
        formData.append("product_Discount", data.product_Discount);
        formData.append("product_Re_Quantity", data.product_Re_Quantity);
        formData.append("product_Re_Level", data.product_Re_Level);
        formData.append("product_Published", data.product_Published);
        formData.append("product_Featured", data.product_Featured);
        formData.append("product_New", data.product_New);


        formData.append("product_Img", data.product_Img);
        
        try {
          Axios.post(
            url,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ).then((res) => {
              console.log(res.data)
              if (res.data === "Product Added!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added!',
                  })
                  history.push('/products');

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',

                  })
            }
            }
          );
        } catch (err) {
          console.log(err.res.data)
        }


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
                            <Form.File className='add_product_category_form_input'  onChange={(e) => handleUpload(e)}  type="file" name="product_Img"  />
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
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={data.product_Category} >
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
                            <Form.Group controlId="product_Sizes">
                            <Form.Label>Available Sizes</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={data.product_Sizes} >
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
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  type="color"  value={data.product_Colors} title="Choose Item Color :"/>
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