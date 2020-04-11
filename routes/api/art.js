const router = require('express').Router();
const { Works, User } = require('../../models/index');

router.post('/artwork', (req, res) => {
    console.log('nothing')
})

router.get('/artwork', (req, res) => {
    console.log(req)
    // console.log('/api/artwork post')
    // console.log('body', body)
    // console.log('user', user)
    // console.log('res', res)
    res.json(req);
})

module.exports = router;