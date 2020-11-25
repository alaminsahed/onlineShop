import React, { useState,useEffect } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../Component/Rating/Rating";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(()=>{
    const fetchProducts = async()=>{
     await axios.get(`/api/products/${id}`)
     .then(res=> setProduct(res.data));
    }
    fetchProducts();
},[])

  return (
    <div>
      <Link to="/">Go Back</Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Description: {product.description}</p>
            </ListGroup.Item>
            <ListGroup.Item>
            <h5>Price: ${product.price}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Available: {product.countInStock}</p>
              {product.countInStock<=0? <p style={{color:'red'}}>Out Of Stock</p>:<p style={{color:'green'}}>In Stock</p>}
            </ListGroup.Item>
            <ListGroup.Item>
             <Button className="btn-block cart-button" type="button" disabled={product.countInStock===0}>Add To Cart</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
