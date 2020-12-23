import React from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../Component/Product/Product.js';
import {useDispatch,useSelector} from 'react-redux';
import {listProducts} from '../Actions/ProductActions';


const HomePage = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const {loading,error,products} = productList;

    useEffect(()=>{
       dispatch(listProducts())
    },[dispatch])
    // console.log(products);

    

    return (
        <div>
        {loading? (
            <h2>Loading...</h2>
        ): error?(
            <h3>{error}</h3>
        ): <Row>
        {products.map((product)=>(
            <Col sm={12} md={6} lg={4} xl={3}>
            {
                <Product product={product}/>
            }
            </Col>
        )
           
        )}
 
   </Row>}
          
           
        </div>
    );
};

export default HomePage;