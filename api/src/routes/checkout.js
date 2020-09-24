const server = require("express").Router();
const { isAuthenticated } = require("../passport.js");
const { Checkout, ShoppingCart, User, CreditCard } = require("../db.js");

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
    state: "closed",
  })
    .then((shopcart) => {
      shpcart = shopcart;
      console.log(shpcart);
      return Checkout.create();
    })
    .then((norder) => {
      order = norder;
      return User.findOne({
        where: {
          id,
        },
      });
    })
    .then((user) => {
      order.setUser(user);
      return order.setShoppingCart(shpcart);
    })
    .then((newOrder) => {
      res.send({ order: { ...order.dataValues, shoppingCart: shpcart } });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});
//Modify cart
/* server.put("/modifyCart/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { content } = req.body;
  shoppingCart
    .findOne({
      where: {
        orderId,
      },
    })
    .then((cart) => {
      cart
        .update({
          content,
        })
        .then((newCart) => {
          res.send(newCart);
        })
        .catch((err) => {
          res.status(500).send({ text: "Internal error" });
          console.error(err);
        });
    });
}); */

// Set Payment and Shipping
server.put("/payment/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { paymentMethod, shippingAdress } = req.body;
  Checkout.findOne({ where: { id: orderId } })
    .then((order) => {
      order.update({
        paymentMethod,
        shippingAdress,
      });
    })
    .then((orderUpdated) => {
      res.send(orderUpdated);
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});
module.exports = server;
