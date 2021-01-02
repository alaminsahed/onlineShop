import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../Component/Product/Product.js";
import Loader from "../Component/Loader/Loader.js";
import Message from "../Component/Message/Message.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Actions/ProductActions";

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  // console.log(products);

  return (
    <div>
      {loading ? (
         <Loader/>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {<Product product={product} />}
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;
