import React from 'react'
import { Col , Row , Container} from 'react-bootstrap';
import FeaturedCardItems from './FeaturedCardItems';
import '../components/FeaturedCardItems.css';

function FeaturedProducts() {
  return (
    <>

        <Container >
            <h1 className='feature_title'>Featured Products</h1>
            <Row>
                <Col xs={6} md={3}>
                    <FeaturedCardItems
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/1.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col xs={6} md={3}>
                <FeaturedCardItems
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/1.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col xs={6} md={3}>
                <FeaturedCardItems
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/1.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col xs={6} md={3}>
                <FeaturedCardItems
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/1.jpg'
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