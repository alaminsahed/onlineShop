import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../data';

const ProductDetails = () => {
    const {id} = useParams();
    const product = data.find((p)=>p._id=== id)
    return (
        <div>
          <h1>{product.name}</h1>
        </div>
    );
};

export default ProductDetails;