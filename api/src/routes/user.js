const server = require('express').Router();
const { User, InfoUser, Roles } = require('../db.js');

// All users
server.get('/', (req, res, next) => {
  User.findAll({include: InfoUser})
    .then(users => {
      res.status(200).render(users)
    })
    .catch(next)
});
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
    }).status(201)
  }).catch(err => {
    res.status(500).send({ text: err })
  })
});
// Modify Users
server.put('/:id', (req, res)=>{
  const {email, password} = req.body
  const {id} = req.params
  if( !id  || !email || !password ) {
		return res.status(400).send({ text: 'Invalid data' });
  }
  User.findOne({
    where : {
      id: parseInt(id)
    }
  }).then(user => {
		user.email = email;
		user.password = password;

  }).then(user=>{
    user.setInfoUser({
      name  ,
      lastName ,
      address
    })
  }).then((user) => {
    user.save()
		res.send({ text: 'User updated.' });
	}).catch(err => {
		res.status(500).send({ text: 'Internal error' });
		console.error(err);
  }) 
});

//Remove Users

server.delete('/:id', (req, res) => {
	const { id } = req.params;

	if(!id) {
		return res.status(400).send({ text: 'Invalid id' });
	}

	User.destroy({
		where: {
			id: parseInt(id)
		}
	}).then(() => {
		res.send({ text: 'User deleted'});
	}).catch(() => {
		res.status(500).send({ text: 'Internal error'});
	})
});

module.exports = server;