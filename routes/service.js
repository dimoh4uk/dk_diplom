const express = require('express');
const router = express.Router();
const controllers = require('../controllers/service');

router.get('/', controllers.list);
router.get('/:id', controllers.detail);
router.post('/request', controllers.formRequest);

module.exports = router;
