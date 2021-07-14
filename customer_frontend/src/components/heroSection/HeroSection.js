import React from 'react'
import {Jumbotron , Button  } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import '../heroSection/HeroSection.css';
import imgeka from '../../images/hero1.jpg';

function HeroSection() {
  return (
    <>
    <Carousel className='hero-container'>
      <Carousel.Item>
        <img
          className="d-block w-100 heroImg"
          src={`${imgeka}?text=First slide&bg=373940`}
          alt="First slide"
        />
        <Carousel.Caption className='caption'>
          <h1>Knock! knock!</h1>
          <p>It’s free shipping around the corner...</p>
          <p>
            <Button  className='hero-btn' href="/all-items" variant="primary">Shop Now</Button>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 heroImg"
          src={`${imgeka}?text=Second slide&bg=282c34`}
          alt="Second slide"
        />

        <Carousel.Caption className='caption'>
          <h1>Knock! knock!</h1>
          <p>It’s free shipping around the corner...</p>
          <p>
            <Button  className='hero-btn' href="/all-items" variant="primary">Shop Now</Button>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 heroImg"
          src={`${imgeka}?text=Third slide&bg=20232a`}
          alt="Third slide"
        />

        <Carousel.Caption className='caption'>
          <h1>Knock! knock!</h1>
          <p>It’s free shipping around the corner...</p>
          <p>
            <Button  className='hero-btn' href="/all-items" variant="primary">Shop Now</Button>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    </>
  )
}

export default HeroSection;
