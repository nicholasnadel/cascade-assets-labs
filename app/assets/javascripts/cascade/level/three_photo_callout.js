$(document).ready(function () {
    size_li = $(".three-photo-callout-widget__container > a").size();
    x = 3;
    $('.three-photo-callout-widget__container > a:lt(' + x + ')').show();
    $('#three-photo-callout-widget__load-more').click(function () {
        x = (x + 6 <= size_li) ? x + 6 : size_li;
        $('.three-photo-callout-widget__container > a:lt(' + x + ')').show();
    });
});