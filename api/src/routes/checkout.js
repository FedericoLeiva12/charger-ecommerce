const server = require("express").Router();
const sendEmail = require("../services/email");
const { isAuthenticated } = require("../passport.js");
const stripe = require('../services/stripe')

const {
  Checkout,
  ShoppingCart,
  User,
  
  InfoUser,
} = require("../db.js");



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
server.put("/check", (req, res) => {
  Checkout.findOne({
    where: { id: req.body.id },
    include: { model: User, include: InfoUser },
  })
    .then((order) => {
      if (req.body.state === "shipping" || req.body.state === "complete") {
        order.state = req.body.state;
        order.save();
        res.send(order);
        sendEmail(
          {
            from: "admin",
            to: order.user.email,
            subject: "Charger Order Status",
            content: "templeteState.html",
          },
          {
            NAME: order.user.infoUser.name,
            ID: order.id,
            ORDER: order.state,
          }
        ).catch((err) => {
          res.status(500).send({ text: "Internal error" });
          console.error(err);
        });
      } else {
        res.status(500).send({ text: "invalid state" });
      }
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
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
        include: InfoUser,
      });
    })
    .then((nuser) => {
      user = nuser;
      order.setUser(nuser);
      return order.setShoppingCart(shpcart);
    })
    .then(() => {
      return order.genToken();
    })
    // .then((norder) => {
    //   return sendEmail(
    //     {
    //       from: "checkout",
    //       to: user.email,
    //       subject: "Order confirmation",
    //       content: "template.html",
    //     },
    //     {
    //       NAME: user.infoUser.name,
    //       LINK: "http://localhost:3000/order/confirm/" + order.token,
    //       CART: Object.values(JSON.parse(content))
    //         .map(
    //           (product) =>
    //             `<li>${product.name} - $${product.price * product.amount} ($${
    //               product.price
    //             } x ${product.amount})</li>`
    //         )
    //         .join("\n"),
    //     }
    //   );
    // })
    .then(() => {
      res.send({ order: { ...order.dataValues, shoppingCart: shpcart } });
    })
    .catch((err) => {
      if (order) {
        order.destroy();
      }
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
  });
  //Stripe checkout
  server.post('/purchase/:orderId',  (req,res)=>{
    const {paymentMethod} = req.body
    const {orderId} = req.params
    let total = 0;
    let confirmation = null;
    let content;
    let checkout;

  ShoppingCart.findOne({
    where:{ checkoutId:orderId,},
    include:[Checkout]
  }).then(order=>{
    console.log(order)
    content =  JSON.parse(order.content)
    for(let product of content) {
    total += (product.amount * product. price)*100
    console.log(total)
    }
    checkout = order.checkout.dataValues
    console.log(checkout)
  })
  .then(() => {
    return stripe.paymentIntents.create({
      amount: total, 
      currency:'USD',
      confirm: true,
      payment_method: paymentMethod.id
    })
  }).then(conf => {
    confirmation = conf;
    console.log(req.user.email)
    return sendEmail({
      from: 'changer',
      to: req.user.email,
      subject: 'Charger payment confirmation',
      content: 'template.html'
    }, {
      NAME: req.user.name,
      LINK: 'http://localhost:3000/order/confirm/' + checkout.token,
      CART: Object.values(content).map(product => `<li>${product.name} - $${product.price * product.amount} ($${product.price} x ${product.amount})</li>`).join('\n'),
      CARD_NUMBER: paymentMethod.card.last4
    })
  })
  .then(() => {
    res.send(confirmation)
  })
  .catch((err) => {
    res.status(500).send({ text: "Internal error" });
    console.error(err);
  });
})
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
