import React from 'react';
import '../../App.css';
import Footer from '../footer/Footer';
import ViewOrders from '../owner_handleOrders/ViewOrders';


function OwnerViewOrdersPage() {
  return (
    <>
      <ViewOrders/>
      <Footer/>
    </>
  )
}

export default OwnerViewOrdersPage;