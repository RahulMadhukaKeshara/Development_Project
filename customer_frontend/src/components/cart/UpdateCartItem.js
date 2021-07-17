import React , {useState , useEffect} from 'react';
import {Modal , Button , Col , Row , Media , Container , Form} from 'react-bootstrap';
import './AddToCart.css';
import { useParams } from 'react-router';
import Axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecode from "jwt-decode";
import {useHistory} from 'react-router-dom';

function UpdateCartItem(props) {

  let params = useParams();
  const jwt = localStorage.getItem("token");
  let userID;
  if (jwt) {
    userID = jwtDecode(jwt)._id;
  }



const [qty, setQty] = useState(1);
const [radioColIndex , setRadioColIndex] = useState(0);
const [radioSize , setRadioSize] = useState('no_qty');

const history = useHistory();
const url = 'http://localhost:5000/cart/update';
const [cartData , setCartData] = useState({
  cart_User : "",
  cart_Items : 

      {product:"" , color :"", size :"", quantity :"1",  unit_Price :""},
  
})



function handleRadioCol(e){

  setRadioColIndex(e.target.id - 1)
  const newCartData = {...cartData}
  newCartData.cart_Items.color = e.target.value;
  console.log(newCartData)
  setCartData(newCartData)

}

function handleRadioSize(e){

  setRadioSize(e.target.id);
  const newCartData = {...cartData}
  newCartData.cart_Items.size = e.target.value;
  newCartData.cart_Items.unit_Price = props.selectedProduct.product_Price;
  newCartData.cart_User = userID;
  newCartData.cart_Items.product = props.selectedProduct._id;
  console.log(newCartData)
  setCartData(newCartData)
   
}

function handleQuantity(e){
  setQty(e.target.value);
  const newCartData = {...cartData}
  newCartData.cart_Items.quantity = e.target.value;
  console.log(newCartData)
  setCartData(newCartData)

}

function handleSubmit(e){
  e.preventDefault();
  if ((cartData.cart_Items.color==="")||(cartData.cart_Items.size==="")) {
    if((cartData.cart_Items.color==="")&&(cartData.cart_Items.size !=="")){
      Swal.fire({
        icon: 'error',
        title: 'Select Item Color',
        // text: 'Something went wrong!',
      })
    }
    else if((cartData.cart_Items.color!=="")&&(cartData.cart_Items.size ==="")){
      Swal.fire({
        icon: 'error',
        title: 'Select Item Size',
        // text: 'Something went wrong!',
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Select Item Size and Color',
        // text: 'Something went wrong!',
      })
    }
  } 
  else {
    Axios.post(url,{
      
      cart_User : cartData.cart_User,
      cart_Items : cartData.cart_Items,
      itemID : props.item._id

  })
  .then(res => {
    console.log(res.data)
    if (res.data === "Item Updated!") {
        Swal.fire({
            icon: 'success',
            title: 'Item Updated!',

          })
          props.onHide();
          window.location = `/cart/${userID}`;

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',

          })
    }
})
  }


}


    return (
        <>
        <Modal className='addToCart_modal'
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add To Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          props.selectedProduct ? 
          (
            <Container className='addToCart_container'>
            <Row>
                <Col sm={12} lg={5} md={5} className='addToCart_col1 '>
                    <Media className='addToCart_img '>
                    <img 
                            className="mr-3 img1"
                            src={"http://localhost:5000/products/photo/" + props.selectedProduct._id }
                            alt="product"
                        />                      
                    </Media>
                </Col>

                <Col sm={12} lg={7} md={7} className='addToCart_col2 '>
                    <h5 className="addToCart_category">{props.selectedProduct.product_Category}</h5>
                    <h3 className="addToCart_name">{props.selectedProduct.product_Name}</h3>
                    <h5 className="addToCart_colors">Select Color </h5>
                    <div className="mb-3 col_div_addToCart">
                    {
                        props.selectedProduct.product_Stock && props.selectedProduct.product_Stock.map((item , x) =>
                          <>
                           <Form.Check onChange={(e) => handleRadioCol(e)}  className="mr-0" inline name="group1" type="radio" id={x+1} value={item.color} />
                           <div className="col_item_addToCart" style={{width:"40px" , height:"15px" , backgroundColor:`${item.color}`, borderRadius:"40px"}}></div>
                          </>  
                        )
                    }
                    </div>                       
                    <h5 className="addToCart_size">Select Size<br/></h5>
                    { (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].xs_qty  <= 0)&&
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0)&& 
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0)&&
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0)&&
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0)&&
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0) ? 
                    
                      (<span className='addToCartError'>Out of Stock</span>) :
                      (
                        <div className="mb-3 col_size_addToCart">
                        { props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].xs_qty  > 0 ? (<Form.Check  onChange={(e)=> handleRadioSize(e)} label="XS" value="XS" className=" col_item_addToCart" inline name="group2" type="radio" id="xs_qty"/> ) : ("")}
                        { props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="S" value="S" className=" col_item_addToCart" inline name="group2" type="radio" id="s_qty"/>) : ("")}
                        { props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].m_qty > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="M" value="M" className=" col_item_addToCart" inline name="group2" type="radio" id="m_qty"/>) : ("")}
                        { props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].l_qty > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="L" value="L" className=" col_item_addToCart" inline name="group2" type="radio" id="l_qty"/>) : ("")}
                        { props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].xl_qty > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="XL" value="XL" className=" col_item_addToCart" inline name="group2" type="radio" id="xl_qty"/>) : ("")}
                        { props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].xxl_qty > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="XLL" value="XXL" className=" col_item_addToCart" inline name="group2" type="radio" id="xxl_qty"/>) : ("")} 
                        </div>    
                      )
                      

                    }                    

                    { (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].xs_qty  <= 0)&&
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0)&& 
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0)&&
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0)&&
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0)&&
                      (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex].s_qty  <= 0) ? 
                    
                      ("") :
                      (
                        <div>
                      
                        <h5 className="addToCart_Qty">Select Quantity<br/></h5>
                        {
                           radioSize  !== "no_qty" ? 
                           (props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex][radioSize]  > 0 ? (<h5>{props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex][radioSize]} Items Available</h5>) : (<h5>No Items Available</h5>)) 
                           : ("")
                        }
                        
                        { <select value={qty} onChange={(e) => handleQuantity(e)}>

                        {
                          
                        [...Array(radioSize  !== "no_qty" ? (Number(props.selectedProduct.product_Stock && props.selectedProduct.product_Stock[radioColIndex][radioSize])) : (0)).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )
                        }
                            </select> 
                        }

                        </div>  
                      )
                      

                    } 


                    {
                      props.selectedProduct.product_Discount > 0 ? (<h5 className="product_det_oldprice">LKR :{qty*props.selectedProduct.product_Price}</h5>) : 
                      ("")
                    }
                    <h4 className="addToCart_newprice">LKR : {
                    (qty*((props.selectedProduct.product_Price)-(props.selectedProduct.product_Price*props.selectedProduct.product_Discount*(1/100)))) 
                    }
                    </h4>
                    {
                      props.selectedProduct.product_Discount > 0 ? (<h5 className="addToCart_discount">{props.selectedProduct.product_Discount}% OFF</h5>) : 
                      (<span >No Discount</span>)
                    }
                    
                    <div className='addToCart_btngrp'>
                        <Button className='addToCart_btn' onClick={(e) => handleSubmit(e)} type='submit'>Add to Cart</Button>
                    </div>
                </Col>
            </Row>
        </Container>
          ):("")
        }


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}

export default UpdateCartItem;
