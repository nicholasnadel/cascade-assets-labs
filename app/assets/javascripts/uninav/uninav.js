// gs = Google Search

// replace Google Custom Search default placeholder
window.onload = gs__customPlaceholder;

function gs__customPlaceholder() {
  document.getElementById("gsc-i-id1").setAttribute("placeholder", "Search...");
  document.getElementById("gsc-i-id1").style.opacity = "1";
}

// TODO: iOS style frosted/blurred background. CSS filter: blur(2px) performance is terrible
$(window).load(function () {
  $('#gsc-i-id1').on('input focus click', function () {
    gs__blurBg();
  });

  // tap to reveal search input on mobile
  if (document.documentElement.clientWidth < 1200) {
    gs__mobileReveal();
  }
});



function gs__mobileReveal() {
  $('.gsc-search-button.gsc-search-button-v2').click(function (event) {
    if ($('.gsc-clear-button').is(':hidden')) {
      event.preventDefault();
      $('.uninav__search-input').toggleClass('uninav__search-input--mobile');
      $('input#gsc-i-id1').focus();
    }
  });
}


function gs__blurBg() {
  $('.gsc-completion-container').css('background', 'transparent');
  $('.gsc-completion-container').css('background-color', 'rgba(255, 255, 255, 0.98)');
}
