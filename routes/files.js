const path = require('path');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/:id/:fileName', async function (req, res, next) {
    const params = req.params;
    const filePath = `/${params.id}/${params.fileName}`;

    res.sendFile(path.join(__dirname, '../loaded/files', filePath));
});

module.exports = router;