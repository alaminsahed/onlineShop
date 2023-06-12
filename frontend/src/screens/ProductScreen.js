import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Accordion,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import "../components/css/Nav.css";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Price: ${product.price}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Available: {product.countInStock}</p>
                  {product.countInStock <= 0 ? (
                    <p style={{ color: "red" }}>Out Of Stock</p>
                  ) : (
                    <p style={{ color: "green" }}>In Stock</p>
                  )}
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option keys={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block btn btn-success cart-button"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className="review-section">
            <Col md={6}>
              <h2 className="show-review">Product Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                <Row>
                  <Col>
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <p>{review.createdAt.substring(0, 10)}</p>
                      </ListGroup.Item>
                    ))}
                  </Col>
                  <Col>
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <Rating value={review.rating} />
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </Col>
                </Row>
              </ListGroup>
            </Col>
            <Col md={6}>
              <Accordion defaultActiveKey="0" >
                <Card>
                  <Card.Header className="accordion-header">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="btn btn-success">
                      <b>Write Your Review</b>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item>

                          {successProductReview && (
                            <Message variant="success">
                              Review submitted successfully
                            </Message>
                          )}
                          {loadingProductReview && <Loader />}
                          {errorProductReview && (
                            <Message variant="danger">
                              {errorProductReview}
                            </Message>
                          )}
                          {userInfo ? (
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                >
                                  <option value="">Select...</option>
                                  <option value="1">Poor</option>
                                  <option value="2">Fair</option>
                                  <option value="3">Good</option>
                                  <option value="4">Very Good</option>
                                  <option value="5">Excellent</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId="comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  row="3"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                              <Button
                                disabled={loadingProductReview}
                                type="submit"
                                variant="success"
                                className="cart-button"
                              >
                                Submit
                              </Button>
                            </Form>
                          ) : (
                            <Message>
                              Please <Link to="/login">sign in</Link> to write a
                              review{" "}
                            </Message>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
