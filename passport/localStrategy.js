const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')

const strategy = new LocalStrategy(
  {
    usernameField: "username" // not necessary, DEFAULT
  },
  function (username, password, done) {
    User.find({ username: username }).then((user) => {
      // if (err) {
      //   console.log('error in localStragy', err)
      //   return done(err);
      // }
      const validatePass = user[0].password
      console.log('user in localStrategy', user)
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, validatePass)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
