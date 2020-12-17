import express from 'express';
import connectionDB from './Config/db.js';
import dotenv from 'dotenv';

import ProductRoute from './Routes/ProductsRoute.js';

const app = express();
dotenv.config();
connectionDB();

app.get('/',(req,res)=>{
    res.send('API is running');
})

app.use('/api/products', ProductRoute)

app.use((req,res,next)=>{
    const error = new Error(`Not Found- ${req.originalUrl}`)
    next(error)
})

app.use((err,req,res,next) =>{
    const statusCode = res.statusCode === 200? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production'? null : err.stack
    })
})

// app.get('/api/products',(req,res)=>{
//     res.json(products);
// })

// app.get('/api/products/:id',(req,res)=>{
//     const product = products.find(p => p._id === req.params.id);
//     res.json(product);
// })

const Port = process.env.PORT || 5000;

app.listen(Port, console.log(`Server running  ${Port}`));