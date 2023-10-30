const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      const response = {
        //product response in array and count it
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "Get",
              url: "http://localhost:3000/product/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "product create successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "Get",
            url: "http://localhost:3000/product/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id")
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          Product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/product",
          },
        });
      } else {
        res.status(404).json({ message: "No value found in db" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  product
    .updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/product" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product Deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/product",
          body: { name: "string", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
