import React from 'react';
import '../../App.css';

import FeaturedProducts from '../FeaturedProducts';
import Footer from '../footer/Footer';
import HeroSection from '../HeroSection';
import NewArrivals from '../NewArrivals';

export default function HomePage() {
  return (

    <>
      <HeroSection/>
      <FeaturedProducts/>
      <NewArrivals/>
      <Footer/>
    </>

  );
}
