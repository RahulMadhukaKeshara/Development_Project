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
    const [updatingImg , setUpdatingImg] = useState(null);
    const [suppliers, setSuppliers] = useState([]);

    const url = 'http://localhost:5000/products/update/' + params.id;

    const getProductData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/products/"+ params.id
          );
          console.log(data.data);
          setProduct(data.data);
          setUpdatingImg(data.data.product_Img);
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


   function handleUpload(e) {

     //console.log(e.target.files[0])
     const newProduct = {...product}
     newProduct.product_Img = e.target.files[0];
     setProduct(newProduct)
     console.log(newProduct)

 }

function handleAddFields(){
    
    const newProduct = {...product};
    const count = newProduct.product_Stock.length;
    newProduct.product_Stock[count] = {color:"#f95957" , xs_qty :"0", s_qty :"0", m_qty :"0",  l_qty :"0", xl_qty :"0",  xxl_qty :"0"};
    //console.log(newProduct)
    setProduct(newProduct);


}

function handleRemoveFields(index){

    const newProduct = {...product};
    newProduct.product_Stock.splice(index, 1);
    setProduct(newProduct);  
}

    function handleSubmit(e){
        e.preventDefault();
        const stockData = JSON.stringify(product.product_Stock);
        const formData = new FormData();
         formData.append("product_Name", product.product_Name);
         formData.append("product_Category", product.product_Category);
         formData.append("product_Description", product.product_Description);
         formData.append("product_Price", product.product_Price);
         formData.append("product_Discount", product.product_Discount);
         formData.append("product_Stock", stockData);
         formData.append("product_Re_Quantity", product.product_Re_Quantity);
         formData.append("product_Re_Level", product.product_Re_Level);
         formData.append("product_Published", product.product_Published);
         formData.append("product_Featured", product.product_Featured);
         formData.append("product_New", product.product_New);
         formData.append("product_Supplier", product.product_Supplier);
         formData.append("product_Img", product.product_Img);
        Axios.post(url,formData)
        .then(res => {
            console.log(res.data)
            if (res.data === "Product Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Updated!',
                  })
                //   history.push('/products');
                window.location = '/products';

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
        <Form.File className='add_product_category_form_input' required  onChange={(e) => handleUpload(e)}  type="file" name="product_Img"  />
    </Form.Group>

    </Col>
</Form.Row>

<Form.Row>

    <Col sm={12} lg={6} md={6}>
    <Form.Group  controlId="product_Name">
        <Form.Label>Product Name</Form.Label>
        <Form.Control  className='add_product_category_form_input' required name="product_Name" onChange={(e) => handleChange(e)}  value={product.product_Name} type="text"  placeholder="Product Name" />
    </Form.Group>
    </Col>

    <Col sm={12} lg={6} md={6}>
    <Form.Group  controlId="product_Category">
        <Form.Label>Product Category</Form.Label>
        <Form.Control as="select" name="product_Category" required onChange={(e) => handleChange(e)}  value={product.product_Category} >
                <option>Select ...</option>
        {
         productCategories && productCategories.map(productCategories =>
            
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
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} required className='add_product_category_form_input' name="product_Description" onChange={(e) => handleChange(e)}  value={product.product_Description} type="text" placeholder="Description..." />
    </Form.Group>
    </Col>

                    <Col sm={12} lg={6} md={6} >
                        <Form.Group  controlId="product_Supplier">
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control as="select" name="product_Category" onChange={(e) => handleChange(e)} required >
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
        <Form.Label>Product Price(LKR.)</Form.Label>
        <Form.Control className='add_product_category_form_input' required  name="product_Price" onChange={(e) => handleChange(e)}  value={product.product_Price} type="number" placeholder="Product Price"  />
    </Form.Group>

    </Col>

    <Col sm={12} lg={6} md={6}>
    <Form.Group  controlId="product_Discount">
        <Form.Label>Product Discount</Form.Label>
        <Form.Control className='add_product_category_form_input' required max="99" name="product_Discount" onChange={(e) => handleChange(e)}  value={product.product_Discount} type="number" placeholder="Product Discount" />
    </Form.Group>
    </Col>
</Form.Row> 
<Form.Row>
    <h4>Product Stock Details</h4>

    <IconButton onClick={()=> handleAddFields()}>
                <AddIcon />
    </IconButton>

    {
       product.product_Stock &&  product.product_Stock.map((x , i) =>
           
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
                <Form.Control className='add_product_category_form_input' name="xs_qty" onChange={(e) => handleChangeStock(e ,i)}  value={x.xs_qty} type="number" required placeholder="XS Quantity"  />
            </Form.Group>
            </Col>
            <Col xs={4} sm={4} lg={2} md={3}>
            <Form.Group  controlId="s_qty">
                <Form.Label>S Quantity</Form.Label>
                <Form.Control className='add_product_category_form_input' name="s_qty" onChange={(e) => handleChangeStock(e ,i)}  value={x.s_qty} type="number" required placeholder="S Quantity"  />
            </Form.Group>
            </Col>
            <Col xs={4} sm={4} lg={2} md={3}>
            <Form.Group  controlId="m_qty">
                <Form.Label>M Quantity</Form.Label>
                <Form.Control className='add_product_category_form_input' name="m_qty" onChange={(e) => handleChangeStock(e ,i)}  value={x.m_qty} type="number" required placeholder="M Quantity"  />
            </Form.Group>
            </Col>
            <Col xs={4} sm={4} lg={2} md={3}>
            <Form.Group  controlId="l_qty">
                <Form.Label>L Quantity</Form.Label>
                <Form.Control className='add_product_category_form_input' name="l_qty" onChange={(e) => handleChangeStock(e ,i)}  value={x.l_qty} type="number" required placeholder="L Quantity"  />
            </Form.Group>
            </Col>
            <Col xs={4} sm={4} lg={2} md={3}>
            <Form.Group  controlId="xl_qty">
                <Form.Label>XL Quantity</Form.Label>
                <Form.Control className='add_product_category_form_input' name="xl_qty" onChange={(e) => handleChangeStock(e ,i)}  value={x.xl_qty} type="number" required placeholder="XL Quantity"  />
            </Form.Group>
            </Col>
            <Col xs={4} sm={4} lg={2} md={3}>
            <Form.Group  controlId="xxl_qty">
                <Form.Label>XXL Quantity</Form.Label>
                <Form.Control className='add_product_category_form_input' name="xxl_qty" onChange={(e) => handleChangeStock(e ,i)}  value={x.xxl_qty} type="number" required placeholder="XXL Quantity"  />
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
        <Form.Label>Reorder Quantity</Form.Label>
        <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Re_Quantity} type="number"  placeholder="Reorder Quantity"  />
    </Form.Group>

    </Col>

    <Col sm={12} lg={6} md={6}>
    <Form.Group  controlId="product_Re_Level">
        <Form.Label>Reorder Level</Form.Label>
        <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={product.product_Re_Level} type="number"   placeholder="Reorder Level" />
    </Form.Group>
    </Col>
</Form.Row>  

<Form.Row>
    <Col sm={12} lg={6} md={6}>
    <Form.Group  controlId="product_Published">
        <Form.Label>Published</Form.Label>
        <Form.Control as="select" onChange={(e) => handleChange(e)}  required value={product.product_Published} >
                <option>Select ...</option>
                <option>Yes</option>
                <option>No</option>
        </Form.Control>
    </Form.Group>

    </Col>

    <Col sm={12} lg={6} md={6}>
    <Form.Group  controlId="product_Featured">
        <Form.Label>Featured</Form.Label>
        <Form.Control as="select" onChange={(e) => handleChange(e)}  required value={product.product_Featured} >
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
        <Form.Control as="select" onChange={(e) => handleChange(e)}  required value={product.product_New} >
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
