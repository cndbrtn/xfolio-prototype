const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')

const strategy = new LocalStrategy(
  {
    usernameField: "username" // not necessary, DEFAULT
  },
  function (username, password, done) {
    User.find({ username: username }).populate('journal works favorites').then((user) => {
      // console.log('user result on login', user)
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      } 
      // if (!user.password) {
      //   console.log('invalid user credentials')
      //   // return done(null, false, { message: 'Invalid user credentials' });
      // } 
      if (!bcrypt.compareSync(password, user[0].password)) {
        return done(null, false, { message: "Incorrect password" });
      } 
      
        return done(null, user);
      
    }).catch(err => {
      console.log('error -----------',err);
    });
  }
);

module.exports = strategy;
 