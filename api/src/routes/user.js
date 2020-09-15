const server = require('express').Router();
const { User, InfoUser, Secure } = require('../db.js');
const { decrypt, generatePair } = require('../utils/index.js');

// All users
server.get('/', (req, res, next) => {
  User.findAll({include: InfoUser})
    .then(users => {
      res.status(200).send(users)
    })
    .catch(next)
});

// Login
server.post('/login', (req, res) => {
  const {email, password} = req.body;
  User.findOne({ where: { email: email }, include: InfoUser})
  .then(user => {
    if(user) {
      if(user.password === password) {
        res.send({ logged: true, sessionToken: new Buffer(email + ':' + password).toString('hex'), user: {
          id: user.id,
          name: user.infoUser.name,
          email: user.email,
          lastName: user.infoUser.lastName,
          address: user.infoUser.address
        }});
      } else {
        console.log(user.password, logData.password)
        res.send({ logged: false, text: 'Invalid password'});
      }
    } else {
      res.status(400).send({ text: 'User with that email don\'t exists' });
    }
  }).catch(console.error)
});

// Check if have a valid token
server.post('/checklog', (req, res) => {
  const { sessionToken } = req.body;

  const data = new Buffer(sessionToken, 'hex').toString();

  const [email, password] = data.split(':');

  User.findOne({ where: { email: email }, include: InfoUser})
  .then(user => {
    if(user) {
      if(user.password === password) {
        res.send({ logged: true, user: {
          id: user.id,
          name: user.infoUser.name,
          email: user.email,
          lastName: user.infoUser.lastName,
          address: user.infoUser.address
        }});
      } else {
        res.status(400).send({ logged: false, text: 'Invalid password'});
      }
    } else {
      res.status(400).send({ logged: false, text: 'User with that email don\'t exists' });
    }
  }).catch(console.error)
})


// Create Users
server.post('/', (req,res,next)=>{
  const {email, password, name, lastName, address } = req.body
  console.log(req.body)

  if(!email || !password || !name || !lastName || !address) {
		return res.status(400).send({ text: 'Invalid data' });
	}

  User.create({
    email ,
    password
  })
  .then((createdUser)=>{
    return createdUser.createInfoUser({
      name ,
      lastName ,
      address
    })
  })
  .then(createdUser => {
    res.status(200).send({
      text : 'User created succesfully!',
      createdUser : createdUser.dataValues
    })
  })
  .catch(err => {
    res.status(500).send({ text: err })
  })
});


// Modify Users
server.put('/:id', (req, res)=>{
  const {email, password, name, lastName, address} = req.body
  const {id} = req.params
  if( !id  || !email || !password || !name || !lastName || !address ) {
		return res.status(400).send({ text: 'Invalid data' });
  }

  let user = null;

  User.findOne({
    where : {
      id: id
    },
    include: InfoUser
  }).then(userFinded => {
    console.log(user)
    user = userFinded;
		user.email = email;
		user.password = password;
    user.infoUser.name = name;
    user.infoUser.lastName = lastName;
    user.infoUser.address = address;
    
    return user.save()
  })
  .then(user => {
    return user.infoUser.save()
  })
  .then(userUpdated => {
		res.send({ text: 'User updated', userUpdated: userUpdated.dataValues });
  })
  .catch(err => {
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