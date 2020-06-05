const keys = require('./foreign-keys');
const mNames = require('./models-names');

exports.createPhotoLink = function (model, modelName, photoField = 'photo') {
    return `/photos/${modelName}/${model.id}/${model[photoField]}`;
}

exports.createFileLink = function (id, name) {
    return `/files/${id}/${name}`;
}

exports.toDateFormat = function (dateTime, date) {
    return dateTime
        .fromJSDate(date)
        .toFormat("dd MMMM 'at' HH':'mm");
}

exports.loadSource = function (model, sources) {
//TODO calculateSource here
}

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