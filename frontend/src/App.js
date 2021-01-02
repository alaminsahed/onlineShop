import React from 'react';
import Footer from './Component/Footer/Footer';
import Header from './Component/Header/Header';
import {Container} from 'react-bootstrap';
import HomePage from './HomePage/HomePage';
import ProductDetails from './HomePage/ProductDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CartScreen from './HomePage/CartScreen';


const App = () => {
  return (
    <div>
    <Router>
      <Header></Header>
      <Container>
      <main className="py-3">
      <Switch>
      <Route path='/' component={HomePage} exact/>
      <Route path='/products/:id' component={ProductDetails}/>
      <Route path= '/cart/:id?' component={CartScreen}/>
      </Switch>
      </main>
      </Container>
      <Footer></Footer>
      </Router>
    </div>
  );
};

export default App;