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

//change the state of order
server.put("/check",(req, res) => {
  console.log(req.body);
  Checkout.findByPk(req.body.id)
  .then(order => {
    if(req.body.state === "shipping"|| req.body.state === "complete"){
      order.state = req.body.state;
      order.save();
      res.send(order);
    }else{
      res.status(500).send({ text: "invalid state"});
    }
  })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    })
})

//postCarts
server.post("/", (req, res) => {
  const { content } = req.body;
  const id = req.user.id;

  // Auxiliars
  let order = null;
  let shpcart = null;

  ShoppingCart.create({
    content,
  })
    .then((shopcart) => {
      shpcart = shopcart;
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
//Get Checkout
server.get("/check", (req, res) => {
  Checkout.findAll({ include: ShoppingCart }).then((orders) => {
    res.send(orders);
  });
});
// Post creditCard
server.post("/addcard/:id", (req, res) => {
  const id = req.user.id;
  const { cardNumber, cardName, expirationDate, CCV, orderId } = req.body;

  const order = find;
  console.log(userId);
  User.findOne({
    where: {
      id,
    },
  }).then((loggedUser) => {
    loggedUser
      .createCreditCard({
        cardNumber,
        cardName,
        expirationDate,
        CCV,
      })
      .then((userWithCard) => {
        console.log(userWithCard);
        res.send(userWithCard);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
});
//getcreditcards
server.get("/creditcards", (req, res) => {
  CreditCard.findAll().then((cards) => {
    res.send(cards);
  });
});
module.exports = server;
