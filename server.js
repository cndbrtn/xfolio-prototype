const express = require('express');
const dotenv = require('dotenv').config();
const passport = require('./config/passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnect = require('./dbConnect')
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
const result = dotenv;
if (result.error) throw result.error;

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session
app.use(session({
    secret: 's3j4k27d8',
    store: new MongoStore({ mongooseConnection: dbConnect }),
    resave: false,
    saveUninitialized: false
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
} else { // I needed this line to make it work in development, no idea why
    app.use(express.static('client/public'));
}

app.use(routes); // all dem routes

// start api server
app.listen(PORT, () => {
    console.log(`👀 API Server now listening on PORT ${PORT} 👀`)
});