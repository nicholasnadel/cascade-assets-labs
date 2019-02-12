function nsLandmark() {
  $('noscript').wrap('<section role="no script">')
}

$(window).load(function () {
  nsLandmark();
});