import React from 'react';
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './OwnerCategoryItems.css';

function OwnerCategoryItems(props) {
    return (
        <>
          <Card className='owner_category_card'>
          <Link className='cards__item__link' to={props.path}>
              {props.icon}
              <Card.Title className='card_category_title'>{props.title}</Card.Title>
          </Link>
    
          </Card>
        </>
      )
}


export default OwnerCategoryItems;
