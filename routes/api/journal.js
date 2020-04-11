const router = require('express').Router();
const { Journal } = require('../../models');

router.get('/journal', (req, res) => {
    Journal.get
})