const models = require('../../models');
const mNames = require('../../core/models-names');

exports.list = async function (req, res) {
    const departments = await models[mNames.department].findAll();
    console.log("asdasd", JSON.stringify(departments));
    res.render(`${mNames.department}/list`, {departments: departments});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const department = await models[mNames.department].findByPk(params.id, {include: models[mNames.document]});

    res.render(`${mNames.department}/detail`, {department: department});
}
