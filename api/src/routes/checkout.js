const server = require("express").Router();
const { Checkout, ShoppingCart } = require("../db.js");

//getCarts
server.get("/", (req, res) => {
  ShoppingCart.findAll().then((shpcart) => {
    res.send(shpcart);
  });
});

//postCarts
server.post("/", (req, res) => {
  const { content } = req.body;

  ShoppingCart.create({
    content,
  })
    .then((shpcart) => {
      res.send(shpcart);
      console.log(content);
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});
module.exports = server;
