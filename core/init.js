const async = require('async');

const {DateTime} = require('luxon')
const models = require('../models')
const names = require('../core/models-names')
const keys = require('../core/foreign-keys')


module.exports.initBaseRole = async () => {
    await createStatuses();
    await userRoles();
    await Promise.all(
        await createCulturalCentres()
            .map(async (c) => {
                c.setDepartments(await createDepartments());
                c.setActivities(await createActivities());
                c.setNews(await createNewses());
                c.setStaffers(await createUsers());
            })
    );
}

function userRoles() {
    return models[names.role].bulkCreate([
        {name: 'Сотрудник'},
        {name: 'Заведующий'},
        {name: 'Директор'},
    ]);
}

function createUsers() {
    const c = {
        name: 'D.B. Adfgdf',
        tel: '8 888 88 888',
        [keys.roleId]: 1,
    }
    const users = Array(5).fill(c);
    const zaved = {...c, [keys.roleId]: 2};
    const direct = {...c, [keys.roleId]: 3};

    return models[names.staffer].bulkCreate([...users, zaved, direct]);
}

function createCulturalCentres() {
    const c = {
        name: 'test cultural',
        tel: '8 888 888 88 888',
        address: 'asd sdf sdf we zssd 89-39',
        photo: 'banner.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales diam venenatis nunc porttitor faucibus. Ut fermentum, neque hendrerit eleifend ornare, arcu est fringilla orci, ornare hendrerit  in quam a arcu porttitor dignissim. Suspendisse pretium, lorem vitae iaculis vulputate, ante lorem accumsan ipsum, ullamcorper molestie ante dui ac metus. In commodo dui at neque posuere finibus. Nulla condimentum tortor vitae rhoncus imperdiet.',
        link: 'asdasdasdas',
    };

    return models[names.culturalInstitution]
        .bulkCreate(Array(3).fill(c))
}

function createStatuses() {
    return models[names.requestStatus].bulkCreate([
        {name: 'opened'},
        {name: 'closed'},
    ]);
}

function createFiles() {
    const c = {name: 'filename', link: 'README.md'};
    return models[names.document]
        .bulkCreate(Array(3).fill(c));
}

function createServices() {
    const config = () => {
        return {
            name: 'test service',
            price: "123,5123.d",
            description: 'description',
        }
    };

    return models[names.service]
        .bulkCreate(Array(1).fill(config()));
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

function createDepartments() {
    const config = () => {
        return {
            name: 'Таким образом консультация с широким активом позволяет оценить значение дальнейших направлений развития.',
            tel: '+79526465875',
            address: 'п. Гайны, ул. Дзержинского, 40',
            photo: 'banner.png',
            description: 'Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки систем массового участия. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач',
        }
    }

    return Promise.all(Array(3)
        .fill(config())
        .map(async (c) => {
            const department = await models[names.department].create(c);
            await Promise.all([
                department.setDocuments(await createFiles()),
                department.setExcursions(await createExcursions()),
                department.setServices(await createServices()),
                department.setActivities(await createActivities()),
                department.setNews(await createNewses()),
                department.setStaffers(await createUsers()),
            ]);
            return department;
        })
    );
}

function createActivities() {
    const config = () => {
        return {
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
        }
    };
    return models[names.activity].bulkCreate(Array(4).fill(config()));
}

function createNewses() {
    const config = () => {
        return {
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
        }
    };

    return models[names.news].bulkCreate(Array(3).fill(config()));
}
