import React from 'react';
import '../../App.css';
import Footer from '../footer/Footer';
import Invoice from '../generateReport/Invoice';


export default function GenerateInvoicePage() {
  return (

    <>
      <Invoice/>
      <Footer/>
    </>

  );
}