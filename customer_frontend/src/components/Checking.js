import React,{useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import FeaturedCardItems from './FeaturedCardItems';
import '../components/FeaturedCardItems.css';
import Axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Checking() {

    const [products, setProducts] = useState([]);

    const getProductData = async () => {
      try {

       let newArrivals = [];
        const data = await Axios.get(
          "http://localhost:5000/products/"
        );
        console.log(data.data);

        data.data.forEach(element => {
         if(element.product_Featured === "Yes"){
           newArrivals.push(element);
         }
       });

        setProducts(newArrivals);

      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
       getProductData();
     }, []);

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 992 },
          items: 3,
          slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 991, min: 768 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 767, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };


    return (
        <>
        <Container fluid className='container-lg'>
        <h1 className='feature_title'>Featured Products</h1>
        <Carousel
        responsive={responsive}
        infinite={true}
        containerClass="carousel-container featured_col_special"
        itemClass="carousel-item-padding-40-px"
        >
            { 
                
                products.map(  products =>   {
                  
                  return (

                      <FeaturedCardItems
                      src= {"http://localhost:5000/products/photo/" + products._id }
                      title={products.product_Name}
                      price={products.product_Price}
                      discount={products.product_Discount}
                      id= {'/product-details/' + products._id}/>

                    ) 
                   }              
                )

                }
        </Carousel>
        </Container>
        </>
    )
}

export default Checking;
