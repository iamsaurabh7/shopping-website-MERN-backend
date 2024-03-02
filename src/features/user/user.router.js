const express = require("express");
const User = require("./user.model");

const app = express.Router();

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (password === user.password) {
        res.status(200).send({
          token: `${email}_#_${user._id}_#_${password}`,
          user,
        });
      } else {
        res.status(401).send(`Authorization failed , wrong password`);
      }
    } else {
      res.status(404).send(`user with ${email} not found`);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, name, age } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send(`cannot create user with existing email ${email}`);
    }
    const user = await User.create({
      email,
      password,
      name,
      age,
    });
    res.status(201).send({
      token: `${email}_#_${password}`,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = app;
