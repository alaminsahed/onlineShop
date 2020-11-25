import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../Component/Product/Product.js';
import axios from 'axios';

const HomePage = () => {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        const fetchProducts = async()=>{
         await axios.get('/api/products')
         .then(res=> setProducts(res.data));
        }
        fetchProducts();
    },[])
    // console.log(products);
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