$(document).ready(function () {
    scrollTopBtn = $('.scrollTopBtn');
    $(window).scroll(checkScrollBtn)
    checkScrollBtn();
    $(".scrollTopBtn").click(() => {
        scrollTo('body, html', 0)
    })
});

function checkScrollBtn() {
    if ($(window).scrollTop() > scrollBtnBorder && !showScrollBtn) {
        showScrollBtn = true;
        scrollTopBtn.fadeIn(animationTime);
    };
    if ($(window).scrollTop() <= scrollBtnBorder && showScrollBtn) {
        showScrollBtn = false;
        scrollTopBtn.fadeOut(animationTime);
    };
};