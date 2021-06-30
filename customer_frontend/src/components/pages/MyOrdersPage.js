import React from 'react';
import '../../App.css';
import Footer from '../footer/Footer';
import MyOrders from '../customer_handleOrders/MyOrders';


function MyOrdersPage() {
  return (
    <>
      <MyOrders/>
      <Footer/>
    </>
  )
}

export default MyOrdersPage;