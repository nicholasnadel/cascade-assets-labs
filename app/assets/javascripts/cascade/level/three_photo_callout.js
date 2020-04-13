$(document).ready(function () {
    $.each($('.three-photo-callout-widget__container'), function (ind) {
        $(this).attr('id', 'three-photo-callout-widget__container__' + parseInt(ind + 1));
        var currentWidgetContainer = $(this).closest('.three-photo-callout-widget__container').attr('id');
        console.log(currentWidgetContainer)
        var numberOfPhotos = $('#' + currentWidgetContainer + " > a").size()
        console.log(currentWidgetContainer + numberOfPhotos);
        var loadMoreButtonButton = ' + .three-photo-callout-widget__button';
        var currentButton = '#' + currentWidgetContainer + loadMoreButtonButton;
        console.log("'" + currentButton + "'");
        var numberOfPhotosToReveal = 3;
        $('#' + currentWidgetContainer + ' > a:lt(' + 3 + ')').show();
        var count = 0;
        $(currentButton).click(function () {
            count += 1;
            var currentVisible = $('#' + currentWidgetContainer + ' a:visible').size()
            numberOfPhotosToReveal = (numberOfPhotosToReveal + 3);
            $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotosToReveal + ')').show();
            if (count < 2) {
                // condition ? value-if-true : value-if-false
                $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotosToReveal + ')').show();
            } else if (count == 2) {
                $(currentButton).text('Load All')
                $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotosToReveal + ')').show();
            } else if (count > 2) {
                $('#' + currentWidgetContainer + ' > a').show(0);
                $(currentButton).fadeOut();
            }
        });
    });
});

function resetCounter() {
    var count = 0;
    console.log('count ' + count);
}