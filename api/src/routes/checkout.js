const server = require("express").Router();
const sendEmail = require('../services/email');
const { isAuthenticated } = require("../passport.js");
const { Checkout, ShoppingCart, User, CreditCard, InfoUser } = require("../db.js");

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
  let user = null;

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
        include: InfoUser
      });
    })
    .then((nuser) => {
      user = nuser;
      order.setUser(nuser);
      return order.setShoppingCart(shpcart);
    }).then(() => {
      return order.genToken();
    }).then((norder) => {
      return sendEmail({
        from: 'checkout',
        to: user.email,
        subject: 'Order confirmation',
        content: 'template.html'
      }, {
        NAME: user.infoUser.name,
        LINK: 'http://localost:3000/order/confirm/' + order.token,
        CART: Object.values(JSON.parse(content)).map(product => `<li>${product.name} - $${product.price * product.amount} ($${product.price} x ${product.amount})</li>`).join('\n')
      })
    }).then(() => {
      res.send({ order: { ...order.dataValues, shoppingCart: shpcart } })
    }).catch((err) => {
      if(order) {
        order.destroy();
      }
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
