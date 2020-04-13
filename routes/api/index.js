const router = require('express').Router();
// const loginRoute = require('./login')
const artRoutes = require('./art');
const userRoutes = require('./user');
const journalRoutes = require('./journal');

// Book routes
router.use('/user', userRoutes);
router.use('/artwork', artRoutes)
// router.use('/login', loginRoute)
// router.use('/blog', journalRoutes);
// router.use('/gallery', artRoutes)


module.exports = router;