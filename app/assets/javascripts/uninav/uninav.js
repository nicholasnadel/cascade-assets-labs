// uninav accessibility
$(function () {
  hideChildMenuWhenLoseFocus();
  toggleAriaExpandVal();
});

function toggleAriaExpandVal() {
  $('#uninav li').on('click keypress', function (e) {
    if (a11yClick(event) === true) {
      var menuItem = $(e.currentTarget);
      if (menuItem.attr('aria-expanded') === 'true') {
        $(this).attr('aria-expanded', 'false');
      } else {
        $(this).attr('aria-expanded', 'true');
      }
    }
  });
}

function hideChildMenuWhenLoseFocus() {
  $('.uninav__menu-item-dropdown-child li:last-of-type').on("focusout", function () {
    // console.log(this)
    // console.log('lost focus on child <a> ')
    var dropdownParent = $(this).closest('.uninav__menu-item-dropdown-parent')
    // console.log(dropdownParent)
    $(dropdownParent).attr('aria-expanded', 'false');
  });
}

function a11yClick(event) {
  if (event.type === 'click') {
    return true;
  } else if (event.type === 'keypress') {
    var code = event.charCode || event.keyCode;
    if ((code === 32) || (code === 13)) {
      return true;
    }
  } else {
    return false;
  }
}
// end uninav accessibility
// off-canvas overlay - add to main content when expanded
$(function () {
  var sectionMenuButton = $('#section-menu-hamburger-icon')
  $('#umbrella-nav-button-toggle').on('click', function () {
    $('html, #main').addClass('off-canvas__blur');
  });
  $('.js-close-off-canvas-nav').on('click', function () {
    // console.log('clicked');
    $('html, #main').removeClass('off-canvas__blur');
  });
});
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
  if (window.matchMedia("(max-width: 1300px)").matches) {
    $('button.gsc-search-button.gsc-search-button-v2').click(function (event) {
      event.preventDefault();
      console.log('smaller than 1300 media query');
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
