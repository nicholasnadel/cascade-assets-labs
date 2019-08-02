$(function () {
  $(".accordion .content").not(".accordion.active .content").toggle();

  $(".accordion .header").click(function () {
    $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
  });

  $(".accordion").children(".header").keydown(function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {

      $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
      return false
    }
  })


  $(".collapsibles-widget .toggle-expand-collapse").click(function () {
    $(".toggle-expand-collapse").toggleClass("collapsed");
    $(".accordion").removeClass('active');
    $(".accordion").toggleClass("active");
    $(".accordion .content").toggle();
    
    // $(".toggle-expand-collapse").toggleClass("collapsed");
    // $(".accordion .content").not(".accordion.active .content").toggle();
  });
});
