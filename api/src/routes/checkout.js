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

//change the state of order
server.put("/check",(req, res) => {
  Checkout.findOne({
    where: { id: req.body.id },
    include: { model: User, include: InfoUser }
  })
  .then(order => {
    if(req.body.state === "shipping"|| req.body.state === "complete"){
      order.state = req.body.state;
      order.save();
      res.send(order);
      sendEmail({
        from: 'admin',
        to: order.user.email,
        subject: 'Charger Order Status',
        content: 'templeteState.html'
      }, {
        NAME: order.user.infoUser.name,
        ID: order.id,
        ORDER: order.state
      }).catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    })

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
  let user = null;

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
//Get Checkout
server.get("/check", (req, res) => {
  Checkout.findAll({ 
    include:[
      {model: ShoppingCart},
      {model:User, include: InfoUser}
    ]
  }).then((orders) => {
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
