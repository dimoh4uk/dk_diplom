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