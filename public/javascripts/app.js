var swiper = new Swiper('#main-slider');

var mySwiper = new Swiper('#posts', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});