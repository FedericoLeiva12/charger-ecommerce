const server = require("express").Router();
const { isAuthenticated } = require("../passport.js");
const { Checkout, ShoppingCart, User } = require("../db.js");

// Check if is logged
server.get("/getuser", isAuthenticated, (req, res) => {
  res.send({ user: req.user, logged: true });
});
//getCarts
server.get("/", (req, res) => {
  ShoppingCart.findAll().then((shpcart) => {
    res.send(shpcart);
  });
});

//postCarts
server.post("/", (req, res) => {
  const { content } = req.body;
  const id = req.user.id;
  ShoppingCart.create({
    content,
  })
    .then((shpcart) => {
      Checkout.create()
        .then((order) => {
          User.findOne({
            where: {
              id,
            },
          }).then((user) => {
            order.setUser(user);
          });
          return order.setShoppingCart(shpcart);
        })
        .then((newOrder) => {
          res.send({ order: newOrder });
        });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});
//CreateCheckout
server.get("/check", (req, res) => {
  Checkout.findAll({ include: ShoppingCart }).then((orders) => {
    res.send(orders);
  });
});

module.exports = server;
