import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./Product.css";

const Product = (props) => {
  const { _id, image, name, rating, numReviews, price } = props.product;
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`/products/${_id}`}>
          <Card.Img src={image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/products/${_id}`}>
            <Card.Title as="div">
              <h5 className="product-name">{name}</h5>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
             <Rating value={rating} text={`${numReviews} reviews`}/>
            </div>
          </Card.Text>

          <Card.Text as="h3">${price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
