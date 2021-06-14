import React from 'react'
import { Col , Row , Container} from 'react-bootstrap';
import FeaturedCardItems from './FeaturedCardItems';
import '../components/FeaturedCardItems.css';


function FeaturedProducts() {
  return (
    <>

        <Container className='container-md'>
            <h1 className='feature_title'>Featured Products</h1>
            <Row  className="justify-content-md-center">
                <Col lg={3} md={6} className="featured_col">
                    <FeaturedCardItems
                    src='../images/Cat01.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col lg={3} md={6} className="featured_col">
                <FeaturedCardItems
                    src='../images/Cat01.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col lg={3} md={6} className="featured_col">
                <FeaturedCardItems
                    src='../images/Cat01.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col lg={3} md={6} className="featured_col">
                <FeaturedCardItems
                     src='../images/Cat01.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default FeaturedProducts;