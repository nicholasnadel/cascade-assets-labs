$(function () {
  $(".accordion .content").not(".accordion.collapsed .content").toggle();
  $(".accordion .header").click(function () {
    $(this).parent(".accordion").attr('aria-expanded', function (i, attr) {
      return attr == 'true' ? 'false' : 'true'
    });
    $(this).parent(".accordion").toggleClass("collapsed").children(".content").slideToggle('fast');
  });
  $(".accordion").children(".header").keydown(function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      $(this).parent(".accordion").toggleClass("collapsed").children(".content").slideToggle('fast');
      return false
    }
  })
  $(".collapsibles-widget .toggle-expand-collapse").click(function () {
    $(".toggle-expand-collapse").toggleClass("collapsed");
    $(".accordion").removeClass('collapsed expanded');
    $(".accordion").toggleClass("collapsed");
    $(".accordion .content").toggle();
  });
});
