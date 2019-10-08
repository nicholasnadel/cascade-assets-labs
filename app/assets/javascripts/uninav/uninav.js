window.onload = gs__customPlaceholder;
$(window).load(function () {
  $('#gsc-i-id1').on('input focus click', function () {
    gs__blurBg();
  });
});

function gs__customPlaceholder() {
  document.getElementById("gsc-i-id1").setAttribute("placeholder", "Search...");
  document.getElementById("gsc-i-id1").style.opacity = "1";
}

function gs__blurBg() {
  $('.gsc-completion-container').css('background', 'transparent');
  $('.gsc-completion-container').css('background-color', 'rgba(255, 255, 255, 0.98)');

}