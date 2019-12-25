const accordionAll = $(".faqBlock .accordion");
const accordionGrid = '<div class="col-6"></div><div class="col-6"></div>';
let accordionsWrap, accordionsMainBlock;
let accordionColumns = undefined;
let accordionLimit = undefined;
function getAccordColumsCount() {
    let columns = (window_width > 1024 && window_width <= 1440) ? 2 : 1;
    return {
        columns: columns,
        limit: (window_width <= 640) ? 4 : (columns == 2 ? 10 : 7),
    }
};
function createAccordGrid() {
    const { columns, limit } = getAccordColumsCount();
    if (accordionColumns == columns && accordionLimit == limit) return false;
    accordionColumns = columns; accordionLimit = limit; // update data
    if (typeof accordionsWrap == 'undefined') accordionsWrap = $(".accordionsWrap");
    if (typeof accordionsMainBlock == 'undefined') accordionsMainBlock = $('.faqBlock').find(".accordionsMainBlock");
    accordionsMainBlock.append(accordionAll)
    accordionsWrap.find(".col-6").remove();
    accordionAll.removeClass("open").find(".content").stop(true).slideUp(0);
    accordionAll.first().addClass("open").find(".content").stop(true).slideDown(0);
    // ----
    if (columns == 2) {
        accordionsWrap.append(accordionGrid);
        accordionsWrap.find(".col-6").each(function (i) {
            $(this).append(accordionAll.slice(!i ? 0 : limit / 2, !i ? limit / 2 : limit));
        });
    } else {
        accordionsWrap.append(accordionAll.slice(0, limit));
    };
    if (accordionAll.length > limit) $(".showMoreFaq").show(0);
};

function showMoreFaq() {
    accordionsWrap = $(".accordionsWrap");
    const { columns, limit } = getAccordColumsCount();
    let height = accordionsWrap.innerHeight();
    if (columns == 2) {
        const length = accordionAll.length;
        accordionsWrap.find(".col-6").each(function (i) {
            $(this).append(accordionAll.slice(!i ? 0 : length / 2, !i ? length / 2 : length));
        });
    } else {
        accordionsWrap.append(accordionAll);
    }
    let newHeight = accordionsWrap.innerHeight();
    accordionsWrap.height(height);
    accordionsWrap.animate({
        height: newHeight
    }, animationTime * 2, () => { accordionsWrap.height(''); });
    $(".showMoreFaq").slideUp(0);
    let middle = accordionAll.eq(limit).offset().top - window_height / 2;
    scrollTo('body, html', middle);
};

$(document).ready(function () {
    createAccordGrid();
    let accordions = $(".faqBlock .accordion");
    accordions.first().addClass("open").find(".content").show();
    $(".accordion .top").click(function () {
        $(this).parent().siblings('.accordion').removeClass("open").find(".content").stop(true).slideUp(animationTime);
        $(this).parent().toggleClass("open");
        if ($(this).parent().hasClass("open")) {
            $(this).next().stop(true).slideDown(animationTime);
        } else {
            $(this).next().stop(true).slideUp(animationTime);
        };
    });
});