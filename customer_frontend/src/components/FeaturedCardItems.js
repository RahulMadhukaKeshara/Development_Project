import React from 'react';
import {Card , Button} from 'react-bootstrap';
import '../components/FeaturedCardItems.css';

function FeaturedCardItems(props) {
  return (
    <>
      <Card className='featured_card'>

        <Card.Img className='featured_card_img' variant="top" src={props.src} />

        <Card.Body className='featured_card_body'>

          <Card.Title className='featured_card_title'>{props.title}</Card.Title>
          <Card.Text className='featured_card_price'>LKR : {props.price}</Card.Text>
          <Button className='featured_card_btn' variant="primary">VIEW</Button>

        </Card.Body>

      </Card>
    </>
  )
}

export default FeaturedCardItems;
