const router = require('express').Router();
const { findAll, findByUsername, findById, create, update, remove } = require('../../controllers/usersController');

router.route('/:username')
    .get(findByUsername)

router.route('/:id')
    .get(findById)

router.route('/')
    .get(findAll)
    .put(update)
    .delete(remove)

module.exports = router;