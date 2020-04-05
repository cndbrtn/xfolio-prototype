const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(function (username, password, done) {

    console.log('username', username);
    console.log('password', password);
    // takes in username and password to search database by username to validate entered password
    // against encrypted password in the db
    User.find({ username: username }).then(function (dbUser) {
        // if an entry for the username is not found do this
        console.log("dbUser in passportk", dbUser)
        const validatePass = dbUser[0].password

        // console.log("bcrypt attempt", bcrypt.compareSync(password, validatePass))
        if (!dbUser) {
            return done(null, false, {
                message: "invalid username"
            });
        // if a matching username is found run the method to validate
        } else if (!bcrypt.compareSync(password, validatePass)) {
            return done(null, false, {
                message: "invalid password"
            });
        }

        return done(null, dbUser);
    });
}
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;