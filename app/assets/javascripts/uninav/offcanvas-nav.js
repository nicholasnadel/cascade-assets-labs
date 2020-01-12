$(document).ready( function() {
  // var $rootUmbrellaNav      = $('#uninav .root-umbrella-nav'),
  // $rootMainNav              = $('#uninav .root-main-nav'),

  // $umbrellaDrillDownMenus   = $('#uninav .root-umbrella-nav .drilldown-menu'),
  // $mainDrillDownMenus       = $('#uninav .root-main-nav .drilldown-menu'),
  // menuVisibleXVal           = 0;

  // (function moveOffCanvasToCurrentPathItem() {
  //   var currentPath = $('#uninav .off-canvas-nav li.current');

  //   if (currentPath.length) {
  //     if (currentPath.parents('#off-canvas-umbrella').length === 1) {
  //       var currentUmbrellaPathDrillDownLists = currentPath.parents('ul.drilldown-menu');

  //       currentUmbrellaPathDrillDownLists.show();
        
  //       $rootUmbrellaNav.css({ transform: "translateX(-" + ( menuWidth * currentUmbrellaPathDrillDownLists.length ) + "px)"});
  //       return;
  //     }
      
  //     if ($rootUmbrellaDiv.length) {
  //       $rootUmbrellaDiv.css({ transform: "translateX(-" + menuWidth + "px)" });
  //       $rootUmbrellaDiv.hide();
  //     }

  //     $rootMainDiv.show();
  //     $rootMainDiv.css({ transform: "translateX(-" + menuVisibleXVal + "px" });
  //     var currentMainPathDrillDownLists = currentPath.parents('ul.drilldown-menu');
  //     currentMainPathDrillDownLists.show();
  //     $rootMainNav.css({ transform: "translateX(-" + (menuWidth * currentMainPathDrillDownLists.length) + "px" });

  //   }
  // })()
  
  var $offCanvasNavContainer    = $('#uninav .off-canvas-nav-container'),
  menuVisibleXVal           = 0,
  menuWidth                 = 410,
  $rootUmbrellaDiv          = $('#uninav #off-canvas-umbrella'),
  $rootMainDiv              = $('#uninav #off-canvas-main'),
  drillDownSelectorsOffCanvasUmbrella = {
    rootDrillDownNav: '#off-canvas-umbrella-navigation .root-umbrella-nav',
    scrollToTop: '#off-canvas-umbrella-navigation'
  },
  drillDownSelectorsOffCanvasMain = {
    rootDrillDownNav: '#off-canvas-main-navigation .root-main-nav',
    scrollToTop: '#off-canvas-main-navigation'
  }
  var offCanvasMainDrillDown = new DrillDownMenu(drillDownSelectorsOffCanvasMain);
  var offCanvasUmbrellaDrillDown = new DrillDownMenu(drillDownSelectorsOffCanvasUmbrella);
  offCanvasMainDrillDown.createClickHandlers();
  offCanvasUmbrellaDrillDown.createClickHandlers();

  $('#uninav .uninav__umbrella-nav-button-container button').on('click', function() {
    // moveOffCanvasToCurrentPathItem();
    $offCanvasNavContainer.css({ transform: "translateX(" + menuVisibleXVal + "px)"});
  });

  //CLOSE OFF-CANVAS-NAV
  $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('click', function() {
    $offCanvasNavContainer.css({ transform: "translateX(-" +  menuWidth + "px)"});
  });

  $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('click', function() {
    $(this).parents('.off-canvas-menu').css({ transform: "translateX(-" +  menuWidth + "px)"});
    // $offCanvasNavContainer.css({ transform: "translateX(-" +  menuWidth + "px)"});
  });

  $rootUmbrellaDiv.find('.toggle-menu-label').on('click', function() {
    // $offCanvasNavContainer.css({ transform: "translateX(-" +  menuWidth + "px)"});

    changeContextualMenus($(this));
    // offCanvasUmbrellaDrillDown.hideDrillDownMenus();
  });

  $rootMainDiv.find('.toggle-menu-label').on('click', function() {
    // $offCanvasNavContainer.css({ transform: "translateX(-" +  menuWidth + "px)"});

    changeContextualMenus($(this));
    // offCanvasUmbrellaDrillDown.hideDrillDownMenus();
  });

  $rootUmbrellaDiv.find('.close.js-close-off-canvas-nav').on('click', function() {
    $offCanvasNavContainer.css({ transform: "translateX(-" +  menuWidth + "px)"});
  });

  $('#uninav .uninav__hamburger-menu .hamburger-menu-button').on('click', function() {
    // moveOffCanvasToCurrentPathItem();
    $offCanvasNavContainer.css({ transform: "translateX(" + menuVisibleXVal + "px)"});
  });

  // $('#uninav .off-canvas-nav .menu-header .menu-label').on('click', function() {
  //   moveOffCanvasToRoot($(this));
  //   hideDrillDownMenus
  // });

  // $('#uninav .off-canvas-nav .menu-header .toggle-menu-label').on('click', function() {
  //   changeContextualMenus($(this));
  // });

  // $('#uninav .off-canvas-nav li.menu-back').on('click', function(event) {
  //   drillMenuUp($(this));
  // });

  // $('#uninav .drill-down-parent').on('click', function(event) {
  //   drillMenuDown($(this));
  // });

  // $('#uninav .toggle-drilldown').on('click', function(event) {
  //   drillMenuDown($(this));
  // });


  // function drillMenuDown($element) {
  //   $element.siblings('.drilldown-menu').show();
  //   $offCanvasNavContainer.animate({ scrollTop: 0 }, 'slow');
  //   if ($element.parents('.root-umbrella-nav').length === 1) {
  //     var rootNavTranslateXVal = parseInt(getTranslateXVal($rootUmbrellaNav)) - menuWidth;

  //     $rootUmbrellaNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)"  });
  //     return
  //   }

  //   var rootNavTranslateXVal = parseInt(getTranslateXVal($rootMainNav)) - menuWidth;
    
  //   $rootMainNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)"  });
  //   $element.siblings('ul.drilldown-menu').scrollTop(0)
    
  //   return
  // }

  // function drillMenuUp($element) {
  //   $element.parent('.drilldown-menu').hide();

  //   if ($element.parents('.root-umbrella-nav').length === 1) {
  //     var rootNavTranslateXVal = parseInt(getTranslateXVal($rootUmbrellaNav)) + menuWidth;

  //     $rootUmbrellaNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)" });

  //     return;
  //   }

  //   var rootNavTranslateXVal = parseInt(getTranslateXVal($rootMainNav)) + menuWidth;
    
  //   $rootMainNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px)" });
    
  //   return;
  // }

  function changeContextualMenus($element) {
    var $otherContextualMenu = $element.parents('.off-canvas-menu').siblings('.off-canvas-menu'),
    $currentContextualMenu   = $element.parents('.off-canvas-menu');
    debugger
    $currentContextualMenu.removeClass('slide-in');
    $currentContextualMenu.addClass('slide-out');
    
    $otherContextualMenu.show();
    $otherContextualMenu.removeClass('slide-out');
    $otherContextualMenu.addClass('slide-in');
    
    setTimeout(function() {
      $currentContextualMenu.hide();
    }, 1000)
    // debugger
    // .
    // .css({ transform: "translateX(-" +  menuVisibleXVal + "px)"});

    // if ($element.parents('#off-canvas-umbrella').length === 1) {
      
    //   $rootMainDiv.show();

    //   $rootUmbrellaDiv.removeClass('slide-in');
    //   $rootUmbrellaDiv.addClass('slide-out');

    //   $rootMainDiv.removeClass('slide-out');
    //   $rootMainDiv.addClass('slide-in');
    //   setTimeout(function() {
    //     $rootUmbrellaDiv.hide();
    //   }, 1000);

    //   return;
    // }

    // $rootUmbrellaDiv.show();

    // $rootMainDiv.addClass('slide-out');
    // $rootMainDiv.removeClass('slide-in');

    // $rootUmbrellaDiv.removeClass('slide-out');
    // $rootUmbrellaDiv.addClass('slide-in');
    // setTimeout(function() {
    //   $rootMainDiv.hide();
    // }, 1000);

    return;
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

  // function getTranslateXVal(selector) {
  //   var transformMatrix = selector.css("-webkit-transform") ||
  //                         selector.css("-moz-transform")    ||
  //                         selector.css("-ms-transform")     ||
  //                         selector.css("-o-transform")      ||
  //                         selector.css("transform");
  //   var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
  //   var x = matrix[12] || matrix[4];//translate x
  //   return x;
  // }
});