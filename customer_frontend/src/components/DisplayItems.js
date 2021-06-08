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
                        src={products.product_Img}
                        title={products.product_Name}
                        price={products.product_Price}
                        id= {'/product-details/' + products._id}
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

/* 

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }
    const paginationBasic = (
    <div>
        <Pagination>{items}</Pagination>

    </div>
    );
                <Pagination className='display_pagination'>{items}</Pagination>
    */