const express = require('express');
const router = express.Router();
const Client = require('../models/client')

/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('index', {title: 'Express', clients: await Client.findAll()});
});

module.exports = router;
