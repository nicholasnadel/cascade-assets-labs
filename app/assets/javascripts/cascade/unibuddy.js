$(window).load(function () {
    if ($('iframe#unibuddy-popcard-iframe').length >= 0) {

        $("iframe#unibuddy-popcard-iframe").load(function () {
            $('#unibuddy-popcard-iframe').detach().appendTo('nav#uninav')
        });

    }
});
