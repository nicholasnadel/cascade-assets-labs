$(function () {
    var vid = $("video#homepage-masthead__video");

    vid.controls = false;


    // $("#homepage-masthead__pause-button").click(function () {
    // if ($(vid).get(0).paused) {
    //     $('video').trigger('play');
    // } else {
    //     $('video').trigger('pause');
    // }
    // });

    $('.homepage-masthead__toggle-play-button').on('click keydown', function (event) {
        togglePlay();
    });
});


function togglePlay() {
    var vid = $("video#homepage-masthead__video");
    if ($(vid).get(0).paused) {
        $(vid).trigger('play');
        vid.removeClass('homepage-masthead__play-video--paused')

        $('#homepage-masthead__play-button').hide();
        $('#homepage-masthead__pause-button').show();


    } else {
        $(vid).trigger('pause');
        vid.addClass('homepage-masthead__video--paused')
        $('#homepage-masthead__pause-button').hide();
        $('#homepage-masthead__play-button').show();


    }
}
// KEYS 🎹
function a11yClick(event) {
    console.log('keypress')
    if (event.type === 'click') {
        togglePlay();
        return true;
    } else if (event.type === 'keypress') {
        var code = event.charCode || event.keyCode;
        if ((code === 32) || (code === 13)) {
            togglePlay();
            return true;
        }
    } else {
        return false;
    }
}