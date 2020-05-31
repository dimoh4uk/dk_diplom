const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index/index.controller');

router.get('/', controllers.index);

module.exports = router;

