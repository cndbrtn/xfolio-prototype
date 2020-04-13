const router = require('express').Router();
const { Works, User } = require('../../models/index');
const mongoose = require('mongoose');


router.post('/', ({ body }, res) => {
    console.log(body.userId);
    
    const work = new Works({
        _id: new mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(body.userId),
        img: body.url,
        title: body.title,
        body: body.body,
        tags: body.tags
    });

    work.save(err => {
        if (err) console.log('err', err)
    })
})

// router.get('/artwork', (req, res) => {
//     // res.send()
// })

module.exports = router;