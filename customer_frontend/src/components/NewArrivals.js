import React from 'react'
import { Col , Row , Container} from 'react-bootstrap';
import '../components/NewArriveCardItems.css';
import NewArriveCardItems from './NewArriveCardItems';

function NewArrivals() {
  return (
    <>

        <Container >
            <h1 className='feature_title'>New Arrivals</h1>
            <Row>
                <Col xs={6} md={3}>
                    <NewArriveCardItems
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/1.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col xs={6} md={3}>
                <NewArriveCardItems
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/1.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col xs={6} md={3}>
                <NewArriveCardItems
                    src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/1.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col xs={6} md={3}>
                <NewArriveCardItems
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

export default NewArrivals;