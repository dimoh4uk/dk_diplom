const {Op} = require("sequelize");
const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');
const {DateTime} = require('luxon');


exports.list = async function (req, res) {
    const activities = await models[mNames.activity].findAll({
        where: {
            to: {
                [Op.gt]: DateTime.local().toJSDate(),
            },
        },
        order: [
            ['id', 'DESC'],
        ],
    });

    res.render(`${mNames.activity}/list`, {activities: activities});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const activity = await models[mNames.activity].findByPk(params.id);

    const sourceLink = calculateSource(activity);
    const sourceModel = sourceLink.model;

    const newsSource = await sourceModel.findByPk(sourceLink.key);

    res.render(`${mNames.activity}/detail`, {activity: activity, source: newsSource});


    function calculateSource(news) {
        const department = {
            key: news[keys.departmentId],
            model: models[mNames.department],
        };
        const culturalInstitution = {
            key: news[keys.culturalInstitutionId],
            model: models[mNames.department],
        }

        return news[keys.departmentId] ? department : culturalInstitution
    }
}