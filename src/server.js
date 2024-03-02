require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const userRoute = require("./features/user/user.router");
const productRoute = require("./features/product/product.router");
const cartRoute = require("./features/cart/cart.router");

const connect = require("./config/db");
const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));

app.use(express.json());
app.use(cors());
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

app.listen(PORT, async () => {
  await connect();
  console.log(`Listening to http://localhost:${PORT}`);
});
