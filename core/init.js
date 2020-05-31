const async = require('async');

const {DateTime} = require('luxon')
const models = require('../models')
const names = require('../core/models-names')
const keys = require('../core/foreign-keys')


module.exports.initBaseRole = () => {
    return new Promise((res, rej) => {
        createDepartments(res);
    })
}

function createDepartments(end) {
    const config = {
        name: 'name',
        tel: 'tel',
        address: 'address',
        photo: 'photo',
        description: 'asdadasdasd',
    }

    const q = async.queue(async function (department, callback) {
        await createActivities(department);
        await createNewses(department);
        callback();
    }, 4);


    for (let i = 0; i < 10; i++) {
        models[names.department].create({...config}).then((d) => q.push(d));
        Object.keys(config).forEach((k) => config[k] += i);
    }
    q.drain(end);
}

function createActivities(d) {
    const config = {
        name: 'name',
        from: DateTime.local().toISO(),
        to: DateTime.local().plus({days: 1}).toISO(),
        description: 'NTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3',
        price: '1231231231',
        limitations: '18+',
        photo: 'banner.png',
        [keys.departmentId]: d.id,
    }

    const q = async.queue(function (department, callback) {
        callback();
    });

    for (let i = 0; i < 2; i++) {
        models[names.activity].create({...config}).then((d) => q.push(d));
    }

}

function createNewses(d) {
    const config = {
        name: 'name',
        description: 'NTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3,@4,@5,@6,@7);\n' +
            'Executing (default): INSERT INTO [activities] ([name],[from],[to],[description],[price],[limitations],[photo],[departmentId]) OUTPUT INSERTED.* VALUES (@0,@1,@2,@3',
        photo: 'card_1.png',
        [keys.departmentId]: d.id,
    }

    const q = async.queue(function (department, callback) {
        callback();
    });

    for (let i = 0; i < 2; i++) {
        models[names.news].create({...config}).then((d) => q.push(d));
    }
}