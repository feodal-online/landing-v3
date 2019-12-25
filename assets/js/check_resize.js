// check_resize.js
function get_responsive(responsive, window_width = $(window).innerWidth()) {
    let prev = false;
    let i;
    let responsiveArr = responsive.slice();
    responsiveArr.push(99999999)
    $.each(responsiveArr, function (index, element) {
        if (prev !== false && window_width <= responsiveArr[index] && window_width > prev) {
            i = index - 1;
            return false;
        } else {
            prev = element;
        }
    });
    // console.log('responsive = ' + responsiveArr);
    // console.log(responsive[i]);
    return responsiveArr[i];
};
let responsiveNow;
const responsiveSteps = [0, 540, 640, 991, 1024, 1080, 1440];
function check_resize() {
    responsiveNow = get_responsive(responsiveSteps);
    check_resizeDo(responsiveNow);
    $(window).resize(function () {
        if (responsiveNow != get_responsive(responsiveSteps)) {
            responsiveNow = get_responsive(responsiveSteps);
            check_resizeDo(responsiveNow);
        }
    });
}
function check_resizeDo(responsiveNow) {
    switch (responsiveNow) {
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
            break;
    }
    createAccordGrid();
}

// check_resize.js