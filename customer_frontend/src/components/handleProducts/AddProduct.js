import React,{useState,useEffect} from 'react';
import {Form , Button , Col , Container} from 'react-bootstrap';
import '../handleProducts/AddProduct.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';


function AddProduct() {

    const history = useHistory();
    const url = 'http://localhost:5000/products/add';
    const [data , setData] = useState({

        product_Img : null,
        product_Name : "",
        product_Category : "",
        product_Description : "",
        product_Stock : [
            {color:"#fff" , xs_qty :"0", s_qty :"0", m_qty :"0",  l_qty :"0", xl_qty :"0",  xxl_qty :"0"},
        ],
        product_Price : "",
        product_Discount : "0",
        product_Re_Quantity : "0",
        product_Re_Level : "0",
        product_Published : "",
        product_Featured : "",
        product_New : "",
        product_Supplier : "",

    })

    const [productCategories, setProductCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
   
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
  
    const getSupplierData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/suppliers/"
          );
          console.log(data.data);
          setSuppliers(data.data);
  
        } catch (e) {
          console.log(e);
        }
      };
    useEffect(() => {
      getProductData();
      getSupplierData();
    }, []);

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData)
    }

    function handleChangeStock(e , index){
        const newData = {...data};
        newData.product_Stock[index][e.target.id] = e.target.value;
        setData(newData);
        console.log(newData)
    }


   function handleUpload(e) {

        console.log(e.target.files[0])
        const newData = {...data}
        newData.product_Img = e.target.files[0];
        // console.log(newData)
        setData(newData)

    }

    function handleAddFields(){
        
        const newData = {...data};
        const count = newData.product_Stock.length;
        newData.product_Stock[count] = {color:"#f95957" , xs_qty :"0", s_qty :"0", m_qty :"0",  l_qty :"0", xl_qty :"0",  xxl_qty :"0"};
       // console.log(newData)
        setData(newData);


    }

    function handleRemoveFields(index){

        const newData = {...data};
        newData.product_Stock.splice(index, 1);
        setData(newData);  
    }


    function handleSubmit(e){
        e.preventDefault(); 
    
        const stockData = JSON.stringify(data.product_Stock);
        const formData = new FormData();
         formData.append("product_Name", data.product_Name);
         formData.append("product_Category", data.product_Category);
         formData.append("product_Description", data.product_Description);
         formData.append("product_Price", data.product_Price);
         formData.append("product_Discount", data.product_Discount);
         formData.append("product_Stock", stockData);
         formData.append("product_Re_Quantity", data.product_Re_Quantity);
         formData.append("product_Re_Level", data.product_Re_Level);
         formData.append("product_Published", data.product_Published);
         formData.append("product_Featured", data.product_Featured);
         formData.append("product_New", data.product_New);
         formData.append("product_Supplier", data.product_Supplier);
         formData.append("product_Img", data.product_Img);

        try {
        
          Axios.post(
            url,
            formData,

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
                <span style={{color:'red'}}> <i class="fas fa-star-of-life" style={{fontSize:'7px' , marginBottom:'20px' }}></i>  <em>required</em></span>
                    <Form.Row>
                        <Col sm={12} lg={3} md={6}>
                        <Form.Group  controlId="product_Img">
                            <Form.Label>Product Image (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.File className='add_product_category_form_input'  onChange={(e) => handleUpload(e)}  type="file" name="product_Img"  />
                        </Form.Group>

                        </Col>
                    </Form.Row>

                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Name">
                            <Form.Label>Product Name (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.Control  className='add_product_category_form_input' required name="product_Name" onChange={(e) => handleChange(e)}  value={data.product_Name} type="text"  placeholder="Product Name" />
                        </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Category">
                            <Form.Label>Product Category (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.Control as="select" name="product_Category" onChange={(e) => handleChange(e)} required  value={data.product_Category} >
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


                        <Col sm={12} lg={6} md={6} >
                        <Form.Group  controlId="product_Description">
                            <Form.Label>Description (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' required name="product_Description" onChange={(e) => handleChange(e)}  value={data.product_Description} type="text" placeholder="Description..." />
                        </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6} >
                        <Form.Group  controlId="product_Supplier">
                            <Form.Label>Supplier (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.Control as="select" name="product_Category" onChange={(e) => handleChange(e)} required  >
                                    <option  selected>Select ...</option>
                            {
                            suppliers.map(supplier =>
                                
                                <option key={supplier._id} value={supplier._id}>{supplier.supplier_Name}</option>
                                )
                            }
                            </Form.Control>
                        </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Price">
                            <Form.Label>Product Price(LKR.) (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.Control className='add_product_category_form_input' required  name="product_Price" onChange={(e) => handleChange(e)}  value={data.product_Price} type="number" placeholder="Product Price"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Discount">
                            <Form.Label>Product Discount (%) (<em>optinal</em> )</Form.Label>
                            <Form.Control className='add_product_category_form_input' max="99" name="product_Discount" onChange={(e) => handleChange(e)}  value={data.product_Discount} type="number" placeholder="Product Discount" />
                        </Form.Group>
                        </Col>
                    </Form.Row> 
                    <Form.Row>
                        <h4>Product Stock Details (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</h4>

                        <IconButton onClick={()=> handleAddFields()}>
                                    <AddIcon />
                        </IconButton>

                        {
                            data.product_Stock.map((x , i) =>
                               
                            <Container fluid key={i}>
                            <Form.Group  controlId="product_Stock">
                            <Form.Row>
                            <Col sm={12} lg={6} md={6}>
                                    <Form.Group  controlId="color">
                                    <Form.Label>Colour</Form.Label>
                                    <Form.Control className='add_product_category_form_input' required name="color" onChange={(e) => handleChangeStock(e ,i)}  type="color"  value={x.color} title="Choose Item Color :"/>
                                    </Form.Group>
                            </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="xs_qty">
                                    <Form.Label>XS Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' name="xs_qty" required onChange={(e) => handleChangeStock(e ,i)}  value={x.xs_qty} type="number" placeholder="XS Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="s_qty">
                                    <Form.Label>S Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' name="s_qty" required onChange={(e) => handleChangeStock(e ,i)}  value={x.s_qty} type="number" placeholder="S Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="m_qty">
                                    <Form.Label>M Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' name="m_qty" required onChange={(e) => handleChangeStock(e ,i)}  value={x.m_qty} type="number" placeholder="M Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="l_qty">
                                    <Form.Label>L Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' name="l_qty" required onChange={(e) => handleChangeStock(e ,i)}  value={x.l_qty} type="number" placeholder="L Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="xl_qty">
                                    <Form.Label>XL Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' name="xl_qty" required onChange={(e) => handleChangeStock(e ,i)}  value={x.xl_qty} type="number" placeholder="XL Quantity"  />
                                </Form.Group>
                                </Col>
                                <Col xs={4} sm={4} lg={2} md={3}>
                                <Form.Group  controlId="xxl_qty">
                                    <Form.Label>XXL Quantity</Form.Label>
                                    <Form.Control className='add_product_category_form_input' name="xxl_qty" required onChange={(e) => handleChangeStock(e ,i)}  value={x.xxl_qty} type="number" placeholder="XXL Quantity"  />
                                </Form.Group>
                                </Col>
                            </Form.Row>
                            </Form.Group>
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
                            <Form.Label>Reorder Quantity (<em>optinal</em> )</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Re_Quantity} type="number" placeholder="Reorder Quantity"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Re_Level">
                            <Form.Label>Reorder Level (<em>optinal</em> )</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.product_Re_Level} type="number"  placeholder="Reorder Level" />
                        </Form.Group>
                        </Col>
                    </Form.Row>  

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Published">
                            <Form.Label>Published (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={data.product_Published} >
                                    <option>Select ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="product_Featured">
                            <Form.Label>Featured (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
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
                            <Form.Label>New (<i class="fas fa-star-of-life" style={{fontSize:'7px' , alignItems:'center' }}></i>)</Form.Label>
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


