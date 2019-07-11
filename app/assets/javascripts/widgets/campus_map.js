$(function () {
  $("#campusMapWidget span.minimize").click(function () {
    $('#campusMapWidget .box, #campusMapWidget .box-inner').hide();
    $('#campusMapWidget span.info').show();
  })
  $("#campusMapWidget span.info").click(function () {
    $('#campusMapWidget .box, #campusMapWidget .box-inner').show();
    $('#campusMapWidget span.info').hide();
  })
});