import express from 'express';
import connectionDB from './Config/db.js';
import products from './data/data.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
connectionDB();

app.get('/',(req,res)=>{
    res.send('API is running');
})

app.get('/api/products',(req,res)=>{
    res.json(products);
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
})

const Port = process.env.PORT || 5000;

app.listen(Port, console.log(`Server running  ${Port}`));