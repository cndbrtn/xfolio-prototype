const router = require('express').Router();
const { Journal, User } = require('../../models');
const mongoose = require('mongoose')

// router.get('/journal', (req, res) => {
//     Journal.get
// })

router.post('/', ({ body }, res) => {
    console.log('/api/blog/ .post', body);

    const post = new Journal({
        _id: new mongoose.Types.ObjectId,
        user: body.userId,
        title: body.title,
        body: body.body,
        tags: body.tags
    })
    Journal.create(post)
        .then(post => {
            // console.log('then post after create', post)
            return User.findOneAndUpdate({ _id: body.userId }, { $push: { journal: post._id } }, { new: true })
        })
        .then(user => {
            console.log('updated user', user)
        })
        .catch(err => console.log('err in /api/blog .post', err))
})

router.get('/:username', ({ params }, res) => {
    User.findOne({ username: params.username }).populate({ path: 'journal', options: { sort: { _id: -1 } } })
        .then(user => res.send(user))
        .catch(err => console.log('err in /api/blog/:username post route', err))
})

router.put('/:id', ({ body, params }, res) => {
    console.log('body in api journal update', body)
    console.log('params in api journal update', params)
    Journal.findByIdAndUpdate(params.id, { $set: { ...body } })
        .then(post => {
            console.log('res in api journal update', post)
        res.send(post)
    })
})

router.delete('/:id', ({ params, user }, res) => {
    // console.log('req in journal delete api', req);
    Journal.findByIdAndDelete(params.id)
        .then(() => {
            User.findByIdAndUpdate(user._id, { $pull: { journal: params.id } })
                .then(user => {
                res.send(user)
            })
    })
})

module.exports = router;