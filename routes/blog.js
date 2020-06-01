const express = require('express');
const router = express.Router();
const Client = require('../models/client')

router.get('/blog.html', async function (req, res, next) {
  res.render('blog', {title: 'blog', clients: await Client.findAll()});
});

module.exports = router;
