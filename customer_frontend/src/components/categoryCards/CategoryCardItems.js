import React from 'react';
import {Card} from 'react-bootstrap';
import '../categoryCards/CategoryCardItems.css';

function CategoryCardItems(props) {
  return (
    <>
      <Card className='category_card'>

        <Card.Img className='category_card_img' variant="top" src={props.src} />
        <Card.Body className='category_card_body'>
          <Card.Title className='category_card_title'>{props.title}</Card.Title>
        </Card.Body>

      </Card>
    </>
  )
}

export default CategoryCardItems;