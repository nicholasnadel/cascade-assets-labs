$(function () {
  // Remove invalid WYSIWYG spaces in anchor link href

  $(function noSpace() {
    $("a").each(function () {
      var attr = $(this).attr('href');
      if (typeof attr !== typeof undefined && attr !== false) {
        $(this).attr('href', $(this).attr("href").replace(/\s/g, "-"))
        $(this).attr('href', $(this).attr("href").replace(/\s/g, "-"))
      }
      // Remove invalid WYSIWYG spaces in name attributes
      var attr = $(this).attr('name');
      if (typeof attr !== typeof undefined && attr !== false) {
        $(this).attr('name', $(this).attr("name").replace(/\s/g, "-"))
        $(this).attr('name', $(this).attr("name").replace(/\//g), '-')
      }
    });
  });

  // Replace forward slashes in attrs with dashes
  $(function noSlash() {
    $(".a-z a").each(function () {
      var attr = $(this).attr('href');
      if (typeof attr !== typeof undefined && attr !== false) {
        $(this).attr('href', $(this).attr("href").replace(/\//g, "-"))
      }
      var attr = $(this).attr('name');
      if (typeof attr !== typeof undefined && attr !== false) {
        $(this).attr('name', $(this).attr("name").replace(/\//g, "-"))
      }
    });
  });

  // Replace periods in attrs with dashes
  $(function noPeriod() {
    $(".a-z a").each(function () {
      var attr = $(this).attr('href');
      if (typeof attr !== typeof undefined && attr !== false) {
        $(this).attr('href', $(this).attr("href").replace(/\./g, '+'))
      }
      var attr = $(this).attr('name');
      if (typeof attr !== typeof undefined && attr !== false) {
        $(this).attr('name', $(this).attr("name").replace(/\./g, '+'))
      }
    });
  });


  // Smooth scrolling to target
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 125 //offsets for fixed header
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
        scrollTop: target.offset().top - 125 //offset height of header here too.
      }, 1000);
      return false;
    }
  }
});