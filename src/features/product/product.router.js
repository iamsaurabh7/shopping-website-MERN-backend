const express = require("express");
const Product = require("./product.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let { limit = 10, page = 1 } = req.query;
  try {
    let products = await Product.find()
      .limit(limit)
      .skip(parseInt(page - 1) * parseInt(limit));
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
  //   const { name, description, price, quantity, image } = Product;
});
    
module.exports = app;
