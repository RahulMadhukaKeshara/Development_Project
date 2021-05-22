import React from 'react'
import {Jumbotron , Button} from 'react-bootstrap';
import '../components/HeroSection.css'

function HeroSection() {
  return (
    <>
      <Jumbotron className='hero-container'>
            <h1>Knock! knock!</h1>
            
            <p>
                It’s free shipping around the corner...
           </p>

            <p>
                <Button  className='hero-btn' variant="primary">Shop Now</Button>
           </p>

    </Jumbotron>
    </>
  )
}

export default HeroSection;
