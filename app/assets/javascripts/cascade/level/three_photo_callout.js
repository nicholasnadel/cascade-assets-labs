$(document).ready(function () {

    $.each($('.three-photo-callout-widget__container'), function (ind) {
        $(this).attr('id', 'three-photo-callout-widget__container__' + parseInt(ind + 1));
        var currentWidgetContainer = $(this).closest('.three-photo-callout-widget__container').attr('id');
        console.log(currentWidgetContainer)
        var numberOfPhotos = $('#' + currentWidgetContainer).find("a").size();
        console.log(numberOfPhotos);

        var loadMoreButtonButton = ' + .three-photo-callout-widget__button';
        var currentButton = '#' + currentWidgetContainer + loadMoreButtonButton;
        console.log("'" + currentButton + "'");

        x = 6;
        var count = 0;
        $('.three-photo-callout-widget__container > a:lt(' + x + ')').show(0);
        $(currentButton).click(function () {
            count += 1;
            console.log('count ' + count);

            if (count < 2) {
                // condition ? value-if-true : value-if-false
                x = (x + 3 <= numberOfPhotos) ? x + 3 : numberOfPhotos;
                $('#' + currentWidgetContainer + ' > a:lt(' + x + ')').show(0);
            } else if (count == 2) {
                $(currentButton).text('Load All')
                x = (x + 3 <= numberOfPhotos) ? x + 3 : numberOfPhotos;
                $('#' + currentWidgetContainer + ' > a:lt(' + x + ')').show(0);
            } else if (count > 2) {
                $('#' + currentWidgetContainer + ' > a').show(0);
                $(currentButton).fadeOut();
            }
        });
    });
});