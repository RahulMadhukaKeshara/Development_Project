import React,{useState,useEffect} from 'react';
import { Col , Row , Container} from 'react-bootstrap';
import '../components/FeaturedCardItems.css';
import FeaturedCardItems from './FeaturedCardItems';
import Axios from 'axios';

function NewArrivals() {

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
            <h1 className='feature_title'>New Arrivals</h1>
            <Row className="justify-content-md-center">
            { 
                
                products.map(  products =>   {
                  
                  return products.product_New === "Yes" ? 
                    (
                      <Col lg={3} md={6} className="featured_col">
                      <FeaturedCardItems
                      src= {"http://localhost:5000/products/photo/" + products._id }
                      title={products.product_Name}
                      price={products.product_Price}
                      id= {'/product-details/' + products._id}/>
                      </Col>                    
                    ) : 
                    ("") 
                   }              
                )

              }
            </Row>
        </Container>
    </>
  )
}

export default NewArrivals;