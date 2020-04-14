const router = require('express').Router();
const { Journal } = require('../../models');

// router.get('/journal', (req, res) => {
//     Journal.get
// })

router.post('/', (req, res) => {
    console.log('/api/journal/ .post', req.body)
})

module.exports = router;