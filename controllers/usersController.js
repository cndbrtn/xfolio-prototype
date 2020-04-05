const { User } = require('../models');

module.exports = {
    findAll: function (req, res) {
        User
            .find({})
            .then(users => {
                // console.log(users)
                res.json(users)
            })
            .catch(err => res.json(err))
    },
    findByUsername: function ({ params }, res) {
        User
            .findOne({ username: params.username })
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },
    findById: function ({ params }, res) {
        User
            .findById(params.id)
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },
    create: function ({ body }, res) {
        User
            .create(body)
            .then(newUser => res.json(newUser))
            .catch(err => res.json(err));
    },
    update: function ({ params, body }, res) {
        User
            .findOneAndUpdate({ _id: params.id }, body)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },
    remove: function ({ params }, res) {
        User
            .deleteOne(params.id)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    }
};