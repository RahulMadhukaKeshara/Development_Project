import React from 'react';
import {Card} from 'react-bootstrap';
import './Dashboard.css';

function DashboardCards(props) {
  return (
    <>
      <Card className='dash_card'>

        {/* <Card.Img className='dash_card_img' variant="top" src={props.src} /> */}
        <Card.Body className='dash_card_body'>
          <Card.Title className='dash_card_title'>{props.title}</Card.Title>
          <Card.Text className='dash_card_text'>{props.text}</Card.Text>
        </Card.Body>

      </Card>
    </>
  )
}

export default DashboardCards;