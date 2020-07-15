
// lazy.js
$('.lazy').lazy({
    afterLoad: function (element) {
        $(element).css({
            'visibility': 'visible',
        }).fadeTo(150, 1)
    },
});
// lazy.js