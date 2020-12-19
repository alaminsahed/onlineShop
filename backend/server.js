import express from 'express';
import connectionDB from './Config/db.js';
import dotenv from 'dotenv';

import ProductRoute from './Routes/ProductsRoute.js';

import {notFound,errorHandler} from './MiddleWare/ErrorMiddlewire.js';

const app = express();
dotenv.config();
connectionDB();

app.get('/',(req,res)=>{
    res.send('API is running');
})

app.use('/api/products', ProductRoute)

app.use(notFound)

app.use(errorHandler)

// app.get('/api/products',(req,res)=>{
//     res.json(products);
// })

// app.get('/api/products/:id',(req,res)=>{
//     const product = products.find(p => p._id === req.params.id);
//     res.json(product);
// })

const Port = process.env.PORT || 5000;

app.listen(Port, console.log(`Server running  ${Port}`));