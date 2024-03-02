const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId, //_id
      ref: "product", //reference to the collection to establish the connection
      required: true, // it has to be true in order to establish the connection
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //_id
      ref: "user", //reference to the collection to establish the connection
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    // strictPopulate: false,
  }
);

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
