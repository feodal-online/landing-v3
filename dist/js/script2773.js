"use strict";
var header, scroll_top, aboutImg, scrollTopBtn, cursor, screenNow, blockquoteBlock, aboutBlock, isMacLike = !!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i),
    isIOS = !!navigator.platform.match(/(iPhone|iPod|iPad)/i),
    isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
    isFirefox = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"),
    page_content = $(window),
    mobile = device.mobile(),
    tablet = device.tablet(),
    headerSmall = !1,
    headerMaxScroll = 50,
    scrollBtnBorder = 500,
    showScrollBtn = !1,
    bufer = 0,
    buferMax = isSafari ? 10 : isFirefox ? 30 : 200,
    window_width = $(window).innerWidth(),
    window_height = $(window).innerHeight(),
    menu_btn_access = !0,
    fadeSiteDesk = !1,
    fadeSiteMob = !1,
    changeScreenAccess = !0,
    animationTime = 250,
    production = "localhost" !== window.location.hostname,
    mobMenuOpen = !1,
    copyMailAccess = !0,
    aosFadeArrDone = [".firstScreen .content > *", ".gridInfo .text > *", ".advantages h2", ".advantagesList li .wrap", ".howWork .text > *", ".howWorkList li", ".aboutBlock .text > *", "blockquote", ".priceItem", ".audit li", ".audit h2", ".helperBlock li", ".helperBlock h2", ".faqBlock h2", ".accordion"];
isMacLike && $("body, html").addClass("isMacLike"), isSafari && $("body, html").addClass("isSafari");
var accordionsWrap, accordionsMainBlock, mainBtnSvg = {
        left: "<svg width=\"13\" height=\"14\" viewBox=\"0 0 13 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M1.00006 0.998779V12.9988H13.0001\" stroke=\"#00994E\" stroke-width=\"2\"/>\n    </svg>",
        right: "<svg width=\"13\" height=\"14\" viewBox=\"0 0 13 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M12 13.9987L12 1.99872L1.04907e-06 1.99872\" stroke=\"#00994E\" stroke-width=\"2\"/>\n    </svg>"
    },
    advantagesSVG = "<svg width=\"10\" height=\"25\" viewBox=\"0 0 10 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"10\" height=\"25\" fill=\"#00994E\" fill-opacity=\"0.2\"/>\n<rect x=\"2\" y=\"2\" width=\"6\" height=\"21\" fill=\"#00994E\" fill-opacity=\"0.2\"/>\n<rect x=\"4\" y=\"4\" width=\"2\" height=\"17\" fill=\"#00994E\"/>\n</svg>",
    howWorkListSVG = "<svg width=\"18\" height=\"64\" viewBox=\"0 0 18 64\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"18\" height=\"64\" fill=\"#007940\" fill-opacity=\"0.1\"/>\n<rect x=\"4\" y=\"4\" width=\"10\" height=\"56\" fill=\"#007940\" fill-opacity=\"0.1\"/>\n<rect x=\"8\" y=\"8\" width=\"2\" height=\"48\" fill=\"#007940\"/>\n</svg>",
    bgLines = "<div class=\"bgLines\">\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n<div class=\"line\"></div>\n</div>",
    accordionAll = $(".faqBlock .accordion"),
    accordionGrid = "<div class=\"col-6\"></div><div class=\"col-6\"></div>",
    accordionColumns = void 0,
    accordionLimit = void 0;

function getAccordColumsCount() {
    var a = 1024 < window_width && 1440 >= window_width ? 2 : 1;
    return {
        columns: a,
        limit: 640 >= window_width ? 4 : 2 == a ? 10 : 7
    }
}

function createAccordGrid() {
    var a = getAccordColumsCount(),
        b = a.columns,
        c = a.limit;
    if (accordionColumns == b && accordionLimit == c) return !1;
    accordionColumns = b, accordionLimit = c, "undefined" == typeof accordionsWrap && (accordionsWrap = $(".accordionsWrap")), "undefined" == typeof accordionsMainBlock && (accordionsMainBlock = $(".faqBlock").find(".accordionsMainBlock")), accordionsMainBlock.append(accordionAll), accordionsWrap.find(".col-6").remove(), accordionAll.removeClass("open").find(".content").stop(!0).slideUp(0), accordionAll.first().addClass("open").find(".content").stop(!0).slideDown(0), 2 == b ? (accordionsWrap.append(accordionGrid), accordionsWrap.find(".col-6").each(function (a) {
        $(this).append(accordionAll.slice(a ? c / 2 : 0, a ? c : c / 2))
    })) : accordionsWrap.append(accordionAll.slice(0, c));
    accordionAll.length > c && $(".showMoreFaq").show(0)
}

function showMoreFaq() {
    accordionsWrap = $(".accordionsWrap");
    var a = getAccordColumsCount(),
        b = a.columns,
        c = a.limit,
        d = accordionsWrap.innerHeight();
    if (2 == b) {
        var e = accordionAll.length;
        accordionsWrap.find(".col-6").each(function (a) {
            $(this).append(accordionAll.slice(a ? e / 2 : 0, a ? e : e / 2))
        })
    } else accordionsWrap.append(accordionAll);
    var f = accordionsWrap.innerHeight();
    accordionsWrap.height(d), accordionsWrap.animate({
        height: f
    }, 2 * animationTime, function () {
        accordionsWrap.height("")
    }), $(".showMoreFaq").slideUp(0);
    var g = accordionAll.eq(c).offset().top - window_height / 2;
    scrollTo("body, html", g)
}
$(document).ready(function () {
    createAccordGrid();
    var a = $(".faqBlock .accordion");
    a.first().addClass("open").find(".content").show(), $(".accordion .top").click(function () {
        $(this).parent().siblings(".accordion").removeClass("open").find(".content").stop(!0).slideUp(animationTime), $(this).parent().toggleClass("open"), $(this).parent().hasClass("open") ? $(this).next().stop(!0).slideDown(animationTime) : $(this).next().stop(!0).slideUp(animationTime)
    })
});

function get_responsive(a) {
    var b, c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : $(window).innerWidth(),
        d = !1,
        e = a.slice();
    return e.push(99999999), $.each(e, function (a, f) {
        return !1 !== d && c <= e[a] && c > d ? (b = a - 1, !1) : void(d = f)
    }), e[b]
}
var responsiveNow, responsiveSteps = [0, 540, 640, 991, 1024, 1080, 1440];

function check_resize() {
    responsiveNow = get_responsive(responsiveSteps), check_resizeDo(responsiveNow), $(window).resize(function () {
        responsiveNow != get_responsive(responsiveSteps) && (responsiveNow = get_responsive(responsiveSteps), check_resizeDo(responsiveNow))
    })
}

function check_resizeDo(a) {
    switch (a) {
        case 0:
            move_to_tablet();
            break;
        case 540:
            move_to_tablet();
            break;
        case 640:
            move_to_tablet();
            break;
        case 991:
            move_to_tablet();
            break;
        case 1024:
            move_to_desktop();
            break;
        case 1080:
            move_to_desktop();
            break;
        case 1440:
            move_to_desktop();
            break;
        default:
    }
    createAccordGrid()
}

function fadeSite() {
    $(".mainPage").length ? fadeMainPage() : fadeDefaultPage()
}

function fadeDefaultPage() {}

function fadeMainPage() {
    setTimeout(function () {
        $(".firstScreen .bottomRow").addClass("aos-animate")
    }, 1200)
}

function animateFromTo(a, b, c, d) {
    var e = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0;
    TweenMax.fromTo(a, b, c, d).delay(e)
}

function checkSizeHeader() {
    scroll_top = $(this).scrollTop(), scroll_top > headerMaxScroll && !headerSmall && (header.addClass("small"), headerSmall = !0);
    scroll_top <= headerMaxScroll && headerSmall && (header.removeClass("small"), headerSmall = !1)
}
$(document).ready(function () {
    header = $("header"), header.addClass("transition0s"), $(window).scroll(checkSizeHeader), checkSizeHeader(), setTimeout(function () {
        animateFromTo("header", 3 * animationTime / 1e3, {
            y: "-100%",
            opacity: 0
        }, {
            y: "0%",
            opacity: 1,
            ease: Power2.easeOut
        }), header.removeClass("transition0s")
    }, 1e3)
});
var ajaxCalcAccess = !0,
    arr_timers_form_input = [],
    arr_timers_form_textarea = [];

function createError(a) {
    create_timer(a), a.closest(".with_line").addClass("error"), a.closest(".with_line").find(".error_text").fadeIn(250)
}

function create_timer(a) {
    var b, c = a.attr("type"),
        d = $("form input").index(a);
    "input" == c ? b = arr_timers_form_input[d] : arr_timers_form_textarea[d], clearTimeout(b), b = setTimeout(function () {
        a.parent().removeClass("error"), a.parent().find(".error_text").fadeOut(300)
    }, 3e3)
}

function scrollToErrorInput() {
    var a, b;
    $(this).closest(".popup_block").length ? (a = $(this).closest("label").position().top, b = $(".popup_block:visible .popupContent").scrollTop(), (a < b + $("header").innerHeight() || a > b + window.innerHeight) && scrollTo(".popup_block:visible .popupContent", a, .5)) : (a = $(this).closest("label").offset().top, b = $(window).scrollTop(), (a < b + $("header").innerHeight() || a > b + window.innerHeight) && scrollTo("body, html", a - $("header").innerHeight() - 50))
}
$(".contactForm, .regForm").submit(function (a) {
    a.preventDefault();
    var b = $(this),
        c = $(this),
        d = !1;
    if (c.find(".error").removeClass("error"), c.find(".error_text").remove(), c.find("input").each(function () {
            if ("" == $(this).val() && $(this).prop("required") && (!d && scrollToErrorInput.call($(this)), d = !0, $(this).after("<span class=\"error_text\">Required</span>"), createError($(this))), "tel" == $(this).attr("type") && 20 > $(this).val().length && (!d && scrollToErrorInput.call($(this)), d = !0, $(this).val().length ? $(this).after("<span class=\"error_text\">Required</span>") : $(this).after("<span class=\"error_text\">Syntax error</span>"), createError($(this))), "email" == $(this).attr("type")) {
                var a = $(this).val();
                ~a.indexOf("@") && ~a.indexOf(".") && a.length || (!d && scrollToErrorInput.call($(this)), d = !0, a.length ? $(this).after("<span class=\"error_text\">Incorrect email address</span>") : $(this).after("<span class=\"error_text\">Required</span>"), createError($(this)))
            }
        }), c.find("textarea").each(function () {
            "" == $(this).val() && $(this).prop("required") && (!d && scrollToErrorInput.call($(this)), d = !0, $(this).after("<span class=\"error_text\">Required</span>"), createError($(this)))
        }), !d) {
        c.serialize();
        alert("success")
    }
    return !1
}), $(".lazy").lazy({
    afterLoad: function (a) {
        $(a).css({
            visibility: "visible"
        }).fadeTo(150, 1)
    }
});
var navSections, headerNav, headerNavIndex;
$(document).ready(function () {
    if ($("header nav a.section") == true) {
        headerNav = $("header nav a.section"), $("header nav a.section").each(function (a) {
            var b = $(this).attr("href");
            navSections = a ? navSections.add($(b)) : $(b)
        }), $(window).scroll(function () {
            var a = $(window).scrollTop();
            navSections.each(function (b) {
                var c = $(this).position().top,
                    d = $(this).innerHeight(),
                    e = a + window_height / 2;
                return e >= c && e <= c + d ? headerNavIndex != b && (headerNavIndex = b, headerNav.removeClass("active"), headerNav.eq(b).addClass("active"), !1) : void(b == navSections.length - 1 && (headerNavIndex = void 0, headerNav.removeClass("active")))
            })
        }).scroll()
    }
});
var popup = {
    hide_popup_timer: void 0,
    openModal: !1,
    timeAnimation: 1,
    ease: "Power3.easeInOut",
    easeFast: "Power4.easeInOut",
    init: function () {
        $(".popup_block .content, .popup_block .personal-area-table").wrap("<div class='content_wrap_inner'></div>"), $(".popup_block .content, .popup_block .personal-area-table").wrap("<div class='content_wrap'></div>"), $(window).resize(this.popup_block_scroll_fix), $("body > .popup_wrap").length || $("body").append($(".popup_wrap"))
    },
    popup_block_scroll_fix: function () {
        if (!this.openModal) return !1;
        var a = $(".popup_block:visible");
        a.find(".content").css("margin-bottom", ""), a.find(".content_wrap_inner").removeAttr("style"), isMacLike ? "" : a.find(".content_wrap_inner").getNiceScroll().remove(), isMacLike ? a.find(".content_wrap_inner").css("overflow-y", "auto") : a.find(".content_wrap_inner").niceScroll({
            cursorcolor: "#701f7c",
            cursoropacitymin: .9,
            cursorwidth: 3,
            cursorborder: 0,
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            }
        })
    },
    show: function (a, b, c) {
        var d = this;
        $(".popup_bg").show(0);
        var e, f, g = $("div.popup_block").filter("." + a),
            h = g.hasClass("fullWidth");
        this.openModal ? (e = g.innerWidth(), f = g.innerHeight()) : (g.show(), e = g.innerWidth(), f = g.innerHeight()), g.find(".popupContent").scrollTop(0), g.show(), g.find(".popupWrap").removeClass("flex"), g.find(".popupContent")[0].clientHeight == g.find(".popupContent")[0].scrollHeight && g.find(".popupWrap").addClass("flex"), g.hide(0);
        var i = 0;
        if (this.openModal) {
            g.show(0);
            var j = $(".popup_block:visible"),
                k = j.innerWidth();
            animateFromTo(j[0], this.timeAnimation / 2, {}, {
                x: h ? 150 : k,
                opacity: 0,
                ease: this.ease
            }), i = 1e3 * this.timeAnimation / 2
        }
        this.openCallBuck(a), setTimeout(function () {
            hold_scroll_page(!0), $(".popup_block").removeAttr("style"), $(c).is("a") && b.preventDefault(), clearTimeout(d.hide_popup_timer), g.css("height", ""), g.find(".content_wrap_inner").scrollTop(0), g.stop(!0).show(), animateFromTo(g[0], d.timeAnimation, {
                opacity: !h,
                x: h ? 150 : e
            }, {
                opacity: 1,
                x: 0,
                ease: d.ease,
                onComplete: function () {
                    "iframe" == a || "fullCalc" == a ? g.find(".logo").fadeTo(250, 1) : $("body").removeClass("showLogo"), d.openModal = !0, g.find(".content_wrap_inner, .popupWrap").scrollTop(0), g.css("transform", "")
                }
            })
        }, i)
    },
    hide: function (a) {
        var b = this;
        $("body").removeClass("showLogo");
        var c = $("div.popup_block").filter("." + a),
            d = c.length ? c : $(".popup_block:visible");
        d.find(".logo").fadeTo(250, 0);
        var e = d.innerWidth(),
            f = d.innerHeight(),
            g = d.hasClass("fullWidth");
        (this.openModal || $(".popup_block:visible").length) && animateFromTo(d[0], this.timeAnimation, {}, {
            opacity: !g,
            x: g ? 250 : e,
            ease: this.ease,
            onComplete: function () {
                d.find(".content_wrap_inner, .popupWrap").scrollTop(0), $(".popup_bg, .popup_block, .popup_bg").hide(), hold_scroll_page(!1), b.openModal = !1, $(".popup_bg").css("z-index", ""), $("header").css("z-index", "")
            }
        });
        this.closeCallBuck(d)
    },
    openCallBuck: function () {},
    closeCallBuck: function () {}
};

function hold_all_scroll_page() {
    var a = !!(0 < arguments.length && arguments[0] !== void 0) && arguments[0];
    a ? (window.addEventListener("wheel", holdScroll, {
        passive: !1
    }), window.addEventListener("DOMMouseScroll", holdScroll, {
        passive: !1
    }), document.addEventListener("touchmove", holdScroll, {
        passive: !1
    })) : (window.removeEventListener("wheel", holdScroll, {
        passive: !1
    }), window.removeEventListener("DOMMouseScroll", holdScroll, {
        passive: !1
    }), document.removeEventListener("touchmove", holdScroll, {
        passive: !1
    }))
}

function holdScroll(a) {
    return a = a || window.event, a.preventDefault && a.preventDefault(), a.returnValue = !1, !1
}
popup.init();

function hold_scroll_page() {
    var a = !!(0 < arguments.length && arguments[0] !== void 0) && arguments[0];
    a ? (window.addEventListener("wheel", preventDefault, {
        passive: !1
    }), window.addEventListener("DOMMouseScroll", preventDefault, {
        passive: !1
    }), document.addEventListener("touchmove", preventDefault, {
        passive: !1
    })) : (window.removeEventListener("wheel", preventDefault, {
        passive: !1
    }), window.removeEventListener("DOMMouseScroll", preventDefault, {
        passive: !1
    }), document.removeEventListener("touchmove", preventDefault, {
        passive: !1
    }))
}
var ts;
$(document).on("touchstart", function (a) {
    ts = a.originalEvent.touches[0].clientY
});

function preventDefault(a) {
    a = a || window.event;
    var b = $(a.target).closest(".popupContent").length ? $(a.target).closest(".popupContent") : $(a.target).closest(".mobile_row").length ? $(a.target).closest(".wrap") : $(a.target);
    var c = $(a.target).closest(".popupContent, .mobile_row").length || $(a.target).hasClass(".popupContent");
    if (!c) return a.preventDefault(), a.returnValue = !1, !1;
    var d = a.deltaY || a.detail || a.wheelDelta;
    if ("touchmove" == a.type) {
        var f = a.changedTouches[0],
            g = parseInt(f.clientY);
        ts < g - 5 ? d = -100 : ts > g + 5 && (d = 100)
    }
    0 >= d && 0 >= b[0].scrollTop && a.preventDefault();
    0 < d && 1 >= b[0].scrollHeight - b[0].clientHeight - b[0].scrollTop && a.preventDefault()
}
$(window).resize(function () {
    window_width = $(window).innerWidth(), window_height = $(window).innerHeight()
});

function rnd(a, b) {
    var c = Math.round,
        d = a - .5 + Math.random() * (b - a + 1);
    return d = c(d), d
}
$(document).ready(function () {
    updateMainBtn(), check_resize(), $("label.with_line input, label.with_line textarea, .with_hover_text input").focus(function () {
        $(this).parent().addClass("hover")
    }), $("label.with_line input, label.with_line textarea, .with_hover_text input").blur(function () {
        "" == $(this).val() && $(this).parent().removeClass("hover")
    }), $("header .menu-btn").click(function () {
        menu_btn_access && ($(this).toggleClass("active"), menu_btn_access = !1, $(this).hasClass("active") ? show_mob_menu() : hide_mob_menu())
    }), $(".advantagesList li").wrapInner("<div class=\"wrap\"></div>"), aos_init(), $("nav a").click(function (a) {
        var b = $(this).attr("href");
        0 > b.indexOf("void(0)") && b.length && "_blank" != $(this).attr("target") && $(b).length && (a.preventDefault(), setTimeout(function () {
            scrollTo("body, html", $(b).offset().top)
        }, 1024 >= window_width && mobMenuOpen ? hide_mob_menu() : 0))
    }), $(".advantagesList h5, .priceItem h5").each(function () {
        $(this).prepend(advantagesSVG)
    }), $(".howWorkList h5").each(function () {
        $(this).prepend(howWorkListSVG)
    }), addBgLines(), initParallax(), $("footer .logo svg").click(function () {
        scrollTo("body, html", 0)
    }), fadeSite(), $(".blockquoteBlock").length && (setQuoteClipPath(), $(window).on("resize.quote", setQuoteClipPath))
});
var windowLoad = !1;
$(window).load(function () {
    windowLoad = !0, production && setTimeout(initPopupVideo, 1e3)
});

function move_to_tablet() {
    $("header .mobile_row .wrap").append($("header nav"))
}

function move_to_desktop() {
    hide_mob_menu(), "undefined" != typeof popup && popup.hide(), $("header .mainLogo").after($("header nav"))
}

function prefix(a) {
    return 10 > a ? "0" : ""
}

function countPrefix(a) {
    return 10 > a ? "0" + a : a
}

function show_mob_menu() {
    var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : 500;
    mobMenuOpen = !0, setDelayTransform("header nav a", 300), hold_scroll_page(!0), $("header").addClass("show"), setTimeout(function () {
        $("header").addClass("open")
    }, 50), setTimeout(function () {
        $(".menu-btn").addClass("active_line2")
    }, 250), setTimeout(function () {
        menu_btn_access = !0
    }, a)
}

function hide_mob_menu() {
    hold_scroll_page(!1), $(".menu-btn").addClass("active").removeClass("active_line2"), $("header").addClass("hide");
    var a = setDelayTransform("header nav a", 0) + 250;
    return setTimeout(function () {
        $(".menu-btn").removeClass("active"), $("header").removeClass("open")
    }, a), setTimeout(function () {
        mobMenuOpen = !1, menu_btn_access = !0, $("header a").removeAttr("data-delay"), $("header").removeClass("hide show"), $(window).scrollTop() < headerMaxScroll && $("header").removeClass("show")
    }, a += 500), a
}

function navClick(a) {
    $("body, html").animate({
        scrollTop: $(".screen").eq(a).offset().top - $("header").innerHeight()
    }, 1e3), hide_mob_menu()
}

function getScrollbarWidth() {
    var a = document.createElement("div");
    a.style.visibility = "hidden", a.style.overflow = "scroll", a.style.msOverflowStyle = "scrollbar", document.body.appendChild(a);
    var b = document.createElement("div");
    a.appendChild(b);
    var c = a.offsetWidth - b.offsetWidth;
    return a.parentNode.removeChild(a), c
}

function detectIE() {
    var a = window.navigator.userAgent,
        b = a.indexOf("MSIE ");
    if (0 < b) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
    var c = a.indexOf("Trident/");
    if (0 < c) {
        var d = a.indexOf("rv:");
        return parseInt(a.substring(d + 3, a.indexOf(".", d)), 10)
    }
    var e = a.indexOf("Edge/");
    return !!(0 < e) && parseInt(a.substring(e + 5, a.indexOf(".", e)), 10)
}
detectIE();

function showMoreNewsItemCard() {
    $(".newsGrid.main").append($(".newsGrid.hidden .newsItemCard"));
    var a = $(".newsGridBlock .newsGrid.main"),
        b = $(".newsGridBlock .newsGrid.hidden"),
        c = $(".newsGridBlock .loadMore .mainBtn");
    return !c.hasClass("loading") && void(c.addClass("loading").attr("disabled", "disabled"), setTimeout(function () {
        var b = a.find(".newsItemCard").slice(0, 10).clone();
        b.fadeTo(0, 0), a.append(b.fadeTo(150, 1)), c.removeClass("loading").removeAttr("disabled")
    }, 1e3))
}

function scrollTo(a, b) {
    var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 1;
    TweenMax.to(a, c, {
        scrollTop: b,
        ease: "Power2.easeInOut"
    })
}

function aos_init() {
    $(".aos").attr("data-aos", "fade-up"), $(aosFadeArrDone.join(",")).addClass("aos").attr("data-aos", "fade-up"), setDelayTransform(".firstScreen .content > *", 0), setDelayTransform(".advantagesList li .wrap", 0), setDelayTransform(".howWorkList li", 0), setDelayTransform(".priceItem", 0), setDelayTransform(".audit li .wrap", 0), setDelayTransform(".helperBlock li", 0), setTimeout(function () {
        AOS.init({
            duration: 500,
            once: !0,
            easing: "ease-out-quad"
        })
    }, 500)
}

function updateMainBtn() {
    var a = mainBtnSvg.left,
        b = mainBtnSvg.right,
        c = $(".mainBtn:not(.default)");
    c.parent().css("perspective", 800), c.append("<div class='dopDiv'></div>\n    <div class='dopSecondDiv'></div>"), $(".mainBtn.withArrow").append("\n    <div class='leftArrow'>".concat(a).concat(a).concat(a).concat(a, "</div>\n    <div class='rightArrow'>").concat(b).concat(b).concat(b).concat(b, "</div>\n    "))
}

function wrapBlockTitle() {
    $(".blockTitle").each(function () {
        var a = $(this).find("span").addClass("wrap"),
            b = $(this).find("span").text().split("");
        a.html(b.map(function (a) {
            return "<span>".concat(a, "</span>")
        }).join("")), $(this).fadeTo(animationTime, 1)
    })
}

function checkSizeAboutImg() {
    aboutImg.width(window.innerWidth - aboutImg.offset().left)
}
$(document).ready(function () {
    aboutImg = $(".aboutImg"), checkSizeAboutImg(), $(window).on("resize.checkSizeAboutImg", checkSizeAboutImg)
});

function initPopupVideo() {
    var a = $("#video_html"),
        b = a.data("src"),
        c = a.data("poster"),
        d = "<video loop autoplay id=\"popupVideo\" loop muted playsinline autoplay poster=\"".concat(c, "\">\n                    <source src=\"").concat(b, "\" type='video/mp4'></source>\n                </video>");
    a.append(d), a.fadeIn(1e3)
}

function setDelayTransform(a) {
    var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 300;
    return $(a).each(function () {
        $(this).css("transition-delay", b + "ms").attr("data-delay", b), b += 100
    }), b
}

function copyClipboard(a) {
    var b = document.createElement("input");
    b.type = "text", b.value = a, document.body.appendChild(b), b.select(), b.setSelectionRange(0, 99999), document.execCommand("copy"), b.parentElement.removeChild(b)
}

function copyMail() {
    var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : "info@feodal.online";
    if (!copyMailAccess) return !1;
    copyMailAccess = !1, copyClipboard(a);
    var b = "Power2.easeInOut",
        c = 2e3;
    animateFromTo(".copyMailPopup", animationTime / 1e3, {
        opacity: 0,
        y: -50,
        display: "block"
    }, {
        opacity: 1,
        y: 0,
        ease: b
    }), animateFromTo(".copyMailPopup", animationTime / 1e3, {}, {
        opacity: 0,
        y: -50,
        display: "none",
        ease: b
    }, c / 1e3), setTimeout(function () {
        copyMailAccess = !0
    }, c + animationTime)
    
}

function copyPhone() {
    var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : "+380986148954";
    if (!copyMailAccess) return !1;
    copyMailAccess = !1, copyClipboard(a);
    var b = "Power2.easeInOut",
        c = 2e3;
    animateFromTo(".copyPhonePopup", animationTime / 1e3, {
        opacity: 0,
        y: -50,
        display: "block"
    }, {
        opacity: 1,
        y: 0,
        ease: b
    }), animateFromTo(".copyPhonePopup", animationTime / 1e3, {}, {
        opacity: 0,
        y: -50,
        display: "none",
        ease: b
    }, c / 1e3), setTimeout(function () {
        copyMailAccess = !0
    }, c + animationTime)
    
}

var bgLinesClone;

function addBgLines() {
    $(".wrapper > div, footer").append(bgLines), $(".aboutBlock").append(bgLines), bgLinesClone = $(".aboutBlock .bgLines").last(), bgLinesClone.addClass("clone")
}

function initParallax() {
    $(".illustration").attr("data-depth", "0.1"), $(".gridInfo .container").each(function (a) {
        new Parallax($(this)[0], {
            selector: ".illustration",
            invertX: a % 2,
            invertY: a % 2,
            limitX: 30,
            limitY: 30
        })
    })
}

function setQuoteClipPath() {
    "undefined" == typeof blockquoteBlock && (blockquoteBlock = $(".blockquoteBlock")), "undefined" == typeof aboutBlock && (aboutBlock = $(".aboutBlock"));
    var a = {
            top: aboutBlock.offset().top,
            left: aboutBlock.offset().left
        },
        b = {
            top: blockquoteBlock.offset().top,
            left: blockquoteBlock.offset().left
        },
        c = b.top - a.top,
        d = b.left + blockquoteBlock.innerWidth();
    991 < window_width && (d = window_width);
    var e = c + blockquoteBlock.innerHeight();
    bgLinesClone.css({
        "clip-path": "polygon(".concat(b.left, "px ").concat(c, "px, ").concat(d, "px ").concat(c, "px, ").concat(d, "px ").concat(e, "px, ").concat(b.left, "px ").concat(e, "px)")
    })
}
$(document).ready(function () {
    scrollTopBtn = $(".scrollTopBtn"), $(window).scroll(checkScrollBtn), checkScrollBtn(), $(".scrollTopBtn").click(function () {
        scrollTo("body, html", 0)
    })
});

function checkScrollBtn() {
    $(window).scrollTop() > scrollBtnBorder && !showScrollBtn && (showScrollBtn = !0, scrollTopBtn.fadeIn(animationTime));
    $(window).scrollTop() <= scrollBtnBorder && showScrollBtn && (showScrollBtn = !1, scrollTopBtn.fadeOut(animationTime))
}
$(document).ready(function () {
    $(".partnersSlider").each(function () {
        new Swiper($(this).find(".swiper-container")[0], {
            loop: !0,
            lazy: {
                loadPrevNext: !0,
                loadPrevNextAmount: 2
            },
            slidesPerView: 5,
            spaceBetween: 0,
            breakpoints: {
                640: {
                    slidesPerView: 4
                }
            }
        })
    })
    
});
  
    