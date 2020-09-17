const passport = require("passport");
const server = require("express").Router();
const { User, InfoUser } = require("../db.js");
const { isAuthenticated, isNotAuthenticated } = require("../passport");

// All users
server.get("/", (req, res, next) => {
  User.findAll({ include: [InfoUser, Checkout] })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});

// Logout
server.get("/logout", isAuthenticated, (req, res) => {
  req.logOut();
  res.send({ message: "logout" });
});

// Login
server.post(
  "/login",
  isNotAuthenticated,
  passport.authenticate("local"),
  (req, res) => {
    res.send({ user: req.user, logged: true });
  }
);

// Check if is logged
server.get("/getuser", isAuthenticated, (req, res) => {
  res.send({ user: req.user, logged: true });
});

// Create Users
server.post("/", (req, res, next) => {
  const { email, password, name, lastName, address } = req.body;
  console.log(req.body);

  if (!email || !password || !name || !lastName || !address) {
    return res.status(400).send({ text: "Invalid data" });
  }

  User.create({
    email,
    password,
  })
    .then((createdUser) => {
      return createdUser.createInfoUser({
        name,
        lastName,
        address,
      });
    })
    .then((createdUser) => {
      res.status(200).send({
        text: "User created succesfully!",
        createdUser: createdUser.dataValues,
      });
    })
    .catch((err) => {
      res.status(500).send({ text: err });
    });
});

// Modify Users
server.put("/:id", (req, res) => {
  const { email, password, name, lastName, address } = req.body;
  const { id } = req.params;
  if (!id || !email || !password || !name || !lastName || !address) {
    return res.status(400).send({ text: "Invalid data" });
  }

  let user = null;

  User.findOne({
    where: {
      id: id,
    },
    include: InfoUser,
  })
    .then((userFinded) => {
      console.log(user);
      user = userFinded;
      user.email = email;
      user.password = password;
      user.infoUser.name = name;
      user.infoUser.lastName = lastName;
      user.infoUser.address = address;

      return user.save();
    })
    .then((user) => {
      return user.infoUser.save();
    })
    .then((userUpdated) => {
      res.send({ text: "User updated", userUpdated: userUpdated.dataValues });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});

//Remove Users

server.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ text: "Invalid id" });
  }

  User.destroy({
    where: {
      id: parseInt(id),
    },
  })
    .then(() => {
      res.send({ text: "User deleted" });
    })
    .catch(() => {
      res.status(500).send({ text: "Internal error" });
    });
});

module.exports = server;
