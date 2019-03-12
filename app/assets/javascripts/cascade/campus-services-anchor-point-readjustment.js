$(function () {
  // Remove spaces in anchor link urls
  $("a").each(function () {
    $(this).attr('href', encodeURI($(this).attr("href")));
    
    var attr = $(this).attr('name');
    var eyeDee = $(this).attr('id');
    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).attr('name', eyeDee)
    }
    
    
  });
 

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
