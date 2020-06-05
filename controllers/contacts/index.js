const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');

exports.index = async function (req, res) {
    res.render('contacts');
};

exports.formRequest = async function (req, res) {
    const data = {...req.body, [keys.statusId]: 1};
    const backUrl = '/contacts';
    const text = `Ваша заявка успешно принята`;

    await models[mNames.feedback].create(data);

    res.render('thanks-page', {backUrl, text});
}