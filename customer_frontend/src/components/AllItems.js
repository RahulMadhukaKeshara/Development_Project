import React,{useState,useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FeaturedCardItems from './FeaturedCardItems';
import '../components/DisplayItems.css';
import Axios from 'axios';

function DisplayItems(props) {

    const [products, setProducts] = useState([]);

     const getProductData = async () => {
       try {
         const data = await Axios.get(
           "http://localhost:5000/products/"
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
    
            <Container className='container-md'>
                <h1 className='feature_title'>All Items</h1>
                <Row  className="justify-content-md-center">
                { 
                
                products.map(  products =>  
                  
                      <Col lg={3} md={6} className="featured_col">
                      <FeaturedCardItems
                      src= {"http://localhost:5000/products/photo/" + products._id }
                      title={products.product_Name}
                      price={products.product_Price}
                      id= {'/product-details/' + products._id}/>
                      </Col>                    
                                 
                )

                }
                </Row>
            </Container>

            
        </>
      )
}

export default DisplayItems;