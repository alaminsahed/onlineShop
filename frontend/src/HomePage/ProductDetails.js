import React, { useState,useEffect } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../Component/Rating/Rating";
import {useDispatch, useSelector} from 'react-redux';
// import axios from "axios";
import {listProductDetails} from '../Actions/ProductActions.js';
import Loader from "../Component/Loader/Loader";
import Message from "../Component/Message/Message";

const ProductDetails = ({match}) => {
  // const { id } = useParams();
  // const [product, setProduct] = useState({});
  const dispatch = useDispatch()

  const productDetails = useSelector((state)=>state.productDetails);
  const {loading, error, product} = productDetails;

  useEffect(()=>{
    // const fetchProducts = async()=>{
    //  await axios.get(`/api/products/${id}`)
    //  .then(res=> setProduct(res.data))

    dispatch(listProductDetails(match.params.id))

    }
    // fetchProducts();
,[dispatch,match])

 
  return (
    <div>
      <Link to="/">Go Back</Link>
      {
        loading? <Loader/> : error? <Message variant="danger">{error}</Message>:( <Row>
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
        </Row>)
      }
     
    </div>
  );
};

export default ProductDetails;
