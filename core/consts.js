const mNames = require('./models-names');

exports.mainMenu = [
    {
        href: '/',
        title: 'Главная',
    }, {
        href: '/about',
        title: 'О нас',
    }, {
        href: '/department',
        title: 'Отделения центра',
    }, {
        title: 'Услуги',
        menu: [
            {
                href: '/activity',
                title: 'Афиша мероприятий',
            }, {
                href: '/excursion',
                title: 'Афиша экскурсий',
            }, {
                href: '/service',
                title: 'Платные услуги',
            }
        ]
    }, {
        title: 'Культура округа',
        menu: [
            {
                href:`/${mNames.culturalInstitution}`,
                title: 'Культурные объекты',
            },
            {
                href: `/${mNames.tourObject}`,
                title: 'Туристические объекты',
            },
        ]
    }, {
        href: '/news',
        title: 'Новости',
    }, {
        href: '/contacts',
        title: 'Контакты',
    },
]
