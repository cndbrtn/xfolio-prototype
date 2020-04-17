const express = require('express');
const path = require('path')
require('dotenv').config();
require('./awsUpload');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnect = require('./dbConnect');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
// const result = dotenv;
// if (result.error) throw result.error;

['log', 'warn'].forEach(function (method) {
    var old = console[method];
    console[method] = function () {
        var stack = (new Error()).stack.split(/\n/);
        // Chrome includes a single "Error" line, FF doesn't.
        if (stack[0].indexOf('Error') === 0) {
            stack = stack.slice(1);
        }
        var args = [].slice.apply(arguments).concat([stack[1].trim()]);
        return old.apply(console, args);
    };
});

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors())

// session
app.use(session({
    secret: 's3j4k27d823489uihw0e8rhsiu98',
    store: new MongoStore({ mongooseConnection: dbConnect }),
    resave: false,
    saveUninitialized: false
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    // app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html')); })
}

app.use(routes); // all dem routes

// start api server
app.listen(PORT, () => {
    console.log(`👀 API Server now listening on PORT ${PORT} 👀`)
});