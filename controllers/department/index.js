const {DateTime} = require('luxon');
const {Op} = require('sequelize');
const models = require('../../models');
const mNames = require('../../core/models-names');
const keys = require('../../core/foreign-keys');

exports.list = async function (req, res) {
    const departments = await models[mNames.department].findAll();
    res.render(`${mNames.department}/list`, {departments: departments});
};

exports.detail = async function (req, res) {
    const params = req.params;
    const department = await models[mNames.department].findByPk(params.id,
        {
            include: [
                models[mNames.document],
                {
                    model: models[mNames.staffer],
                    [keys.roleId]: 1,
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
                {
                    model: models[mNames.excursion],
                    order: [['id', 'DESC']],
                    to: {
                        [Op.gt]: DateTime.local().toJSDate(),
                    },
                    limit: 4,
                },
                {
                    model: models[mNames.service],
                    order: [['id', 'DESC']],
                    limit: 4,
                },
            ]
        });

    const culturalInstitution = await models[mNames.culturalInstitution].findByPk(department[keys.culturalInstitutionId]);
    const manager = await models[mNames.staffer].findOne({
        where: {
            [keys.roleId]: 2,
            [keys.departmentId]: params.id
        },
    });

    const documents = department.documents
    const excursions = department.excursions;
    const activities = department.activities;
    const services = department.services;
    const staffers = department.staffers;
    const news = department.news;

    res.locals.allNewsHref = createLinkToList('news');
    res.locals.allActivitiesHref = createLinkToList('activity');
    res.locals.allServicesHref = createLinkToList('service');
    res.locals.allExcursionsHref = createLinkToList('excursion');

    res.render(`${mNames.department}/detail`, {
        department,
        activities,
        documents,
        excursions,
        news,
        culturalInstitution,
        services,
        staffers,
        manager,
    });

    function createLinkToList(modalName) {
        return `/${mNames.department}/${params.id}/${modalName}`
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
            case 'service':
                return 'services';
            case 'excursion':
                return 'excursions';
            default:
                return 'newses';
        }
    }

    function load() {
        return models[mNames[modelName]].findAll({
            where: {
                [keys.departmentId]: params.id,
            },
            order: [
                ['id', 'DESC'],
            ],
        })
    }
}