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

// if user hit unknown path
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//if response get some error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
