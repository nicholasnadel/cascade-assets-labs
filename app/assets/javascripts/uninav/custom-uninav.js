$(document).ready( function() {
  var $rootUmbrellaNav      = $('#uninav .root-umbrella-nav'),
  $rootMainNav              = $('#uninav .root-main-nav'),
  $rootUmbrellaDiv          = $('#uninav #off-canvas-umbrella'),
  $rooMainDiv               = $('#uninav #off-canvas-main'),
  $umbrellaDrillDownMenus   = $('#uninav .root-umbrella-nav .drilldown-menu'),
  $mainDrillDownMenus       = $('#uninav .root-main-nav .drilldown-menu'),
  menuWidth                 = 410,
  menuVisibleXVal           = 0;


  $('#uninav .off-canvas-nav .toggle').on('click', function() {
    drillMenuDown($(this))
  });

  $('#uninav .off-canvas-nav .drilldown-menu .menu-back').on('click', function() {
    drillMenuUp($(this))
  });

  $('#uninav .off-canvas-nav .menu-header .menu-label').on('click', function() {
    moveOffCanvasToRoot($(this));
  });

  $('#uninav .off-canvas-nav .menu-header .toggle-menu-label').on('click', function() {
    changeContextualMenus($(this))
  });

  function drillMenuDown($element) {
    $element.siblings('.drilldown-menu').show();
    // debugger
    if ($element.parents('.root-umbrella-nav').length === 1) {
      var rootNavTranslateXVal = parseInt(getTranslateXVal($rootUmbrellaNav)) - menuWidth;

      $rootUmbrellaNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)"  });
      return
    }

    var rootNavTranslateXVal = parseInt(getTranslateXVal($rootMainNav)) - menuWidth;
    
    $rootMainNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)"  });
    
    return
  }

  function drillMenuUp($element) {

    if ($element.parents('.root-umbrella-nav').length === 1) {
      var rootNavTranslateXVal = parseInt(getTranslateXVal($rootUmbrellaNav)) + menuWidth;

      $rootUmbrellaNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)" });
      return
    }

    var rootNavTranslateXVal = parseInt(getTranslateXVal($rootMainNav)) + menuWidth;
    
    $rootMainNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)" });
    
    return
  }

  function changeContextualMenus(element) {
    // debugger
    if (element.parents('#off-canvas-umbrella').length === 1) {
      $rootUmbrellaDiv .css({ transform: "translateX(-" + menuWidth + "px)" });
      $rooMainDiv.css({ transform: "translateX(" + menuVisibleXVal + "px)"});
      return
    }

    $rootUmbrellaDiv.css({ transform: "translateX(-" + menuVisibleXVal + "px)" });
    $rooMainDiv.css({ transform: "translateX(" + menuWidth + "px)" });
    return
  }

  function moveOffCanvasMenuToCurrent(element) {

  }

  function moveOffCanvasToRoot(element) {
    debugger

    if (element.parents('#off-canvas-umbrella').length === 1) {
      $rootUmbrellaNav.css({ transform: "translateX(-" + menuVisibleXVal + "px" });
      $umbrellaDrillDownMenus.hide();

      return;
    }
    $rootMainNav.css({ transform: "translateX(-" + menuVisibleXVal + "px"  });
    $mainDrillDownMenus.hide();

    return;
  }

  // $('#uninav .off-canvas-nav .menu-back').on('click', function() {
  //   // debugger
  //   var $backButton = $(this);

  //   setTimeout(function() {
  //     $backButton.parent().hide();
  //   }, 1000);
    
  //   var rootNavTranslateXVal = parseInt(getTranslateXVal($rootNav)) + 410;
    
  //   $rootNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px"  });
  // })



  // $('#uninav #off-canvas-main .menu-header .toggle-menu-label').on('click', function() {
  //   $('#uninav #off-canvas-main').css({ transform: "translateX(-410px)"});
  //   $('#uninav #off-canvas-umbrella').css({ transform: "translateX(0)"});
  // });

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