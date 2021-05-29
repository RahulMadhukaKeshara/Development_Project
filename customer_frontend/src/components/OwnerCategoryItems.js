import React from 'react';
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../components/OwnerCategoryItems.css';

function OwnerCategoryItems(props) {
    return (
        <>
          <Card className='owner_category_card'>

          <Link className='cards__item__link' to={props.path}>
            <Card.Img className='owner_category_card_img' variant="top" src={props.src} />
            <Card.Body className='owner_category_card_body'>
              <Card.Title className='owner_category_card_title'>{props.title}</Card.Title>
            </Card.Body>
          </Link>
    
          </Card>
        </>
      )
}


export default OwnerCategoryItems;
