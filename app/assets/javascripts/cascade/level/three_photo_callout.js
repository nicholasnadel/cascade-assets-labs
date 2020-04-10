$(document).ready(function () {
    numberOfPhotos = $(".three-photo-callout-widget__container > a").size();
    x = 6;
    var count = 0;
    $('.three-photo-callout-widget__container > a:lt(' + x + ')').show(0);
    $('#three-photo-callout-widget__load-more').click(function () {
        count += 1;
        console.log('count ' + count);

        if (count < 2) {
            // condition ? value-if-true : value-if-false
            x = (x + 3 <= numberOfPhotos) ? x + 3 : numberOfPhotos;
            $('.three-photo-callout-widget__container > a:lt(' + x + ')').show(0);
        } else if (count == 2) {
            $('#three-photo-callout-widget__load-more').text('Load All')
            x = (x + 3 <= numberOfPhotos) ? x + 3 : numberOfPhotos;
            $('.three-photo-callout-widget__container > a:lt(' + x + ')').show(0);
        } else if (count > 2) {
            $('.three-photo-callout-widget__container > a').show(0);
            $('#three-photo-callout-widget__load-more').fadeOut('slow');
        }
    });
});