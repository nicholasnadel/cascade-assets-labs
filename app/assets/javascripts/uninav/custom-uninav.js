$(document).ready( function() {
  var $rootUmbrellaNav      = $('#uninav .root-umbrella-nav'),
  $rootMainNav              = $('#uninav .root-main-nav'),
  $rootUmbrellaDiv          = $('#uninav #off-canvas-umbrella'),
  $rootMainDiv              = $('#uninav #off-canvas-main'),
  $umbrellaDrillDownMenus   = $('#uninav .root-umbrella-nav .drilldown-menu'),
  $mainDrillDownMenus       = $('#uninav .root-main-nav .drilldown-menu'),
  $offCanvasNavContainer    = $('#uninav .off-canvas-nav-container'),
  menuWidth                 = 410,
  menuVisibleXVal           = 0;


  $('#uninav .off-canvas-nav .menu-header .menu-label').on('click', function() {
    debugger
    moveOffCanvasToRoot($(this));
  });

  $('#uninav .off-canvas-nav .menu-header .toggle-menu-label').on('click', function() {
    debugger
    changeContextualMenus($(this));
  });

  $('#uninav .off-canvas-nav li').on('click', function(event) {
    debugger
    if($(this).hasClass('menu-back')) {
      drillMenuUp($(this));
      event.stopPropagation();
      return;
    }
      
    if($(this).children('ul.drilldown-menu').length === 1) {
      drillMenuDown($(this).children('.toggle'));
      event.stopPropagation();
      return;
    }
  })

  function drillMenuDown($element) {
    $element.siblings('.drilldown-menu').show();
    // debugger
    $offCanvasNavContainer .animate({ scrollTop: 0}, 'slow');
    // debugger
    if ($element.parents('.root-umbrella-nav').length === 1) {
      var rootNavTranslateXVal = parseInt(getTranslateXVal($rootUmbrellaNav)) - menuWidth;

      $rootUmbrellaNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)"  });
      return
    }

    var rootNavTranslateXVal = parseInt(getTranslateXVal($rootMainNav)) - menuWidth;
    
    $rootMainNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)"  });
    $element.siblings('ul.drilldown-menu').scrollTop(0)
    
    return
  }

  function drillMenuUp($element) {
    $element.parent('.drilldown-menu').hide();

    if ($element.parents('.root-umbrella-nav').length === 1) {
      var rootNavTranslateXVal = parseInt(getTranslateXVal($rootUmbrellaNav)) + menuWidth;

      $rootUmbrellaNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)" });

      return;
    }

    var rootNavTranslateXVal = parseInt(getTranslateXVal($rootMainNav)) + menuWidth;
    
    $rootMainNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)" });
    
    return;
  }

  function changeContextualMenus($element) {

    if ($element.parents('#off-canvas-umbrella').length === 1) {
      
      $rootMainDiv.show();

      $rootUmbrellaDiv.removeClass('slide-in');
      $rootUmbrellaDiv.addClass('slide-out');

      $rootMainDiv.removeClass('slide-out');
      $rootMainDiv.addClass('slide-in');
      setTimeout(function() {
        $rootUmbrellaDiv.hide();
      }, 1000);

      return;
    }

    $rootUmbrellaDiv.show();

    $rootMainDiv.addClass('slide-out');
    $rootMainDiv.removeClass('slide-in');

    $rootUmbrellaDiv.removeClass('slide-out');
    $rootUmbrellaDiv.addClass('slide-in');
    setTimeout(function() {
      $rootMainDiv.hide();
    }, 1000);

    return;
  }

  function moveOffCanvasMenuToCurrent(element) {

  }

  function moveOffCanvasToRoot(element) {

    if (element.parents('#off-canvas-umbrella').length === 1) {
      $rootUmbrellaNav.css({ transform: "translateX(-" + menuVisibleXVal + "px" });
      $umbrellaDrillDownMenus.hide();

      return;
    }
    $rootMainNav.css({ transform: "translateX(-" + menuVisibleXVal + "px"  });
    $mainDrillDownMenus.hide();

    return;
  }

  function getTranslateXVal(selector) {
    var transformMatrix = selector.css("-webkit-transform") ||
                          selector.css("-moz-transform")    ||
                          selector.css("-ms-transform")     ||
                          selector.css("-o-transform")      ||
                          selector.css("transform");
    var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
    var x = matrix[12] || matrix[4];//translate x
    return x;
  }
});