let navSections, headerNav, headerNavIndex;
$(document).ready(function () {
    headerNav = $("header nav a.section");
    $("header nav a.section").each(function (i) {
        const href = $(this).attr("href");
        !i ? navSections = $(href) : navSections = navSections.add($(href));
    });
    $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop();
        navSections.each(function (i) {
            const top = $(this).position().top;
            const height = $(this).innerHeight();
            const middle = scrollDistance + window_height / 2;
            if (middle >= top && middle <= top + height) {
                if (headerNavIndex == i) return false;
                headerNavIndex = i;
                headerNav.removeClass('active');
                headerNav.eq(i).addClass('active');
                return false;
            }
            if (i == navSections.length - 1) {
                headerNavIndex = undefined;
                headerNav.removeClass('active');
            }
        });
    }).scroll();
});