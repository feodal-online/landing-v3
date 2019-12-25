// fixedHeader.js
function checkSizeHeader() {
    scroll_top = $(this).scrollTop();

    if (scroll_top > headerMaxScroll && !headerSmall) {
        header.addClass("small");
        headerSmall = true;
    };
    if (scroll_top <= headerMaxScroll && headerSmall) {
        header.removeClass("small");
        headerSmall = false;
    };
};

$(document).ready(function () {
    header = $('header');
    header.addClass("transition0s")
    $(window).scroll(checkSizeHeader)
    checkSizeHeader();
    setTimeout(() => {
        animateFromTo("header", animationTime * 3 / 1000, { y: '-100%', opacity: 0 }, { y: '0%', opacity: 1, ease: Power2.easeOut });
        header.removeClass("transition0s");
    }, 1000);
});
// // fixedHeader.js