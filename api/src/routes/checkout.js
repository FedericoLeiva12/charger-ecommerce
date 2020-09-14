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
      Checkout.create()
        .then((order) => {
          return order.setShoppingCart(shpcart);
        })
        .then((newOrder) => {
          res.send(newOrder);
        });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});
//CreateCheckout
server.get("/check", (req, res) => {
  Checkout.findAll().then((orders) => {
    res.send(orders);
  });
});

module.exports = server;
