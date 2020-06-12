const models = require('../../models');
const mNames = require('../../core/models-names')
const {Op} = require('sequelize');
const {DateTime} = require('luxon');

exports.index = async function (req, res) {
    const newses = await models[mNames.news].findAll({
            order: [['id', 'DESC']],
            to: {
                [Op.gt]: DateTime.local().toJSDate(),
            },
            limit: 10,
        }
    );
    const activities = await models[mNames.activity].findAll(
        {
            order: [['id', 'DESC']],
            to: {
                [Op.gt]: DateTime.local().toJSDate(),
            },
            limit: 10,
        }
    );

    res.render('index', {newses: newses, activities: activities});
};