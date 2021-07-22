import React,{useState,useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FeaturedCardItems from './FeaturedCardItems';
import '../components/DisplayItems.css';
import Axios from 'axios';

function DisplayItems(props) {

    const [products, setProducts] = useState([]);

     const getProductData = async () => {
       try {

        let newArrivals = [];
         const data = await Axios.get(
           "http://localhost:5000/products/"
         );
         console.log(data.data);

         data.data.forEach(element => {
         
            let rat = 0;
            element.product_reviews.forEach((item)=>{
              rat = rat + parseFloat(item.review_rating);
            })
            newArrivals.push({product:element , rating : rat });
          
        });

         setProducts(newArrivals);
         console.log(newArrivals)


       } catch (e) {
         console.log(e);
       }
     };

     useEffect(() => {
       getProductData();
     }, []);


    return (
        <>
    
            <Container className='container-md'>
                <h1 className='feature_title'>All Items</h1>
                <Row  className="justify-content-md-center">
                { 
                
                products.map(  products =>  
                  
                      <Col lg={3} md={6} className="featured_col">
                      <FeaturedCardItems
                      src= {"http://localhost:5000/products/photo/" + products.product._id }
                      title={products.product.product_Name}
                      price={products.product.product_Price}
                      id= {'/product-details/' + products.product._id}
                      discount = {products.product.product_Discount}
                      rating={products.product.product_reviews.length > 0 ? (products.rating/products.product.product_reviews.length):(0)}
                      />
                      </Col>                    
                                 
                )

                }
                </Row>
            </Container>

            
        </>
      )
}

export default DisplayItems;