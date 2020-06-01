const express = require('express');
const router = express.Router();
const controllers = require('../controllers/news');

router.get('/', controllers.list);
router.get('/:id', controllers.detail);

module.exports = router;
