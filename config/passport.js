const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/user");
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(function (username, password, done) {

    console.log('username', username);
    console.log('password', password);
    // takes in username and password to search database by username to validate entered password
    // against encrypted password in the db
    User.findOne({ username: username }).then(function (user) {
        // if an entry for the username is not found do this
        console.log("user in passport", user)
        const validatePass = user[0].password

        if (!user) {
            return done(null, false, {
                message: "invalid username"
            });
        // if a matching username is found run the method to validate
        } else if (!bcrypt.compareSync(password, validatePass)) {
            return done(null, false, {
                message: "invalid password"
            });
        }

        return done(null, user);
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