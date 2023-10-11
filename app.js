const express = require("express");
const app = express(); //just execute like a function
const morgan = require('morgan');

const productRoutes = require("./api/routes/product");
const orderRoutes = require("./api/routes/order");

app.use(morgan('dev'));

//"use()" is used for middleware
// Routes which handle the requests
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

// app.use(req,res,next)=>{
//     const = new 
// }

// add new changes

module.exports = app;
