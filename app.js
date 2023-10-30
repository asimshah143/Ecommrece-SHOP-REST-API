const express = require("express");
const app = express(); //just execute like a function
const morgan = require("morgan");
const bodyParser = require("body-parser"); // handle to request body parms
const mongoose = require("mongoose");


const productRoutes = require("./api/routes/product");
const orderRoutes = require("./api/routes/order");
// const product = require("./api/models/product");

mongoose.connect(
  "mongodb+srv://node-shop:node-shop@node-rest-shop.yabwjjz.mongodb.net/?retryWrites=true&w=majority"
); 

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//header to allow access to the multiple clients
app.use((req, res, next) => {
  res.header("Access-control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (res.method === "OPITIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//"use()" is used for middleware
// Routes which handle the requests
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

// if user hit unknown path
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//if response get some error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
