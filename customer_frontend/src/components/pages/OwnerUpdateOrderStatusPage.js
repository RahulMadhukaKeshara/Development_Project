import React from 'react';
import '../../App.css';
import Footer from '../footer/Footer';
import UpdateOrderStatus from '../owner_handleOrders/UpdateOrderStatus';


function OwnerUpdateOrderStatusPage() {
  return (
    <>
      <UpdateOrderStatus/>
      <Footer/>
    </>
  )
}

export default OwnerUpdateOrderStatusPage;