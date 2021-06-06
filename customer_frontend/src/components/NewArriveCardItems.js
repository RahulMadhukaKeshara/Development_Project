import React from 'react';
import {Card , Button} from 'react-bootstrap';
import '../components/NewArriveCardItems.css';
import Link from '@material-ui/core/Link';

function NewArriveCardItems(props) {
  return (
    <>
      <Card className='new_arrival_card'>

        <Card.Img className='new_arrival_card_img' variant="top" src={props.src} />

        <Card.Body className='new_arrival_card_body'>

          <Card.Title className='new_arrival_card_title'>{props.title}</Card.Title>
          <Card.Text className='new_arrival_card_price'>LKR : {props.price}</Card.Text>

          <Link href='/product-details'>
          <Button className='new_arrival_card_btn' variant="primary">VIEW</Button>
          </Link>

        </Card.Body>

      </Card>
    </>
  )
}

export default NewArriveCardItems;
