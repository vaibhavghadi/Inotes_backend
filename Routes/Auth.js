const express = require("express");
const app = express.Router();
const model = require("../database/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");
const middle = require("../middlewawre/middle");

const secret = "vaibhav";

app.post(
  "/register",
  [
    body("name", "enter proper name").isLength({ min: 3, max: 30 }),
    body("email", "enter proper email").isLength({ min: 12, max: 40 }),
    body("password", "enter proper password").isLength({ min: 6, max: 30 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    } else {
      const user = await model.find({
        $or: [{ email: req.body.email }, { password: req.body.password }],
      });
      if (user.length > 0) {
        return res
          .status(400)
          .json({ error: "username / email already exist" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const user = await model({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        user.save();
        const token1 = token.sign({ user }, secret);
        res.json({ token: token1 });
      }
    }
  }
);

app.post(
  "/login",
  [
    body("email", "enter proper email").isLength({ min: 10, max: 30 }),
    body("password", "enter proper password").isLength({ min: 6, max: 20 }),
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    } else {
      const user = await model.find({ email: req.body.email });
      if (user.length == 0) {
        return res.status(400).json({ error: " email is not registered" });
      }

      const compare = await bcrypt.compare(req.body.password, user[0].password);

      if (!compare) {
        return res.status(400).json({ error: "password mismatched" });
      } else {
        const token1 = token.sign({ user }, secret);
        res.json({ name: user[0].name, token: token1 });
      }
    }
  }
);

module.exports = app;
