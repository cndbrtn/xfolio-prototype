const router = require('express').Router();

const { generateGetUrl, generatePutUrl } = require('../awsUpload');

router.get('/generate-get-url', (req, res) => {
    const { Key } = req.query;
    generateGetUrl(Key)
        .then(getUrl => res.send(getUrl))
        .catch(err => res.send(err))
});

router.get('/generate-put-url', (req, res) => {
    // console.log('generate-put-url req', req.query)
    // console.log('generate-put-url res', res)
    const { Key, ContentType } = req.query;
    generatePutUrl(Key, ContentType)
        .then(putUrl => {
            console.log('putUrl', putUrl)
            res.send(putUrl)
        })
        .catch(err => res.send(err))
})

router.post('/upload', async (req, res) => {
    if (!req.files) {
        return res.status(400).send("No file was uploaded")
    }
    console.log('req.files', req.files)
})

module.exports = router;