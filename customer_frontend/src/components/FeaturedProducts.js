import React,{useState,useEffect} from 'react';
import { Col , Row , Container} from 'react-bootstrap';
import FeaturedCardItems from './FeaturedCardItems';
import '../components/FeaturedCardItems.css';
import Axios from 'axios';


function FeaturedProducts() {

    const [products, setProducts] = useState([]);

     const getProductData = async () => {
       try {

        let newArrivals = [];
         const data = await Axios.get(
           "http://localhost:5000/products/"
         );
         console.log(data.data);

         data.data.forEach(element => {
          if(element.product_Featured === "Yes"){
            newArrivals.push(element);
          }
        });

         setProducts(newArrivals);

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
            <h1 className='feature_title'>Featured Products</h1>
            <Row  className="justify-content-md-center">
            { 
                
                products.slice(0,4).map(  products =>   {
                  
                  return (
                      <Col lg={3} md={6} className="featured_col">
                      <FeaturedCardItems
                      src= {"http://localhost:5000/products/photo/" + products._id }
                      title={products.product_Name}
                      price={products.product_Price}
                      discount={products.product_Discount}
                      id= {'/product-details/' + products._id}/>
                      </Col>    
                    ) 
                   }              
                )

                }
            </Row>
        </Container>
    </>
  )
}

export default FeaturedProducts;