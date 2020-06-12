const models = require('../../models');
const mNames = require('../../core/models-names');

exports.list = async function (req, res) {
    let objects, tours;

    await Promise.all([
        models[mNames.culturalObject].findAll().then((date) => objects = date),
        models[mNames.tourObject].findAll().then((date) => tours = date),
    ]);

    res.render('districtCulture/list', {objects, tours});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const model = await models[params.modelName].findByPk(params.id);

    res.render(`districtCulture/detail`, {model});
}