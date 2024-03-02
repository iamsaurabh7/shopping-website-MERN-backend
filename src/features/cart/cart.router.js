const express = require("express");
const Cart = require("./cart.model");
const User = require("../user/user.model");

const app = express.Router();
const authMiddleware = async (req, res, next) => {
  let token = req.headers.token;
  if (!token) {
    res.send("missing token");
  }
  let [email, password] = token.split("_#_");
  //   console.log(email, password);

  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      if (password === user.password) {
        req.userId = user.id;
        next();
      } else {
        res.status(401).send(`Authorization failed , wrong password`);
      }
    } else {
      res.status(404).send(`user with ${email} not found`);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

app.use(authMiddleware);

app.get("/", async (req, res) => {
  try {
    let carts = await Cart.find({ user: req.userId }).populate([
      // "user", //user is not usually required bcoz frontend already has it
      "product",
    ]);
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    let cart = await Cart.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/", async (req, res) => {
  try {
    let { quantity, product } = req.body;
    // Update the quantity of the product in the cart
    let updatedCart = await Cart.findOneAndUpdate(
      { user: req.userId, product: product },
      { quantity: quantity },
      { new: true }
    ).populate("product");

    if (!updatedCart) {
      return res.status(404).send("Cart item not found");
    }

    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/", async (req, res) => {
  try {
    let { product } = req.body;
    // delete the product in the cart
    let updatedCart = await Cart.findOneAndDelete(
      { user: req.userId, product: product },
      { new: true }
    ).populate("product");

    if (!updatedCart) {
      return res.status(404).send("Cart item not found");
    }

    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
