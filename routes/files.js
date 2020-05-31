const path = require('path');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/:modelName/:modelId/:fileName', async function (req, res, next) {
    const params = req.params;
    const filePath = `${params.modelName}/${params.modelId}/${params.fileName}`;

    res.sendFile(path.join(__dirname, '../loaded/files', filePath));
});

module.exports = router;