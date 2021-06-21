import React,{useState,useEffect} from 'react';
import {Form , Button , Col , Container} from 'react-bootstrap';
import '../handleProducts/AddProduct.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';



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

   function handleChangeStock(e , index){
    const newProduct = {...product};
    newProduct.product_Stock[index][e.target.id] = e.target.value;
    setProduct(newProduct);
    console.log(newProduct)
}


//  function handleUpload(e) {

    //setData({product_Img : e.target.files[0]})

//}

function handleAddFields(){
    
    const newProduct = {...product};
    const count = newProduct.product_Stock.length;
    newProduct.product_Stock[count] = {color:"#f95957" , xs_qty :"", s_qty :"", m_qty :"",  l_qty :"", xl_qty :"",  xxl_qty :""};
    console.log(newProduct)
    //setProduct(newProduct);
    console.log(product.product_Stock)

}

function handleRemoveFields(index){

    const newProduct = {...product};
    newProduct.product_Stock.splice(index, 1);
    setProduct(newProduct);  
}

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{

            //product_Img : product.product_Img,
            product_Name : product.product_Name,
            product_Category : product.product_Category,
            product_Description : product.product_Description,
            product_Price : product.product_Price,
            product_Discount : product.product_Discount,
            product_Stock : product.product_Stock,
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

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)}>

                    <Form.Row>
                        <Col sm={12} lg={3} md={6}>
                        <Form.Group  controlId="product_Img">
                            <Form.Label>Product Image</Form.Label>
                            <Form.File className='add_product_category_form_input' /* onChange={(e) => handleUpload(e)}*/  type="file" name="product_Img"  />
                        </Form.Group>

                        </Col>
                    </Form.Row>

                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control  className='add_product_category_form_input'  onChange={(e) => handleChange(e)}  value={product.product_Name} type="text"  placeholder="Product Name" />
                        </Form.Group>
                        </Col>

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
                    </Form.Row>



                    <Form.Row>


                        <Col sm={12} >
                        <Form.Group  controlId="product_Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Description} type="text" placeholder="Description..." />
                        </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Price">
                            <Form.Label>Product Price(LKR.)</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Price} type="text" placeholder="Product Price"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Discount">
                            <Form.Label>Product Discount</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Discount} type="text" placeholder="Product Discount" />
                        </Form.Group>
                        </Col>
                    </Form.Row> 
                    <Form.Row>
                        <h4>Product Stock Details</h4>

                        <IconButton onClick={()=> handleAddFields()}>
                                    <AddIcon />
                        </IconButton>

                        {
                            product.product_Stock && product.product_Stock.map((x , i) =>
                               
                            <Container fluid key={i}>
                            <Form.Row>
                            <Col sm={12} lg={6} md={6}>
                                    <Form.Group  controlId="color">
                                    <Form.Label>Colour</Form.Label>
                                    <Form.Control className='add_product_category_form_input' onChange={(e) => handleChangeStock(e ,i)}  type="color"  value={x.color} title="Choose Item Color :"/>
                                    </Form.Group>
                            </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="xs_qty">
                                    <Form.Label>XS Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' onChange={(e) => handleChangeStock(e ,i)}  value={x.xs_qty} type="text" placeholder="XS Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="s_qty">
                                    <Form.Label>S Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' onChange={(e) => handleChangeStock(e ,i)}  value={x.s_qty} type="text" placeholder="S Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="m_qty">
                                    <Form.Label>M Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' onChange={(e) => handleChangeStock(e ,i)}  value={x.m_qty} type="text" placeholder="M Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="l_qty">
                                    <Form.Label>L Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' onChange={(e) => handleChangeStock(e ,i)}  value={x.l_qty} type="text" placeholder="L Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="xl_qty">
                                    <Form.Label>XL Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' onChange={(e) => handleChangeStock(e ,i)}  value={x.xl_qty} type="text" placeholder="XL Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="xxl_qty">
                                    <Form.Label>XXL Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' onChange={(e) => handleChangeStock(e ,i)}  value={x.xxl_qty} type="text" placeholder="XXL Quantity"  />
                                </Form.Group>
                                </Col>
                            </Form.Row>
                                <IconButton onClick={() => handleRemoveFields(i)}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={handleAddFields}>
                                    <AddIcon />
                                </IconButton>
                            </Container>
                        
                        )}
                         
                    </Form.Row>   

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Re_Quantity">
                            <Form.Label>Reorder Quantity</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Re_Quantity} type="text" placeholder="Reorder Quantity"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Re_Level">
                            <Form.Label>Reorder Level</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Re_Level} type="text"  placeholder="Reorder Level" />
                        </Form.Group>
                        </Col>
                    </Form.Row>  

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Published">
                            <Form.Label>Published</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={product.product_Published} >
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Featured">
                            <Form.Label>Featured</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={product.product_Featured} >
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
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={product.product_New} >
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

export default UpdateProduct;
