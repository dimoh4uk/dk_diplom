const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');

exports.index = async function (req, res) {
    res.render('contacts');
};

exports.formRequest = async function (req, res) {
    console.log("asdasdasd")
    const params = req.params;
    const backUrl = '/asdasdasasdasd';
    const text = `Ваша заявка успешно принята`

    res.render('thanks-page', {backUrl, text});
}