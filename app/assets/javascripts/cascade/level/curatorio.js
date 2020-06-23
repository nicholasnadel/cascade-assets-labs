$(window).load(function () {
    checkElement('.crt-feed-window') //use whichever selector you want
        .then((element) => {
            console.info(element);
            setTimeout(function () { addUniqueDataAttrsToCuratorPosts() }, 500);
        });

    function rafAsync() {
        return new Promise(resolve => {
            requestAnimationFrame(resolve); //faster than set time out
        });
    }

    function checkElement(selector) {
        if (document.querySelector(selector) === null) {
            return rafAsync().then(() => checkElement(selector));
        } else {
            return Promise.resolve(true);
        }
    }
});


function addUniqueDataAttrsToCuratorPosts() {
    console.log('adding UniqueDataAttrsToCuratorPosts')
    $(".crt-grid-post").each(function () {
        var bgUrl = $(this).find('.crt-grid-post-image').css("background-image");
        var bgID = bgUrl.split('/p/')[1];
        var pieces = bgUrl.split("/p/");
        anchor = pieces[1].split("/");
        console.log('anchor ' + anchor[0])
        $(this).attr('data-fragment-id', anchor[0]);
    });


    var url = window.location.hash
    var fragment = url.split("/#ig-fragment=");
    console.log('fragment ' + fragment)
    var currentAnchor = window.location.hash.split('=')[1];
    console.log('current anchor ' + currentAnchor)

    // setTimeout(function () {
    //     $('html').animate({ scrollTop: $('[data-fragment-id="' + currentAnchor + '"]').offset().top - 120 }, 500);
    // }, 1000);
    $('html').animate({ scrollTop: $('[data-fragment-id="' + currentAnchor + '"]').offset().top - 120 });

    setTimeout(function () { $('[data-fragment-id="' + currentAnchor + '"]').find('.crt-post-text').trigger('click') }, 1000);
}

function scrollToDataAttrAnchor() {
    var url = window.location.hash
    var fragment = url.split("/#ig-fragment=");
    console.log('fragment ' + fragment)
    var currentAnchor = window.location.hash.split('=')[1];
    console.log('current anchor ' + currentAnchor)

    // setTimeout(function () {
    //     $('html').animate({ scrollTop: $('[data-fragment-id="' + currentAnchor + '"]').offset().top - 120 }, 500);
    // }, 1000);
    $('html').animate({ scrollTop: $('[data-fragment-id="' + currentAnchor + '"]').offset().top - 120 });
    $('[data-fragment-id="' + currentAnchor + '"]').find('.crt-post-text').trigger('click');
}

