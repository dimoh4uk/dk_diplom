const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');
const {Op} = require('sequelize');
const {DateTime} = require('luxon');

exports.list = async function (req, res) {
    const culturalInstitutions = await models[mNames.culturalInstitution].findAll();
    res.render(`${mNames.culturalInstitution}/list`, {culturalInstitutions});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const culturalInstitution = await models[mNames.culturalInstitution]
        .findByPk(params.id,
            {
                include: [
                    {
                        model: models[mNames.department]
                    },
                    {
                        model: models[mNames.news],
                        order: [['id', 'DESC']],
                        limit: 4,
                    },
                    {
                        model: models[mNames.activity],
                        order: [['id', 'DESC']],
                        to: {
                            [Op.gt]: DateTime.local().toJSDate(),
                        },
                        limit: 4,
                    },
                ]
            },
        );
    const director = await models[mNames.staffer].findOne({
        where: {
            [keys.roleId]: 3,
            [keys.culturalInstitutionId]: params.id
        },
    });

    const departments = culturalInstitution.departments;
    const activities = culturalInstitution.activities;
    const news = culturalInstitution.news;

    res.locals.allNewsHref = createLinkToList('news');
    res.locals.allActivitiesHref = createLinkToList('activity');

    res.render(
        `${mNames.culturalInstitution}/detail`,
        {
            culturalInstitution,
            departments,
            activities,
            director,
            news,
        }
    );

    function createLinkToList(modalName) {
        return `/${mNames.culturalInstitution}/${params.id}/${modalName}`
    }
}

exports.part = async function (req, res) {
    const params = req.params;
    const modelName = params.model;
    const targetField = calcName();
    const list = await load();

    res.render(
        `${modelName}/list`, {[targetField]: list}
    );

    function calcName() {
        switch (modelName) {
            case 'news' :
                return 'newses';
            case 'activity':
                return 'activities';
            default:
                return 'newses';
        }
    }

    function load() {
        return models[mNames[modelName]].findAll({
            where: {
                [keys.culturalInstitutionId]: params.id,
            },
            order: [
                ['id', 'DESC'],
            ],
        })
    }
}