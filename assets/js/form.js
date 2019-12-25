let ajaxCalcAccess = true;
var arr_timers_form_input = [];
var arr_timers_form_textarea = [];
function createError(item) {
    create_timer(item);
    item.closest('.with_line').addClass("error");
    item.closest('.with_line').find(".error_text").fadeIn(250);
};
function create_timer(item) {
    var mass;
    let type = item.attr("type");
    let index = $("form input").index(item);
    (type == 'input') ? mass = arr_timers_form_input[index] : arr_timers_form_textarea[index];
    clearTimeout(mass);
    mass = setTimeout(function () {
        item.parent().removeClass("error");
        item.parent().find(".error_text").fadeOut(300);
    }, 3000);
};

function scrollToErrorInput() {
    let inputTop, scrollTop;
    if ($(this).closest(".popup_block").length) {
        inputTop = $(this).closest("label").position().top;
        scrollTop = $(".popup_block:visible .popupContent").scrollTop();
        if (inputTop < scrollTop + $("header").innerHeight() || inputTop > scrollTop + window.innerHeight) {
            scrollTo('.popup_block:visible .popupContent', inputTop, 0.5)
        }
    } else {
        inputTop = $(this).closest("label").offset().top;
        scrollTop = $(window).scrollTop();
        if (inputTop < scrollTop + $("header").innerHeight() || inputTop > scrollTop + window.innerHeight) {
            scrollTo('body, html', inputTop - $("header").innerHeight() - 50)
        }
    }
};

$(".contactForm, .regForm").submit(function (e) {
    e.preventDefault();
    var thise = $(this);
    var form = $(this);
    var error = false;
    form.find(".error").removeClass("error");
    form.find(".error_text").remove();
    form.find("input").each(function () {
        if ($(this).val() == "" && $(this).prop('required')) {
            if (!error) scrollToErrorInput.call($(this));
            error = true;
            $(this).after('<span class="error_text">Required</span>');
            createError($(this))
        };
        // для телефона
        if ($(this).attr("type") == "tel") {
            if ($(this).val().length < 20) {
                if (!error) scrollToErrorInput.call($(this));
                error = true;
                if ($(this).val().length) {
                    $(this).after('<span class="error_text">Required</span>');
                } else {
                    $(this).after('<span class="error_text">Syntax error</span>');
                }
                createError($(this))
            };
        };
        // для почты
        if ($(this).attr("type") == "email") {
            var val = $(this).val();
            if (!~val.indexOf("@") || !~val.indexOf(".") || !val.length) {
                if (!error) scrollToErrorInput.call($(this));
                error = true;
                if (val.length) {
                    $(this).after('<span class="error_text">Incorrect email address</span>');
                } else {
                    $(this).after('<span class="error_text">Required</span>');
                }
                createError($(this));
            };
        };
    });
    form.find("textarea").each(function () {
        if ($(this).val() == "" && $(this).prop('required')) {
            if (!error) scrollToErrorInput.call($(this));
            error = true;
            $(this).after('<span class="error_text">Required</span>');
            createError($(this))
        };
    });
    if (!error) {
        let data = form.serialize();
        alert("success")
    }
    return false;
});

