var swiper = new Swiper('#main-slider');

var mySwiper = new Swiper('#posts', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const searchInput = document.getElementById('site_search');

searchInput && searchController(searchInput);


function searchController(selector) {
    let timeout = void 0
    let clearAllTimeout = void 0;
    let disable = false;
    let prevValue = void 0;

    const activeClass = 'is-active';
    const loadingClass = 'is-loading';
    const input = selector;
    const dropdown = input.closest('.dropdown');
    const content = dropdown.querySelector('.dropdown-content');
    const control = dropdown.querySelector('.control'); //is-loading

    selector.addEventListener('input', trigger);
    selector.addEventListener('blur', clear);
    selector.addEventListener('focus', () => {
        if (clearAllTimeout) {
            clearTimeout(clearAllTimeout);
        } else {
            search();
        }
    });


    function trigger() {
        clearTimeout(timeout);

        input.value = disable ? prevValue : input.value;
        prevValue = input.value;

        timeout = setTimeout(() => search(), 800)
    }

    function search() {
        const value = input.value.trim();

        dropdown.classList.remove(activeClass);
        content.innerHTML = '';

        if (value.length < 4) return;

        disableInput(input);

        request(value)
            .then((list) => {
                if (list.length) {
                    list.forEach((item) => content.appendChild(createItem(item)));
                } else {
                    content.appendChild(createNoItemElement());
                }

                enableInput(input);
            })
    }

    function createNoItemElement() {
        const item = document.createElement('div');

        item.classList.add('dropdown-item');
        item.innerText = 'ничего не найдено';

        return item
    }

    function createItem(config) {
        const link = document.createElement('a');

        link.classList.add('dropdown-item');
        link.innerText = config.name;
        link.href = config.detailLink;

        return link;
    }

    async function request(value) {
        const response = await fetch('/search', {
            method: 'POST',
            body: JSON.stringify({value}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }

    function disableInput() {
        disable = true;
        control.classList.add(loadingClass);
    }

    function enableInput() {
        disable = false;
        dropdown.classList.add(activeClass);
        control.classList.remove(loadingClass);
    }

    function clear() {
        clearAllTimeout = setTimeout(() => {
            control.classList.remove(loadingClass);
            dropdown.classList.remove(activeClass);
            content.innerHTML = '';
            clearTimeout(timeout);
            clearTimeout(clearAllTimeout);
            clearAllTimeout = void 0;
        }, 1000)
    }

}