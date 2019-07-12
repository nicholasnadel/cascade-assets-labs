function toggleCampusMapInfo() {
  $("#campusMapWidget span.minimize").click(function () {
    $('#campusMapWidget .box, #campusMapWidget .box-inner').hide();
    $('#campusMapWidget span.info').show();
  })
  $("#campusMapWidget span.info").click(function () {
    $('#campusMapWidget .box, #campusMapWidget .box-inner').show();
    $('#campusMapWidget span.info').hide();
  })
}

function hideCampusMapInfo() {
  $("#campusMapWidget span.minimize").click()
}

function showCampusMapInfo() {
  $("#campusMapWidget span.info").click()
}

function ifFirstVisit() {
  // var ls = localStorage.getItem('namespace.vistited');
  // if (ls == null) {
  //   console.log("Your first visit");
  //   hideCampusMapInfo();
  //   localStorage.setItem('namespace.vistited', 1)
  // }
  if (document.cookie.indexOf('_viewedMap') <= 0) {
    $('#campusMapWidget iframe#map_frame').css('height', '100%');
    $('#campusMapWidget .box, #campusMapWidget .box-inner').hide();
    $('#campusMapWidget span.info').show();
  }
}

$(function () {
  if ($('.campus-map').length) {
    console.log('campus map')
    ifFirstVisit();
    toggleCampusMapInfo();
  }
});