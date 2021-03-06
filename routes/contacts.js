const express = require('express');
const router = express.Router();
const controllers = require('../controllers/contacts');

router.get('/', controllers.index);
router.post('/request', controllers.formRequest);

module.exports = router;

