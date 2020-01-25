// uninav accessibility
$(function () {
  hideDropdownMenuWhenLoseFocus();
  toggleAriaExpandVal();
  handleEscapeKeypress();
});

function handleEscapeKeypress() {
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      $(".uninav__menu-item-dropdown-parent").attr('aria-expanded', 'false');
    }
  };
}

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

function hideDropdownMenuWhenLoseFocus() {
  $(".uninav__menu-item-dropdown-child li:last-of-type").on('keydown blur', function (e) {
    if (e.shiftKey && e.keyCode === 9) {
      // console.log('shift tab')
      //     return false;
    } else if (e.keyCode === 9) {
      // if tab
      // console.log('tab')
      var dropdownParent = $(this).closest('.uninav__menu-item-dropdown-parent')
      // console.log(dropdownParent)
      $(dropdownParent).attr('aria-expanded', 'false');
      return false;
    } else if (e.type == 'blur') {
      $(dropdownParent).attr('aria-expanded', 'false');
      // console.log('mosueOUt');
    }
  });

  // handle clicking outside of dropdown item
  $(document).on('click', function (e) {
    if ($(e.target).closest(".uninav__menu-item-dropdown-parent").length === 0) {
      $(".uninav__menu-item-dropdown-parent").attr('aria-expanded', 'false');
    }
  });

  // handle clicking outside of dropdown item
  $('.uninav__menu-item-dropdown-parent').on('click', function (e) {
    if ($(e.target).closest(".uninav__menu-item-dropdown-parent").length === 0) {
      $(".uninav__menu-item-dropdown-parent").attr('aria-expanded', 'false');
    }
  });



}

function collapseAriaWhenClickOutside() {
  $(document).mouseup(function (e) {
    var container = $(".uninav__menu-item-dropdown-parent");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.hide();
    }
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
