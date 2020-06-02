const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');

exports.index = async function (req, res) {
    // const activities = await models[mNames.activity].findAll();

    res.render('contacts');
};