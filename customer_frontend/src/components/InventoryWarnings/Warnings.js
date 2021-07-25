import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import {Container , Col , Row ,Media} from 'react-bootstrap';
import '../InventoryWarnings/Warnings.css';

function Warnings() {

    const [products , setProducts] = useState([]);
    const [warnings , setWarnings] = useState([]);


    const getProductData = async () => {
     try {
       let warn = [];
       const data = await axios.get(
         "http://localhost:5000/products/"
       );
       console.log(data.data);
       setProducts(data.data);
       data.data.forEach(element => {
        element.product_Stock.forEach(item => {
            let qty = parseInt(item.xs_qty) + parseInt(item.s_qty) + parseInt(item.m_qty) + parseInt(item.l_qty) + parseInt(item.xl_qty) +parseInt(item.xxl_qty);
            if (qty <= element.product_Re_Level) 
            {
                warn.push(element);

            } 
        })
    })
    // console.log("*********************",warn)
    setWarnings(warn);
     } catch (e) {
       console.log(e);
     }
   };

   useEffect(() => {
    getProductData();
   }, []);

    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Typography color="textPrimary">Inventory Warnings</Typography>
        </Breadcrumbs>
        <Divider />
        <h1 className="dash_title" style={{margin:'50px 0px'}} >Inventory Warnings</h1>        
        <Container className="order_container warn_container">
            <Col >
            {
                warnings && warnings.length > 0 ?
                (
                    warnings.map(item=>{
                        return(
                            <>
                            <Row className="inventory_item_div">
                            <div  className='order_item_col1'>
                            <Media >
                                <img 
                                        className="mr-3 order_item_image"
                                        src={"http://localhost:5000/products/photo/" + item._id }
                                        alt="Generic placeholder"
                                    />                      
                            </Media>
                            </div>
                                <div className="order_itemPart1">
                                <h4 className="h4_title">Product ID : {item._id}</h4>
                                <h5 className="h5_title">Product Name : {item.product_Name}</h5>
                                <h5 className="h5_title">Supplier : {item.product_Supplier.supplier_Name} </h5>
                        
                                </div>
                            </Row>
                            <Divider/>
                            </>
                        )
                    })
                ):
                (<h4 className="cart_noItem_text">No Inventory Warnings</h4>)
            }
                      
            </Col>
        </Container>            
        </>
    )
}

export default Warnings;



// return(

// )