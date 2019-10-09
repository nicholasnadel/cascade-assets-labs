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
});

$(window).on("load resize", function (e) {
  gs__mobileReveal()
});



function gs__mobileReveal() {
  console.log('gs__mobileReveal')
  if (window.matchMedia("(max-width: 1200px)").matches) {
    $('button.gsc-search-button.gsc-search-button-v2').click(function (event) {
      event.preventDefault();
      console.log('smaller than 1200 media query');

      $('.gsc-input').toggle();
      $('.uninav__search-input').toggleClass('uninav__search-input--desktop');
      if ($('.gsc-input').is(':visible')) {
        $('input#gsc-i-id1').focus();
      }
    });
  } else {
    console.log('wider than 1201 media query');
    $('.uninav__search-input').addClass('uninav__search-input--desktop');
    $('.gsc-input').show();

  }
}


function gs__blurBg() {
  $('.gsc-completion-container').css('background', 'transparent');
  $('.gsc-completion-container').css('background-color', 'rgba(255, 255, 255, 0.98)');
}