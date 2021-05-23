import React from 'react'
import { Col , Row , Container} from 'react-bootstrap';
import '../components/NewArriveCardItems.css';
import NewArriveCardItems from './NewArriveCardItems';

function NewArrivals() {
  return (
    <>

        <Container className='container-md'>
            <h1 className='feature_title'>New Arrivals</h1>
            <Row className="justify-content-md-center">
                <Col lg={3} md={6} className="col">
                    <NewArriveCardItems
                    src='./images/Cat02.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col lg={3} md={6} className="col">
                <NewArriveCardItems
                    src='./images/Cat02.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col lg={3} md={6} className="col">
                <NewArriveCardItems
                    src='./images/Cat02.jpg'
                    title='Butterfly Embroidered Tee'
                    price='960'
                    />
                </Col>
                <Col lg={3} md={6} className="col">
                <NewArriveCardItems
                    src='./images/Cat02.jpg'
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