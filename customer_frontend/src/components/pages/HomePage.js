import React from 'react';
import '../../App.css';
import Categories from '../Categories';
import FeaturedProducts from '../FeaturedProducts';
import Footer from '../Footer';
import HeroSection from '../HeroSection';
import NewArrivals from '../NewArrivals';

export default function HomePage() {
  return (

    <>
      <HeroSection/>
      <Categories/>
      <FeaturedProducts/>
      <NewArrivals/>
      <Footer/>
    </>

  );
}
