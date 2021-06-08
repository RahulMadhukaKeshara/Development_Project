import React,{useState , useEffect} from 'react'
import { Col , Row , Container} from 'react-bootstrap';
import CategoryCardItems from './CategoryCardItems';
import '../components/CategoryCardItems.css';
import Axios from 'axios';

function Categories() {

    const [categories , setCategories] = useState([]);

    const getCategoryData = async() => {

        try {

            const data = await Axios.get(
                "http://localhost:5000/productCategories/"
              );
              console.log(data.data);
              setCategories(data.data);
            
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCategoryData();
      }, []);

  return (
    <>

        <Container className='container-md'>
            <h1 className='category_title'>Categories</h1>
            <Row  className="justify-content-md-center">

            {
                categories.map(categories =>
                    
                    <Col lg={4} md={4} className="category_col">
                    <CategoryCardItems
                    src='./images/Cat01.jpg'
                    title= {categories.product_category_Name + ' Collection'} 
                    />
                </Col>
                    
                )
            }


            </Row>
        </Container>
    </>
  )
}

export default Categories;