$(document).ready( function() {
  $('#uninav .off-canvas-nav .toggle').on('click', function() {
    var $rootNav = $('.root-umbrella-nav');
    debugger
    $(this).siblings('.drilldown-menu').show();
    // $(this).siblings('.drilldown-menu').addClass('show');
    $('.root-umbrella-nav').css({ transform: "translateX(-40rem)"});
  });
});