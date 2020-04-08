const express = require('express');
const dotenv = require('dotenv').config();

const result = dotenv;
if (result.error) throw result.error;

const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
} else {
    app.use(express.static('client/public'))
}

app.use('/', routes);

mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost/artdb');

app.listen(PORT, () => {
    console.log(`API Server now listening on PORT @ http://localhost:${PORT}`)
})