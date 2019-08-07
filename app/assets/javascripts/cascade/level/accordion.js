$(function () {
  $(".accordion .content").not(".accordion.active .content").css("display", "none");
  $(".accordion .header").click(function () {
    $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
  });
  $(".accordion").children(".header").keydown(function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
      return false
    }
  })

  function expandAll() {
    $(".collapsibles-widget .toggle-expand-collapse.expand").click(function () {
      $(".accordion").addClass('active');
      $(".accordion .content").css('display', 'block');
      $('.collapsibles-widget .toggle-expand-collapse.expand').hide()
      $('.collapsibles-widget .toggle-expand-collapse.collapse').show()
    });
    // keys 🎹
    $(".collapsibles-widget .toggle-expand-collapse.expand").keydown(function (e) {
      if (e.keyCode === 32 || e.keyCode === 13) {
        $(".accordion").addClass('active');
        $(".accordion .content").css('display', 'block');
        $('.collapsibles-widget .toggle-expand-collapse.expand').hide();
        $('.collapsibles-widget .toggle-expand-collapse.collapse').show().focus();
      }
    })
  }

  function collapseAll() {
    $(".collapsibles-widget .toggle-expand-collapse.collapse").click(function () {
      $(".accordion").removeClass('active');
      $(".accordion .content").css('display', 'none');
      $('.collapsibles-widget .toggle-expand-collapse.expand').show();
      $('.collapsibles-widget .toggle-expand-collapse.collapse').hide();
    })
    // keys 🎹
    $(".collapsibles-widget .toggle-expand-collapse.collapse").keydown(function (e) {
      if (e.keyCode === 32 || e.keyCode === 13) {
        $(".accordion").removeClass('active');
        $(".accordion .content").css('display', 'none');
        $('.collapsibles-widget .toggle-expand-collapse.collapse').hide();
        $('.collapsibles-widget .toggle-expand-collapse.expand').show().focus();
      }
    })
  }
  $('.collapsibles-widget .toggle-expand-collapse.collapse').hide();
  expandAll();
  collapseAll();
});