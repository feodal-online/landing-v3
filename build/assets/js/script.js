$(window).resize(function () {
    window_width = $(window).innerWidth();
    window_height = $(window).innerHeight();
})

function rnd(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};



$(document).ready(function () {
    updateMainBtn();


    check_resize();
    $("label.with_line input, label.with_line textarea, .with_hover_text input").focus(function () {
        $(this).parent().addClass("hover");
    });
    $("label.with_line input, label.with_line textarea, .with_hover_text input").blur(function () {
        if ($(this).val() == "") {
            $(this).parent().removeClass("hover");
        }
    });

    // $("input.tel_mask").mask("+3 8 (055) 555-55-55");

    $("header .menu-btn").click(function () {
        if (menu_btn_access) {
            $(this).toggleClass("active");
            menu_btn_access = false;
            if ($(this).hasClass("active")) {
                show_mob_menu();
            } else {
                hide_mob_menu();
            }
        }
    });
    $(".advantagesList li").wrapInner('<div class="wrap"></div>');
    aos_init();

    $("nav a").click(function (e) {
        const href = $(this).attr("href");
        if (href.indexOf("void(0)") < 0 && href.length && $(this).attr("target") != "_blank") {
            if ($(href).length) {
                e.preventDefault();
                setTimeout(() => {
                    scrollTo('body, html', $(href).offset().top)
                }, (window_width <= 1024 && mobMenuOpen) ? hide_mob_menu() : 0);
            }
        }
    })


    // if ($(".blockTitle").length) wrapBlockTitle();

    $(".advantagesList h5, .priceItem h5, .audit h5").each(function () { $(this).prepend(advantagesSVG) });
    $(".howWorkList h5").each(function () { $(this).prepend(howWorkListSVG) });

    
    addBgLines();
    initParallax();
    $("footer .logo svg").click(() => { scrollTo('body, html', 0) });
    fadeSite();
    if ($(".blockquoteBlock").length) {
        setQuoteClipPath();
        $(window).on('resize.quote', setQuoteClipPath)
    }
    // end ready
});

var windowLoad = false;
$(window).load(function () {
    windowLoad = true;

    if (production) setTimeout(initPopupVideo, 1000);
});

function move_to_tablet() {
    $("header .mobile_row .wrap").append($("header nav"));
};


function move_to_desktop() {
    hide_mob_menu();
    if (typeof popup != 'undefined') popup.hide();
    $("header .mainLogo").after($("header nav"));
};

function prefix(val) {
    return val < 10 ? '0' : ''
};

function countPrefix(index) {
    return index < 10 ? "0" + index : index;
};

function show_mob_menu(time = 500) {
    mobMenuOpen = true;
    setDelayTransform("header nav a", 300);
    // 
    hold_scroll_page(true);
    $("header").addClass("show");
    setTimeout(() => { $("header").addClass("open"); }, 50);
    setTimeout(() => { $(".menu-btn").addClass("active_line2") }, 250);
    setTimeout(() => { menu_btn_access = true; }, time);
}

function hide_mob_menu() {
    hold_scroll_page(false);
    $(".menu-btn").addClass("active").removeClass("active_line2");
    $("header").addClass("hide");
    let delay = setDelayTransform("header nav a", 0) + 250;
    setTimeout(function () {
        $(".menu-btn").removeClass("active");
        $("header").removeClass("open");
    }, delay);
    setTimeout(function () {
        mobMenuOpen = false;
        menu_btn_access = true;
        $("header a").removeAttr("data-delay")
        $("header").removeClass("hide show");
        if ($(window).scrollTop() < headerMaxScroll) {
            $("header").removeClass("show");
        }
    }, delay += 500);
    // $(".menuBtn").removeClass("active")
    return delay;
}

function navClick(i) {
    $('body, html').animate({
        scrollTop: $('.screen').eq(i).offset().top - $("header").innerHeight()
    }, 1000);
    hide_mob_menu();
}

function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
}
if (detectIE()) {
    // do somethin
}

function showMoreNewsItemCard() {
    $(".newsGrid.main").append($(".newsGrid.hidden .newsItemCard"));
    let newsGridMain = $(".newsGridBlock .newsGrid.main");
    let newsGridHidden = $(".newsGridBlock .newsGrid.hidden");
    let loadBtn = $(".newsGridBlock .loadMore .mainBtn");
    if (loadBtn.hasClass("loading")) return false;
    // 
    loadBtn.addClass("loading").attr("disabled", 'disabled');
    // этот блок замени на ajax
    setTimeout(() => {
        // temp
        let tempCards = newsGridMain.find(".newsItemCard").slice(0, 10).clone();
        tempCards.fadeTo(0, 0);
        // хочу что бы карточки появлялись через fade
        newsGridMain.append(tempCards.fadeTo(150, 1));
        // temp
        loadBtn.removeClass("loading").removeAttr("disabled")
    }, 1000)
}

function scrollTo(block, scrollTop, time = 1) {
    TweenMax.to(block, time, {
        scrollTop: scrollTop,
        ease: "Power2.easeInOut",
    });
};

function aos_init() {
    $(".aos").attr("data-aos", "fade-up");
    $(aosFadeArrDone.join(',')).addClass("aos").attr("data-aos", "fade-up");

    setDelayTransform(".firstScreen .content > *", 0);
    setDelayTransform(".advantagesList li .wrap", 0);
    setDelayTransform(".howWorkList li", 0);
    setDelayTransform(".priceItem", 0);
    setTimeout(() => {
        AOS.init({
            duration: 500,
            once: true,
            easing: "ease-out-quad"
        });
    }, 500);
};


// window.viewportUnitsBuggyfill.init({
//     force: true,
//     refreshDebounceWait: 250,
//     hacks: window.viewportUnitsBuggyfillHacks
// });

// $(document).on("click", "a:not(.dont-go)", function (e) {
//     var href = $(this).attr("href");
//     if (href.indexOf("void(0)") < 0 && href.length && $(this).attr("target") != "_blank") {
//         e.preventDefault();
//         $("body").fadeTo(250, 0, function () {
//             window.location.href = href;
//         })
//     }
// });


function updateMainBtn() {
    // withArrow
    const { left, right } = mainBtnSvg;
    let btn = $(".mainBtn:not(.default)");
    btn.parent().css("perspective", 800)
    btn.append(`<div class='dopDiv'></div>
    <div class='dopSecondDiv'></div>`);
    $(".mainBtn.withArrow").append(`
    <div class='leftArrow'>${left}${left}${left}${left}</div>
    <div class='rightArrow'>${right}${right}${right}${right}</div>
    `)
}

function wrapBlockTitle() {
    $(".blockTitle").each(function () {
        let span = $(this).find("span").addClass("wrap");
        let textArr = $(this).find("span").text().split("");
        span.html(textArr.map(element => {
            return `<span>${element}</span>`;
        }).join(''));
        $(this).fadeTo(animationTime, 1)
    })
};

function checkSizeAboutImg() {
    aboutImg.width(window.innerWidth - aboutImg.offset().left);
};
$(document).ready(function () {
    aboutImg = $(".aboutImg");
    checkSizeAboutImg();
    $(window).on("resize.checkSizeAboutImg", checkSizeAboutImg);
});

function initPopupVideo() {
    let video_html = $("#video_html");
    let videoSrc = video_html.data("src");
    let poster = video_html.data("poster");
    let video = `<video loop autoplay id="popupVideo" loop muted playsinline autoplay poster="${poster}">
                    <source src="${videoSrc}" type='video/mp4'></source>
                </video>`;
    video_html.append(video);
    video_html.fadeIn(1000)
}

function setDelayTransform(divs, total_delay = 300) {
    $(divs).each(function (i) {
        $(this).css("transition-delay", total_delay + "ms").attr("data-delay", total_delay);
        total_delay += 100;
    });
    return total_delay;
}

function copyClipboard(text) {
    var element = document.createElement('input');
    element.type = "text";
    element.value = text;
    document.body.appendChild(element);
    element.select();
    element.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
    document.execCommand("copy");
    element.parentElement.removeChild(element);
}

function copyMail(text = 'info@feodal.online') {
    if (!copyMailAccess) return false;
    copyMailAccess = false;
    copyClipboard(text);
    const transformY = 50;
    const ease = "Power2.easeInOut";
    const timeWait = 2000;
    animateFromTo('.copyMailPopup', animationTime / 1000,
        { opacity: 0, y: -transformY, display: 'block' },
        { opacity: 1, y: 0, ease: ease });
    animateFromTo('.copyMailPopup', animationTime / 1000, {},
        { opacity: 0, y: -transformY, display: 'none', ease: ease }, timeWait / 1000);
    setTimeout(() => { copyMailAccess = true }, timeWait + animationTime);
}

let bgLinesClone;
function addBgLines() {
    $(".wrapper > div, footer").append(bgLines);
    $(".aboutBlock,").append(bgLines);
    bgLinesClone = $(".aboutBlock .bgLines").last();
    bgLinesClone.addClass("clone");
}

function initParallax() {
    $(".illustration").attr('data-depth', "0.1")
    $(".gridInfo .container").each(function (i) {
        new Parallax($(this)[0],
            {
                selector: '.illustration',
                // relativeInput: i % 2,
                // relativeInput: false,
                invertX: i % 2,
                invertY: i % 2,
                limitX: 30,
                limitY: 30,
            }
        );
    })
}

function setQuoteClipPath() {
    if (typeof blockquoteBlock == 'undefined') blockquoteBlock = $(".blockquoteBlock");
    if (typeof aboutBlock == 'undefined') aboutBlock = $(".aboutBlock");
    let about = { top: aboutBlock.offset().top, left: aboutBlock.offset().left };
    let quote = { top: blockquoteBlock.offset().top, left: blockquoteBlock.offset().left }
    let top = quote.top - about.top;
    let right = quote.left + blockquoteBlock.innerWidth();
    if (window_width > 991) right = window_width
    let bottom = top + blockquoteBlock.innerHeight();
    bgLinesClone.css({
        'clip-path': `polygon(${quote.left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${quote.left}px ${bottom}px)`,
    });
};