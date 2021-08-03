import React from 'react';
import {Card , Button} from 'react-bootstrap';
import '../components/FeaturedCardItems.css';
//import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';


function FeaturedCardItems(props) {

  
  const useStyles = makeStyles((theme) => ({
    root: {

      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();


  return (
    <>

      
      <Card className='featured_card' >

        <Card.Img className='featured_card_img' variant="top" src={props.src} />

        <Card.Body className='featured_card_body'>

          <Card.Title className='featured_card_title'>{props.title}</Card.Title>
          {
            props.discount > 0 ?
            (
              <>
              <div style={{display:'flex' , margin:'0px' , alignItems:'center' , marginBottom:'5px'}}>
              <Card.Text className='featured_card_oldprice'>LKR : {props.price}</Card.Text>
              <Card.Text className='featured_card_price'>LKR : {(props.price)- (props.price*props.discount*(1/100))}</Card.Text>
              </div>
              </>
            ):
            (
              <div style={{display:'flex' , margin:'0px' , alignItems:'center' , marginBottom:'5px' , justifyContent:'center'}}>
              <Card.Text className='featured_card_price'>LKR : {props.price}</Card.Text>
              </div>
            )
          }
          <div className={classes.root}>
            <Rating name="half-rating-read" defaultValue={props.rating} precision={0.5} readOnly size='small'/>
          </div>
          <Link to={props.id}>
            <Button className='featured_card_btn' variant="primary">VIEW</Button>
          </Link>
          

        </Card.Body>

      </Card>
    </>
  )
}

export default FeaturedCardItems;