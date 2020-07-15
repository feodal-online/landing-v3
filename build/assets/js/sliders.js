// sliders.js
$(document).ready(function () {
    $(".partnersSlider").each(function () {
        new Swiper($(this).find(".swiper-container")[0], {
            loop: true,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 2,
            },
            slidesPerView: 5,
            spaceBetween: 0,
            breakpoints: {
                640: {
                    slidesPerView: 4,
                }
            },
        });
    });
});
// sliders.js