const express = require('express');
const router = express.Router();
const controllers = require('../controllers/districtCulture');

router.get('/', controllers.list);
router.get('/:modelName/:id', controllers.detail);

module.exports = router;

