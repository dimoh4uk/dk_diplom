const {Op} = require("sequelize");
const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');
const {DateTime} = require('luxon');


exports.list = async function (req, res) {
    const excursions = await models[mNames.excursion].findAll({
        where: {
            to: {
                [Op.gt]: DateTime.local().toJSDate(),
            }
        },
        order: [
            ['id', 'DESC'],
        ],
    });

    res.render(`${mNames.excursion}/list`, {excursions});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const excursion = await models[mNames.excursion].findByPk(params.id);
    const department = await models[mNames.department].findByPk(excursion[keys.departmentId]);

    res.render(`${mNames.excursion}/detail`, {excursion, department, excursionId: params.id});
}

exports.formRequest = async function (req, res) {
    const data = {...req.body, [keys.statusId]: 1};
    const excursion = await models[mNames.excursion].findByPk(data.excursionId);
    const backUrl = excursion.detailLink;
    const text = `Ваша заявка на экскурсию ${excursion.name} успешно принята`

    await models[mNames.excursionRequest].create(data);

    res.render('thanks-page', {backUrl, text});
}