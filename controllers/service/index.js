const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');

exports.list = async function (req, res) {
    const services = await models[mNames.service].findAll({
        order: [
            ['id', 'DESC'],
        ],
    });

    res.render(`${mNames.service}/list`, {services});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const service = await models[mNames.service].findByPk(params.id);

    const sourceLink = calculateSource(service);
    const sourceModel = sourceLink.model;

    const source = await sourceModel.findByPk(sourceLink.key);

    res.render('service/detail', {service, source});


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

exports.formRequest = async function (req, res) {
    console.log("asdasdasd")
    const params = req.params;
    const backUrl = '/asdasdasasdasd';
    const excursion = {name: 'сплав на хуй'};
    const text = `Ваша заявка на экскурсию ${excursion.name} успешно принята`

    res.render('thanks-page', {backUrl, text});
}