// Accounts for Omninav height when scrolling to anchor links in WYSIWYG https://trello.com/c/ZCjBDv9e
$(function () {
  var omniHeight = $('div#primary-nav').height()

  // Smooth scrolling to target
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - omniHeight //offsets for fixed header
        }, 1000);
        return false;
      }
    }
  });
  //Executed on page load with URL containing an anchor tag.
  if ($(location.href.split("#")[1])) {
    var target = $('#' + location.href.split("#")[1]);
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - omniHeight //offset height of header here too.
      }, 1000);
      return false;
    }
  }
});