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
});

router.post('/confirm/:id', (req, res) => {
    const { id } = req.params;

    Checkout.findOne({
        where: {
            id
        }
    }).then(checkout => {
        if(checkout && checkout.state === 'pending') {
            checkout.state = 'processing';
            return checkout.save();
        } else {
            res.status(400).send({ message: 'Invalid id' });
        }
    }).then(() => {
        res.send({ success: true });
    }).catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Interna error.'});
    })
});

module.exports = router;