const {Op} = require('sequelize');
const models = require('../../models');
const mNames = require('../../core/models-names');
const helpers = require('../../core/helpers');

exports.search = async function (req, res) {
    const value = req.body.value;

    if (!value) {
        console.log()
        return res.json([]);
    }

    return res.json(
        await Promise.all([
            models[mNames.news].findAll(fidMethod(value)),
            models[mNames.activity].findAll(fidMethod(value)),
            models[mNames.service].findAll(fidMethod(value)),
        ]).then((resp) => helpers.flatten(resp))
    );

    function fidMethod(value) {
        return {
            where: {
                name: {
                    [Op.substring]: value,
                },
            },
            attributes: ['id', 'name', 'detailLink'],
            limit: 5,
        }
    }
};
