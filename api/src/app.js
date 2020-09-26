const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const routes = require("./routes/index.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session')
const { User, InfoUser } = require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(
  cookieParser(
    "changersupersecretcodethatyoucantreadpleasedontreadthatpleasepleasepleeeease"
  )
);
server.use(
  expressSession({
    secret:
      "changersupersecretcodethatyoucantreadpleasedontreadthatpleasepleasepleeeease",
    resave: true,
    saveUninitialized: true,
  })
);
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  next();
});

// Passport configuration
server.use(passport.initialize());
server.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({
        where: {
          email: email,
        },
        include: [InfoUser],
      })
        .then((user) => {
          if (user) {
            if (user.password === password) {
              return done(null, {
                email: user.email,
                ...user.infoUser.dataValues,
                ...(user.roles ? user.roled.dataValues : {}),
                id: user.id,
              });
            } else {
              return done(new Error("Password incorrect"));
            }
          } else {
            return done(new Error("User not found"), null);
          }
        })
        .catch((err) => {
          console.error(err);
          return done(new Error("Internal error"), null);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({
    where: {
      id,
    },
    include: [InfoUser],
  })
    .then((user) => {
      if (user) {
        return done(null, {
          email: user.email,
          ...user.infoUser.dataValues,
          id: user.id,
          rol: user.rol,
        });
      } else {
        return done(new Error("User not found"), null);
      }
    })
    .catch((err) => {
      console.error(err);
      return done(new Error("Internal error"), null);
    });
});




//Google login

server.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

passport.use(new GoogleStrategy({
  clientID: "154532621294-9u25ju9euevc23akcsa0379mb8tv475u.apps.googleusercontent.com",
  clientSecret: "1MFA1SvOPhx8G1v8v8buSImC",
  callbackURL: "http://localhost:3000/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({
    where: {
      googleId: profile.id,
    },
    include: [InfoUser],
  }), (err, user)=> {
    return done(err, user);
  };
}
));


server.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

server.get('/google/callback',passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



  
  server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;
