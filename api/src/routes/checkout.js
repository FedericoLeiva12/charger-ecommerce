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

  // Auxiliars
  let order = null;
  let shpcart = null;

  ShoppingCart.create({
    content,
  }).then((shopcart) => {
    shpcart = shopcart;
    return Checkout.create()
  }).then((norder) => {
    order = norder;
    return User.findOne({
      where: {
        id
      }
    })
  }).then((user) => {
    order.setUser(user);
    return order.setShoppingCart(shpcart);
  }).then((newOrder) => {
    res.send({ order: {...order.dataValues, shoppingCart: shpcart} });
  }).catch((err) => {
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
