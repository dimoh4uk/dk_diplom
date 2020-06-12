const models = require('../../models');
const mNames = require('../../core/models-names');
exports.list = async function (req, res) {
    const tourObjects = await models[mNames.tourObject].findAll();

    res.render(`${mNames.tourObject}/list`, {tourObjects});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const tourObject = await models[mNames.tourObject]
        .findByPk(params.id);

    res.render(`${mNames.tourObject}/detail`, {tourObject});

}
