const { Router } = require('express');
const { User, Checkout, ShoppingCart } = require('../db');

const router = Router();

router.get('/:user', (req, res) => {
    const { user } = req.params;
    User.findOne({
        where: {
            id: user
        },
        include: [{
            model: Checkout,
            include: ShoppingCart
        }]
    }).then(user => {
        res.send({ orders: user.checkouts })
    }).catch(err => {
        res.status(500).send({ message: 'Internal error'});
        console.error(err);
    })
})

module.exports = router;