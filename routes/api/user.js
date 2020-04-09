const router = require('express').Router();
const { findAll, findByUsername, findById, create, update, remove } = require('../../controllers/usersController');
const passport = require('passport');

router.route('/login').post(function (req, res, next) {
        console.log('routes/login.js, login, req.body', req.body);
        next();
    },
        passport.authenticate('local'),
        (req, res) => {
            console.log('logged in', req.user);
            res.send(req.user);
});

router.route('/:username')
    .get(findByUsername);

router.route('/:id')
    .get(findById);

router.route('/')
    .get(findAll)
    .post(create)
    .put(update)
    .delete(remove);

module.exports = router;