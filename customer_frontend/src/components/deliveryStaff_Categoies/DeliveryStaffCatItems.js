import React from 'react';
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../deliveryStaff_Categoies/DeliveryStaffCatItems.css';

function DeliverStaffCatItems(props) {
    return (
        <>
          <Card className='delStaff_category_card'>

          <Link className='cards__item__link' to={props.path}>
            <Card.Img className='delStaff_category_card_img' variant="top" src={props.src} />
            <Card.Body className='delStaff_category_card_body'>
              <Card.Title className='delStaff_category_card_title'>{props.title}</Card.Title>
            </Card.Body>
          </Link>
    
          </Card>
        </>
      )
}


export default DeliverStaffCatItems;
