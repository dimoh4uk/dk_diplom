exports.createPhotoLink = function (model, modelName, photoField = 'photo') {
    return `/photos/${modelName}/${model.id}/${model[photoField]}`;
}

exports.createFileLink = function (model, modelName, fileField = 'file') {
    return `/files/${modelName}/${model.id}/${model[fileField]}`;
}

exports.toDateFormat = function (dateTime, date) {
    return dateTime
        .fromJSDate(date)
        .toFormat("dd MMMM 'at' HH':'mm");
}