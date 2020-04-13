const mongoose = require("mongoose");
const { User } = require("../models");
const bcrypt = require('bcryptjs')

// This file empties the Posts collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/artdb");

const encrypt = password => {
    return bcrypt.hashSync(password, 10)
}

const pass1 = encrypt("password");
const pass2 = encrypt("password");
const pass3 = encrypt("password");

const userSeed = [
    {
        username: "username",
        email: "user@email.com",
        password: pass1,
        journal: [],
        works: [],
        favorites: []
    },
    {
        username: "cndbrtn",
        email: "cndbrtn@email.com",
        password: pass2,
        journal: [],
        works: [],
        favorites: []
    },
    {
        username: "buttbutt",
        email: "buttbutt@email.com",
        password: pass3,
        journal: [],
        works: [],
        favorites: []
    }
];

User.remove({})
    .then(() => User.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });