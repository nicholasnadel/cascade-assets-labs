$(document).ready(function () {
    $.each($('.three-photo-callout-widget__container'), function (ind) {
        $(this).attr('id', 'three-photo-callout-widget__container__' + parseInt(ind + 1));
        var currentWidgetContainer = $(this).closest('.three-photo-callout-widget__container').attr('id');
        console.log(currentWidgetContainer)
        var numberOfPhotos = $('#' + currentWidgetContainer + " img").size()
        console.log(currentWidgetContainer + numberOfPhotos);
        var loadMoreButtonButton = ' + .three-photo-callout-widget__button';
        var currentButton = '#' + currentWidgetContainer + loadMoreButtonButton;
        console.log("'" + currentButton + "'");
        var numberOfPhotoLinksToReveal = 3;
        var numberOfPhotoDivsToReveal = 3;
        $('#' + currentWidgetContainer + ' > a:lt(' + 3 + ')').show();
        $('#' + currentWidgetContainer + ' > div:lt(' + 3 + ')').show();
        var buttonClickCounter = 0;
        console.log('number photos: ' + numberOfPhotos)
        if (numberOfPhotos > 3) {
            $(currentButton).show();
            console.log('revealing each load more button');
        }
        $(currentButton).click(function () {
            buttonClickCounter += 1;
            numberOfPhotoLinksToReveal = (numberOfPhotoLinksToReveal + 3);
            $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotoLinksToReveal + ')').show();
            if (buttonClickCounter < 2) {
                $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotoLinksToReveal + ')').show();
                $('#' + currentWidgetContainer + ' > div:lt(' + numberOfPhotoLinksToReveal + ')').show();
            } else if (buttonClickCounter == 2 && numberOfPhotos > 6) {
                $(currentButton).text('Load All')
                $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotoLinksToReveal + ')').show();
                $('#' + currentWidgetContainer + ' > div:lt(' + numberOfPhotoLinksToReveal + ')').show();

            } else if (buttonClickCounter > 2) {
                $('#' + currentWidgetContainer + ' > a').show(0);
                $('#' + currentWidgetContainer + ' > div').show(0);
                $(currentButton).text('All Photos Loaded')
                $(currentButton).fadeOut(0);
            }
            var currentVisible = $('#' + currentWidgetContainer + ' .three-photo-callout-widget:visible').size()

            console.log('currentVisible: ' + currentWidgetContainer + ' ' + currentVisible + 'number of photos: ' + numberOfPhotos)


            if (currentVisible == numberOfPhotos) {
                console.log('currentVisible: ' + currentWidgetContainer + ' ' + currentVisible)
                console.log('number of photo links to reveal: ' + currentWidgetContainer + ' ' + numberOfPhotoLinksToReveal)
                $(currentButton).text('All Photos Loaded')
                $(currentButton).fadeOut(0);
            }
            console.log('number of photos: ' + currentWidgetContainer + ' ' + numberOfPhotos)
        });
    });
});
function resetbuttonClickCounterer() {
    var buttonClickCounter = 0;
    console.log('buttonClickCounter ' + buttonClickCounter);
}
