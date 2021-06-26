import React,{useState,useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FeaturedCardItems from './FeaturedCardItems';
import '../components/DisplayItems.css';
import Axios from 'axios';
import { useParams } from 'react-router';

function DisplayItems(props) {

    let params = useParams();
    const [products, setProducts] = useState([]);
    const [productCategory , setProductCategory] = useState({})

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

     const getProductCategoryData = async () => {
      try {
        const data = await Axios.get(
          "http://localhost:5000/productCategories/" + params.id
        );
        console.log(data.data);
        setProductCategory(data.data);

      } catch (e) {
        console.log(e);
      }
    };
   
     useEffect(() => {
       getProductData();
       getProductCategoryData();
     }, []);


    return (
        <>
    
            <Container className='container-md'>
                <h1 className='feature_title'>{productCategory.product_category_Name + "'s Items"}</h1>
                <Row  className="justify-content-md-center">
                { 
                
                products.map(  products =>   {
                  
                  return products.product_Category === productCategory.product_category_Name ? 
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

export default DisplayItems;