import React,{useState,useEffect} from 'react';
import {Modal , Button , Col , Row , Media , Container} from 'react-bootstrap';
import '../components/AddToCart.css';
import { useParams } from 'react-router';
import Axios from 'axios';

function AddToCart(props) {

  let params = useParams();
  const [products, setProducts] = useState([]);
  const getProductData = async () => {
    try {
      const data = await Axios.get(
        `http://localhost:5000/products/${params.id}`
      );
      console.log(data.data);
      setProducts(data.data);

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  function splitCol(color){

    var col = color.toString();
    return col.split(",");
  
  }
const colors = splitCol(`${products.product_Colors}`);

function splitSize(size){

  var sizes = size.toString();
  return sizes.split(",");

}
const sizes = splitSize(`${products.product_Sizes}`);
const [qty, setQty] = useState(1);

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

        <Container className='addToCart_container'>
                <Row>
                    <Col sm={12} lg={5} md={5} className='addToCart_col1 '>
                        <Media className='addToCart_img '>
                        <img 
                                className="mr-3 img1"
                                src={"http://localhost:5000/products/photo/" + products._id }
                                alt="product"
                            />                      
                        </Media>
                    </Col>

                    <Col sm={12} lg={7} md={7} className='addToCart_col2 '>
                        <h5 className="addToCart_category">{products.product_Category}</h5>
                        <h3 className="addToCart_name">{products.product_Name}</h3>
                        <h4 className="addToCart_newprice">Available : 
                        {
                          products.product_Quantity > 0 ? (<span className='addToCartSuccess'>{products.product_Quantity} Items Available</span>) : 
                          (<span className='addToCartError'>Out of Stock</span>)
                        }
                        </h4>
                        <h5 className="addToCart_colors">Select Color </h5>
                        <div className="addToCart_color_dis" style={{backgroundColor:`${products.product_Colors}` , color:`${products.product_Colors}` ,width:"20px" , height:"20px"}}></div>
                        <h5 className="addToCart_size">Select Size<br/> {sizes}</h5>
                        <div>
                        <h5 className="addToCart_Qty">Select Quantity<br/></h5>
                        <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(products.product_Quantity).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                        </div>
                        {
                          products.product_Discount > 0 ? (<h5 className="product_det_oldprice">LKR :{qty*products.product_Price}</h5>) : 
                          ("")
                        }
                        <h4 className="addToCart_newprice">LKR : {
                        (qty*((products.product_Price)-(products.product_Price*products.product_Discount*(1/100)))) 
                        }
                        </h4>
                        {
                          products.product_Discount > 0 ? (<h5 className="addToCart_discount">{products.product_Discount}% OFF</h5>) : 
                          (<span className='addToCartError'>No Discount</span>)
                        }
                        
                        <div className='addToCart_btngrp'>
                            <Button className='addToCart_btn' type='submit'>Add to Cart</Button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}

export default AddToCart;
