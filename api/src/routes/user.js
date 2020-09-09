const server = require('express').Router();
const { User, InfoUser, Roles } = require('../db.js');

// All users
server.get('/', (req, res, next) => {
  User.findAll({include: InfoUser})
    .then(users => {
      res.status(200).render(users)
    })
    .catch(next)
})
// Create Users

// Modify Users