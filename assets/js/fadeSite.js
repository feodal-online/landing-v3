function fadeSite() {
    $(".mainPage").length ? fadeMainPage() : fadeDefaultPage();
}

function fadeDefaultPage() {
    // animateFromTo("#header, .wrapper", timeShowHide * 2 / 1000, {}, { opacity: 1, ease: Power2.easeOut });
    // if ($(".page404").length) fade404Page();
}

function fadeMainPage() {
    setTimeout(() => {
        $(".firstScreen .bottomRow").addClass("aos-animate");
    }, 1200);
};

function animateFromTo(elem, time, from, to, delay = 0) {
    TweenMax.fromTo(elem, time, from, to).delay(delay);
};