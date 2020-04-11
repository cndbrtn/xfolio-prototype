const mongoose = require("mongoose");
const { User } = require("../models");

// This file empties the Posts collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactcms");

const userSeed = [
    {
        username: "username",
        email: "user@email.com",
        password: "password",
        journal: [],
        works: [],
        favorites: []

    },
    {
        username: "cndbrtn",
        email: "user@email.com",
        password: "password",
        journal: [],
        works: [],
        favorites: []
    },
    {
        username: "buttbutt",
        email: "user@email.com",
        password: "password",
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