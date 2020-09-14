const server = require("express").Router();
const { Checkout, ShoppingCart, User } = require("../db.js");

//getCarts
server.get("/", (req, res) => {
  ShoppingCart.findAll().then((shpcart) => {
    res.send(shpcart);
  });
});

//postCarts
server.post("/", (req, res) => {
  const { content } = req.body;
  const { sessionToken } = req.body;
  const useremail = new Buffer(sessionToken, "hex").toString().split(":")[0];
  ShoppingCart.create({
    content,
  })
    .then((shpcart) => {
      Checkout.create()
        .then((order) => {
          User.findOne({
            where: {
              email: useremail,
            },
          }).then((user) => {
            order.setUser(user);
          });
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
