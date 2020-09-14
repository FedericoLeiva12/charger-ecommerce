const { Router } = require('express');
const { User, Checkout } = require('../db');

const router = Router();

router.get('/:user', (req, res) => {
    const { user } = req.params;
    User.findOne({
        where: {
            id: user
        },
        include: Checkout
    }).then(user => {
        console.log(user);
    }).catch(console.error)
})

module.exports = router;