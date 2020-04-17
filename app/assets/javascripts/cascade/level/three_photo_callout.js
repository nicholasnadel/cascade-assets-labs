$(document).ready(function () {
    $.each($('.photo-callout-widget__container'), function (ind) {
        $(this).attr('id', 'three-photo-callout-widget__container__' + parseInt(ind + 1));
        var currentWidgetContainer = $(this).closest('.photo-callout-widget__container').attr('id');
        console.log(currentWidgetContainer)
        var currentTotalNumberOfPhotos = $('#' + currentWidgetContainer + " img").size()
        console.log(currentWidgetContainer + currentTotalNumberOfPhotos);
        var loadMoreButtonButton = ' + .photo-callout-widget__button';
        var currentButton = '#' + currentWidgetContainer + loadMoreButtonButton;
        console.log("'" + currentButton + "'");
        var numberOfPhotoLinksToReveal = 3;
        var numberOfPhotoDivsToReveal = 3;
        $('#' + currentWidgetContainer + ' > a:lt(' + 3 + ')').show();
        $('#' + currentWidgetContainer + ' > div:lt(' + 3 + ')').show();
        var buttonClickCounter = 0;
        console.log('number photos: ' + currentTotalNumberOfPhotos)
        if (currentTotalNumberOfPhotos > 3) {
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
            } else if (buttonClickCounter == 2 && currentTotalNumberOfPhotos > 6) {
                $(currentButton).text('Load All')
                $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotoLinksToReveal + ')').show();
                $('#' + currentWidgetContainer + ' > div:lt(' + numberOfPhotoLinksToReveal + ')').show();

            } else if (buttonClickCounter > 2) {
                $('#' + currentWidgetContainer + ' > a').show(0);
                $('#' + currentWidgetContainer + ' > div').show(0);
                $(currentButton).text('All Photos Loaded')
                $(currentButton).fadeOut(0);
            }
            var currentVisible = $('#' + currentWidgetContainer + ' .photo-callout-widget:visible').size()

            console.log('currentVisible: ' + currentWidgetContainer + ' ' + currentVisible + 'number of photos: ' + currentTotalNumberOfPhotos)


            if (currentVisible == currentTotalNumberOfPhotos) {
                console.log('currentVisible: ' + currentWidgetContainer + ' ' + currentVisible)
                console.log('number of photo links to reveal: ' + currentWidgetContainer + ' ' + numberOfPhotoLinksToReveal)
                $(currentButton).text('All Photos Loaded')
                $(currentButton).fadeOut(0);
            }
            console.log('number of photos: ' + currentWidgetContainer + ' ' + currentTotalNumberOfPhotos)
        });
    });
    objectFitFallBackForIe();
});
function resetbuttonClickCounterer() {
    var buttonClickCounter = 0;
    console.log('buttonClickCounter ' + buttonClickCounter);
}



// object-fit fallback for ie internet explorer
function objectFitFallBackForIe() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (
        msie > 0 ||
        (!!navigator.userAgent.match(/Trident.*rv\:11\./) &&
            $(".photo-callout-widget__img").length)
    ) {
        $("img.photo-callout-widget__img").each(function () {
            var t = $(this),
                s = "url(" + t.attr("src") + ")",
                p = t.parent(),
                d = $("<div class='ie__fallback--object-fit'></div>");
            t.hide();
            p.append(d);
            d.css({
                height: 150,
                "background-size": "cover",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-image": s
            });
        });
    }
}
