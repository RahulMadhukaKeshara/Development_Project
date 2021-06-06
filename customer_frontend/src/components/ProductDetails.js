import React,{useState,useEffect} from 'react';
import {Row,Col ,Container,Button,Media} from 'react-bootstrap'
import '../components/ProductDetails.css';

import Axios from 'axios';
import { useParams } from 'react-router';

function ProductDetails(props) {

    let params = useParams();
    console.log(params.id)
    

    const [products, setProducts] = useState([]);
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

    



    return (    
        <>
            
            <Container className='pro_detail_container'>
                <Row>
                    <Col sm={12} lg={6} md={6} className='detail_col col1'>
                    <Media className='pro_det_img imgset2'>
                    <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={products.product_Img}
                            alt="Generic placeholder"
                        />
                    <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={products.product_Img}
                            alt="Generic placeholder"
                        />
                    <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={products.product_Img}
                            alt="Generic placeholder"
                        />
                    <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={products.product_Img}
                            alt="Generic placeholder"
                        />                           
                    </Media>
                    <Media className='pro_det_img imgset'>
                    <img
                            width={225}
                            height={225}
                            className="mr-3"
                            src={products.product_Img}
                            alt="Generic placeholder"
                        />
                    </Media>

                    </Col>
                    <Col sm={12} lg={6} md={6} className='detail_col col2'>
                        <h5 className="product_det_category">{products.product_Category}</h5>
                        <h3 className="product_det_name">{products.product_Name}</h3>
                        <h5 className="product_det_colors">Available Colors <br/> {products.product_Colors}</h5>
                        <h5 className="product_det_size">Available Sizes <br/> {products.product_Sizes}</h5>
                        <h5 className="product_det_oldprice">LKR :{products.product_Price}</h5>
                        <h4 className="product_det_newprice">LKR :{products.product_Price} </h4>
                        <h5 className="product_det_discount">{products.product_Discount}% OFF</h5>
                        <div className='product_det_btngrp'>
                            <Button className='product_det_btn' >Add to Cart</Button><br/>
                            <Button className='product_det_btn' >Buy Now</Button>
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
