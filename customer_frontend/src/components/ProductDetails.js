import React,{useState,useEffect} from 'react';
import {Row,Col ,Container,Button,Media , Form} from 'react-bootstrap'
import '../components/ProductDetails.css';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { useParams } from 'react-router';
import AddToCart from './cart/AddToCart';
import { Fragment } from 'react';

function ProductDetails(props) {

    let params = useParams();
    console.log(params.id)
    
    const [modalShow, setModalShow] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [itemID , setItemID] = useState(0);

    const getProductData = async () => {
      try {
        const data = await Axios.get(
          `http://localhost:5000/products/${params.id}`
        );
        console.log(data.data);
        setProducts(data.data);


      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      getProductData();
    }, []);



    function handleRadio(e){
      console.log(e.target.id)
      console.log(products.product_Stock[e.target.id - 1])
      setItemID(e.target.id - 1)
    }

    const jwt = localStorage.getItem("token");

    function handleAddtoCart(){
      Swal.fire({
        icon: 'info',
        title: 'Please Login to Your Account!',
        text: 'You have to login to the account , to use add to cart option'
      })
    }


    return (    
        <>
            <Container className='pro_detail_container'>
                <Row>
                    <Col sm={12} lg={5} md={6} className='detail_col col1'>
                    <Media className='pro_det_img imgset'>
                    <img
                            width={200}
                            height= {250}
                            className="mr-3"
                            src={"http://localhost:5000/products/photo/" + products._id }
                            alt="Product"
                        />
                    </Media>

                    </Col>
                    <Col sm={12} lg={7} md={6} className='detail_col col2'>
                        <h5 className="product_det_category">{products.product_Category}</h5>
                        <h3 className="product_det_name">{products.product_Name}</h3>
                        <h5 className="product_det_colors">Available Colors</h5>
                        <div className="mb-3 col_div">
                        {
                            products.product_Stock && products.product_Stock.map((item , x) =>
                              <>
                               <Form.Check onChange={(e) => handleRadio(e)}  className="mr-0" inline name="group1" type="radio" id={x + 1}/>
                               <div className="col_item" style={{width:"40px" , height:"15px" , backgroundColor:`${item.color}`, borderRadius:"40px"}}></div>
                              </>  
                            )
                        }
                        </div>
                        <h5 className="product_det_size">Available Sizes </h5>

                        { (products.product_Stock && products.product_Stock[itemID].xs_qty  <= 0)&&
                          (products.product_Stock && products.product_Stock[itemID].s_qty  <= 0)&& 
                          (products.product_Stock && products.product_Stock[itemID].s_qty  <= 0)&&
                          (products.product_Stock && products.product_Stock[itemID].s_qty  <= 0)&&
                          (products.product_Stock && products.product_Stock[itemID].s_qty  <= 0)&&
                          (products.product_Stock && products.product_Stock[itemID].s_qty  <= 0) ? 
                        
                          (<span className='addToCartError'>Out of Stock</span>) :
                          (
                            <div className="mb-3 col_size">
                            { products.product_Stock && products.product_Stock[itemID].xs_qty  > 0 ? (<h5 className="col_item">XS</h5>) : ("")}
                            { products.product_Stock && products.product_Stock[itemID].s_qty  > 0 ? (<h5 className="col_item">S</h5>) : ("")}
                            { products.product_Stock && products.product_Stock[itemID].m_qty > 0 ? (<h5 className="col_item">M</h5>) : ("")}
                            { products.product_Stock && products.product_Stock[itemID].l_qty > 0 ? (<h5 className="col_item">L</h5>) : ("")}
                            { products.product_Stock && products.product_Stock[itemID].xl_qty > 0 ? (<h5 className="col_item">XL</h5>) : ("")}
                            { products.product_Stock && products.product_Stock[itemID].xxl_qty > 0 ? (<h5 className="col_item">XXL</h5>) : ("")} 
                            </div> 
                          )
                          

                        }
                        {
                          products.product_Discount > 0 ? (<h5 className="product_det_oldprice">LKR :{products.product_Price}</h5>) : 
                          ("")
                        }
                        
                        <h4 className="product_det_newprice">LKR :{
                         ((products.product_Price)-(products.product_Price*products.product_Discount*(1/100))) 
                        } 
                        </h4>
                        {
                          products.product_Discount > 0 ? (<h5 className="product_det_discount">{products.product_Discount}% OFF</h5>) : 
                          (<span >No Discount</span>)
                        }
                        
                        
                        <div className='product_det_btngrp'>
                            <Button className='product_det_btn' onClick={jwt? (() => setModalShow(true)):(()=>handleAddtoCart())} >Add to Cart</Button>                           
                            <AddToCart show={modalShow} onHide={() => setModalShow(false)}/>
                        </div>

                    </Col>
                </Row>
            </Container>
            <Container className='pro_detail_container2'>
                <Row>
                    <Col sm={12}  className='detail_col'>
                        <h3 className="product_det_desctitle">Product Description</h3>
                        <p  className="product_det_descpara">
                            {products.product_Description} 
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductDetails;

/* 

                        {products.product_Stock[itemID].s_qty  > 0 ? (<h5 className="col_item">S</h5>) : ("")}
                        {products.product_Stock[itemID].m_qty > 0 ? (<h5 className="col_item">M</h5>) : ("")}
                        {products.product_Stock[itemID].l_qty > 0 ? (<h5 className="col_item">L</h5>) : ("")}
                        {products.product_Stock[itemID].xl_qty > 0 ? (<h5 className="col_item">XL</h5>) : ("")}
                        {products.product_Stock[itemID].xxl_qty > 0 ? (<h5 className="col_item">XXL</h5>) : ("")}  

*/