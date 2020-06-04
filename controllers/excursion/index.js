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

    res.render(`${mNames.excursion}/detail`, {excursion, department, excursionId:params.id});
}

exports.formRequest = async function (req, res) {
    console.log("asdasdasd")
    const params = req.params;
    const backUrl = '/asdasdasasdasd';
    const excursion = {name: 'сплав на хуй'};
    const text = `Ваша заявка на экскурсию ${excursion.name} успешно принята`

    res.render('thanks-page', {backUrl, text});
}