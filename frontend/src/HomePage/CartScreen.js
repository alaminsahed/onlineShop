import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Actions/CartAction";
import { Row, Col, ListGroup, Image,Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../Component/Message/Message.js";
import CartCss from "./HomeCSS/CartCss.css";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItem } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id)=>{
    console.log('remove');
  }

  const checkoutHandler = () =>{
      history.push('/login?redirect=shipping')
  }

  return (
    <div>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItem.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItem.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} className="cart-img" fluid/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option keys={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}><i className="fas fa-trash"></i></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
             <ListGroup.Item>
                <h2>Total Items: ({cartItem.reduce((acc, item) => acc + item.qty,0)})</h2>
                <br/>
                <h6>Total Price:</h6>
                {cartItem.reduce((acc, item)=> acc+ item.qty * item.price,0).toFixed(0)}
             </ListGroup.Item>
             <ListGroup.Item>
                 <Button type='button' className='btn-block' disabled={cartItem.length === 0} onClick={checkoutHandler}>
                 Proceed to Checkout
                 </Button>
             </ListGroup.Item>
            </ListGroup>
                            
        </Card>
        
        </Col>
        
      </Row>
    </div>
  );
};

export default CartScreen;
