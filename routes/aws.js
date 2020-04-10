const router = require('express').Router();

const { generateGetUrl, generatePutUrl } = require('../awsUpload');

router.get('/generate-get-url', (req, res) => {
    const { Key } = req.query;
    generateGetUrl(Key)
        .then(getUrl => res.send(getUrl))
        .catch(err => res.send(err))
});

router.get('/generate-put-url', (req, res) => {
    const { Key, ContentType } = req.query;
    generatePutUrl(Key, ContentType)
        .then(putUrl => res.send(putUrl))
        .catch(err => res.send(err))
})

module.exports = router;