const models = require('../../models');
const mNames = require('../../core/models-names')

exports.index = async function (req, res) {
    const newses = await models[mNames.news].findAll({limit: 5});
    const activities = await models[mNames.activity].findAll({limit: 5});

    res.render('index', {newses: newses, activities: activities});
};