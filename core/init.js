const async = require('async');

const {DateTime} = require('luxon')
const models = require('../models')
const names = require('../core/models-names')
const keys = require('../core/foreign-keys')


module.exports.initBaseRole = () => {
    return new Promise(async (res, rej) => {

        createDepartments(res);
    })
}

let count = 0;

function createFiles() {
    const c = {name: 'filename' + count++, link: 'README.md'};
    return models[names.document]
        .bulkCreate(Array(3).fill(c));
}

function createExcursions() {
    const config = () => {
        return {
            name: 'test excursion',
            from: DateTime.local().minus({day: 1}).toJSDate(),
            to: DateTime.local().plus({day: 10}).toJSDate(),
            description: ' asda sdas as wfjkweofj sodjfsodjf sodhfsidgf8qywfe wvsashdbv ajshdvaj shdvaj hsvdbuavfquwv qwda',
            price: '1000.4 р.',
            limitations: '10+',
            photo: '7d36.jpg',
        }
    };

    return models[names.excursion]
        .bulkCreate(Array(1).fill(config()));
}

function createDepartments(end) {
    const config = {
        name: 'name',
        tel: 'tel',
        address: 'address',
        photo: 'banner.png',
        description: 'asdadasdasd',
    }

    const q = async.queue(async function (department, callback) {
        await department.setDocuments(await createFiles());
        await department.setExcursions(await createExcursions());
        await createActivities(department);
        await createNewses(department);
        callback();
    }, 4);


    for (let i = 0; i < 10; i++) {
        models[names.department].create({...config}).then((d) => q.push(d));
    }
    q.drain(end);
}

function createActivities(d) {
    const config = {
        name: 'name',
        from: DateTime.local().toJSDate(),
        to: DateTime.local().plus({days: 1}).toJSDate(),
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