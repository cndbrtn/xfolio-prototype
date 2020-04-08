const router = require('express').Router();
const artRoutes = require('./art');
const userRoutes = require('./user');
const journalRoutes = require('./journal');

// Book routes
router.use('/users', userRoutes);
// router.use('/blog', journalRoutes);
// router.use('/gallery', artRoutes)

router.post('/login', (req, res) => {

});

module.exports = router;