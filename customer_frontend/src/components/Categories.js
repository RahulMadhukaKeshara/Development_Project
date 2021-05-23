import React from 'react'
import { Col , Row , Container} from 'react-bootstrap';
import CategoryCardItems from './CategoryCardItems';
import '../components/CategoryCardItems.css';

function Categories() {
  return (
    <>

        <Container className='container-md'>
            <h1 className='category_title'>Categories</h1>
            <Row  className="justify-content-md-center">
                <Col lg={4} md={4} className="category_col">
                    <CategoryCardItems
                    src='./images/Cat01.jpg'
                    title='Men Collection'

                    />
                </Col>
                <Col lg={4} md={4} className="category_col">
                <CategoryCardItems
                    src='./images/Cat02.jpg'
                    title="Women Collection"
    
                    />
                </Col>
                <Col lg={4} md={4} className="category_col">
                <CategoryCardItems
                    src='./images/Cat03.jpg'
                    title='Couple Collection'

                    />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Categories;