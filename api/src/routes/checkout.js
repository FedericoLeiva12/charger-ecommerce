const server = require("express").Router();
const sendEmail = require('../services/email');
const { isAuthenticated, isAdmin } = require("../passport.js");

const { Checkout, ShoppingCart, User, CreditCard, InfoUser, Product } = require("../db.js");

// Check if is logged
server.get("/getuser", isAuthenticated, (req, res) => {
  res.send({ user: req.user, logged: true });
});

//getCarts
server.get("/", isAdmin,(req, res) => {
  ShoppingCart.findAll().then((shpcart) => {
    res.send(shpcart);
  });
});

//change the state of order
server.put("/check", isAdmin,(req, res) => {
  if(req.body.state === 'canceled') {
    return res.status(400).send('Use the correct way to cancel a order.');
  }

  if(['pending', 'processing', 'shipping', 'completed', 'canceled'].indexOf(req.body.state) < 0) {
    return res.status(400).send({ text: 'Invalid params.' });
  }

  Checkout.findOne({
    where: { id: req.body.id },
    include: { model: User, include: InfoUser }
  })
  .then(order => {
    if(order.state === 'completed' || order.state === 'canceled') {
      return res.status(400).send({ text: 'You can\'t modify canceled or completed orders.'});
    }

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
  let productsWithAmount = null;
  let hasStock = true;

  ShoppingCart.create({
    content,
  })
    .then((shopcart) => {
      shpcart = shopcart;
      productsWithAmount = shpcart.getProductsWithAmount();
      productsWithAmount.map(async prod => {
        let product = await Product.findOne({where: { id: prod[0] }});
        if(product.stock < prod[1]) hasStock = false;
      })
      if(hasStock)
        return Checkout.create();
      else {
        shpcart.destroy();
        res.status(400).send({text: 'No stock, please check your products.'});
      }
    })
    .then((norder) => {
      if(!hasStock) return;
      order = norder;
      return User.findOne({
        where: {
          id,
        },
        include: InfoUser
      });
    })
    .then((nuser) => {
      if(!hasStock) return;
      user = nuser;
      order.setUser(nuser);
      return order.setShoppingCart(shpcart);
    }).then(() => {
      if(!hasStock) return;
      return order.genToken();
    // }).then((norder) => {
    //   return sendEmail({
    //     from: 'checkout',
    //     to: user.email,
    //     subject: 'Order confirmation',
    //     content: 'template.html'
    //   }, {
    //     NAME: user.infoUser.name,
    //     LINK: 'http://localost:3000/order/confirm/' + order.token,
    //     CART: Object.values(JSON.parse(content)).map(product => `<li>${product.name} - $${product.price * product.amount} ($${product.price} x ${product.amount})</li>`).join('\n')
    //   })
    }).then(() => {
      if(!hasStock) return;

      productsWithAmount.map(async prod => {
        let product = await Product.findOne({where: { id: prod[0] }});
        product.stock -= prod[1];
        product.save();
      });

      res.send({ order: { ...order.dataValues, shoppingCart: shpcart } })
    }).catch((err) => {
      if(order) {
        order.destroy();
      }
      if(shpcart) {
        shpcart.destroy();
      }
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});

// Cancel Checkout
server.delete('/:id', (req, res) => {
  const { id } = req.params;

  let productsWithAmount = null;
  let checkout = null;

  Checkout.findOne({ where: {id}, include: ShoppingCart })
    .then(check => {
      checkout = check;
      productsWithAmount = check.shoppingCart.getProductsWithAmount();

      productsWithAmount.map(async prod => {
        let product = await Product.findOne({where: { id: prod[0] }});
        product.stock += prod[1];
        product.save();
      });

      checkout.state = 'canceled';
      return checkout.save();
    }).then(() => {
      res.send({ success: true, order: id })
    }).catch(err => {
      console.error(err);
      res.status(500).send({ text: 'Error canceling order' });
    });

})
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
