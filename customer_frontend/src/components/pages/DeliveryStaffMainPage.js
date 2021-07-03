import React from 'react';
import '../../App.css';
import Footer from '../footer/Footer';
import DeliveryStaffCatCards from '../deliveryStaff_Categoies/DeliveryStaffCatCards';


function DeliveryStaffMainPage() {
  return (
    <>
      <DeliveryStaffCatCards/>
      <Footer/>
    </>
  )
}

export default DeliveryStaffMainPage;
