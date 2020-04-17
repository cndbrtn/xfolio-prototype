const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
const awsRoutes = require('./aws');

// API Routes
router.use('/api', apiRoutes);

// AWS generate url routes
router.use(awsRoutes)

// If no API routes are hit, send the React app
router.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

module.exports = router;