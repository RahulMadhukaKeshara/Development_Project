import React from 'react';
import {Card , Button} from 'react-bootstrap';
import '../components/FeaturedCardItems.css';
//import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom';


function FeaturedCardItems(props) {
  return (
    <>
      <Card className='featured_card'>

        <Card.Img className='featured_card_img' variant="top" src={props.src} />

        <Card.Body className='featured_card_body'>

          <Card.Title className='featured_card_title'>{props.title}</Card.Title>
          <Card.Text className='featured_card_price'>LKR : {props.price}</Card.Text>

          <Link to={props.id}>
            <Button className='featured_card_btn' variant="primary">VIEW</Button>
          </Link>
          

        </Card.Body>

      </Card>
    </>
  )
}

export default FeaturedCardItems;
