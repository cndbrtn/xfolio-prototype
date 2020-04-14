const router = require('express').Router();
const { Works, User } = require('../../models/index');
const mongoose = require('mongoose');


router.post('/', ({ body }, res) => {
    const { userId, url, title, postBody, tags } = body;
    console.log('body in newArt post', body);
    
    const work = new Works({
        _id: new mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(userId),
        img: url,
        title: title,
        description: postBody,
        tags: tags
    });

    Works.create(work).then(work => {
        console.log('create new Works res', work)
        return User.findOneAndUpdate({ _id: userId }, { $push: { works: work._id }}, { new: true })
    }).then(user => {
        console.log('updated user with work', user);
    })
})

router.get('/:username', (req, res) => {
    console.log('req body in /:username', req.body)
    User.findOne({ username: 'username' }).populate('works journal favorites').then(user => {
        console.log('get user and populate works', user)
        res.send(user)
    })
})

module.exports = router;