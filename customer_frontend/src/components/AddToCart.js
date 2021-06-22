import React,{useState,useEffect} from 'react';
import {Modal , Button , Col , Row , Media , Container , Form} from 'react-bootstrap';
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


const [qty, setQty] = useState(1);
const [radioColIndex , setRadioColIndex] = useState(0);
const [radioSize , setRadioSize] = useState('no_qty');


function handleRadioCol(e){

  setRadioColIndex(e.target.id - 1)

}

function handleRadioSize(e){

  setRadioSize(e.target.id);
   
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
                        <h5 className="addToCart_colors">Select Color </h5>
                        <div className="mb-3 col_div_addToCart">
                        {
                            products.product_Stock && products.product_Stock.map((item , x) =>
                              <>
                               <Form.Check onChange={(e) => handleRadioCol(e)}  className="mr-0" inline name="group1" type="radio" id={x+1}/>
                               <div className="col_item_addToCart" style={{width:"40px" , height:"15px" , backgroundColor:`${item.color}`, borderRadius:"40px"}}></div>
                              </>  
                            )
                        }
                        </div>                       
                        <h5 className="addToCart_size">Select Size<br/></h5>
                        <div className="mb-3 col_size_addToCart">
                        { products.product_Stock && products.product_Stock[radioColIndex].xs_qty  > 0 ? (<Form.Check  onChange={(e)=> handleRadioSize(e)} label="XS" className=" col_item_addToCart" inline name="group2" type="radio" id="xs_qty"/> ) : ("")}
                        { products.product_Stock && products.product_Stock[radioColIndex].s_qty  > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="S" className=" col_item_addToCart" inline name="group2" type="radio" id="s_qty"/>) : ("")}
                        { products.product_Stock && products.product_Stock[radioColIndex].m_qty > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="M" className=" col_item_addToCart" inline name="group2" type="radio" id="m_qty"/>) : ("")}
                        { products.product_Stock && products.product_Stock[radioColIndex].l_qty > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="L" className=" col_item_addToCart" inline name="group2" type="radio" id="l_qty"/>) : ("")}
                        { products.product_Stock && products.product_Stock[radioColIndex].xl_qty > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="XL" className=" col_item_addToCart" inline name="group2" type="radio" id="xl_qty"/>) : ("")}
                        { products.product_Stock && products.product_Stock[radioColIndex].xxl_qty > 0 ? (<Form.Check onChange={(e)=> handleRadioSize(e)} label="XLL" className=" col_item_addToCart" inline name="group2" type="radio" id="xxl_qty"/>) : ("")} 
                        </div>                        

                        <div>
                          
                        <h5 className="addToCart_Qty">Select Quantity<br/></h5>
                        {
                           radioSize  !== "no_qty" ? 
                           (products.product_Stock && products.product_Stock[radioColIndex][radioSize]  > 0 ? (<h5>{products.product_Stock && products.product_Stock[radioColIndex][radioSize]} Items Available</h5>) : (<h5>No Items Available</h5>)) 
                           : ("")
                        }
                        {/* radioSize  !== "no_qty" ? (Number(products.product_Stock && products.product_Stock[radioColIndex][radioSize])) : (0)  */}
                        { <select value={qty} onChange={(e) => setQty(e.target.value)}>

                        {
                          
                        [...Array(radioSize  !== "no_qty" ? (Number(products.product_Stock && products.product_Stock[radioColIndex][radioSize])) : (0)).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select> }
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
