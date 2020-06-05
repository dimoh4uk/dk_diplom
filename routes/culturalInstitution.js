const express = require('express');
const router = express.Router();
const controllers = require('../controllers/culturalInstitution');

router.get('/', controllers.list);
router.get('/:id', controllers.detail);
router.get(`/:id/:model`, controllers.part);

module.exports = router;
