import React from 'react';
import '../../App.css';
import FeaturedProducts from '../FeaturedProducts';
import HeroSection from '../HeroSection';
import NewArrivals from '../NewArrivals';

export default function HomePage() {
  return (

    <>
      <HeroSection/>
      <FeaturedProducts/>
      <NewArrivals/>
    </>

  );
}
