import React from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../data';
import Product from '../Component/Product/Product.js';


const HomePage = () => {
    return (
        <div>
           <marquee><h1>New Arrival</h1></marquee> 
           <Row>
                {products.map((product)=>(
                    <Col sm={12} md={6} lg={4} xl={3}>
                    {
                        <Product product={product}/>
                    }
                    </Col>
                )
                   
                )}
         
           </Row>
        </div>
    );
};

export default HomePage;