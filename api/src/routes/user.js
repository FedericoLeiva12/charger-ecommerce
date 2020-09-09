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
server.post('/', (req,res,next)=>{
  const {email, password, name, lastName, address } = req.body
  User.create({
    email ,
    password 
  })
  .then((user)=>{
    user.addInfoUser({
      name  ,
      lastName ,
      address
    })
  })
  .then((createdUser)=>{
    res.send({
      text : 'User created succesfully!',
      createdUser : createdUser.dataValues
    })
  }).catch(err => {
    res.status(500).send({ text: err})
  })
})
// Modify Users