// Accounts for Omninav height when scrolling to anchor links in WYSIWYG https://trello.com/c/ZCjBDv9e
$(function () {
  if ($('.wysiwyg-widget').length > 0) {
    // Remove spaces in anchor link urls
    $('a').each(function (removeSpace) {
      $(this).attr('href', encodeURI($(this).attr('href')));
      if (typeof attr !== typeof undefined && attr !== false) {
        // Element has this attribute
      }
    });
    $('a[href*=\\#]:not([href=\\#])').click(function () {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
              scrollTop: target.offset().top - 125 //offsets for fixed header
            },
            1000
          );
          return false;
        }
      }
    });
    //Executed on page load with URL containing an anchor tag.
    if ($(location.href.split('#')[1])) {
      var target = $('#' + location.href.split('#')[1]);
      if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top - 125 //offset height of header here too.
          },
          1000
        );
        return false;
      }
    }
  }
});

function removeSpace() {
  $('a').replace(/%20/g, ' ');
}
