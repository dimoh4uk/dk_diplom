const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');

exports.list = async function (req, res) {
    const newses = await models[mNames.news].findAll({
        order: [
            ['id', 'DESC'],
        ],
    });

    res.render('news/list', {newses: newses});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const news = await models[mNames.news].findByPk(params.id);

    const sourceLink = calculateSource(news);
    const sourceModel = sourceLink.model;

    const newsSource = await sourceModel.findByPk(sourceLink.key);

    res.render('news/detail', {news: news, source: newsSource});

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
