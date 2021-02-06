import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import offer from "../image/offer2.jpg";
import fish from "../image/color.jpg";
import arrival from "../image/gfish.jpg";

const ProductCarousel = () => {
  
  return (
    <Carousel pause="hover" className="bg-dark">
      <Carousel.Item>
        <img src={offer} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={arrival} alt="second slide" />

        <Carousel.Caption>
          <h3 style={{color:"white"}}>New Arrival</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={fish} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarousel;
