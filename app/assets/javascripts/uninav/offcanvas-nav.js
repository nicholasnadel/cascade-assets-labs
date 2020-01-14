$(document).ready( function() {
  
  var $offCanvasNavContainer  = $('#uninav .off-canvas-nav-container'),
  menuVisibleXVal             = 0,
  menuWidth                   = 410,
  $rootUmbrellaDiv            = $('#uninav #off-canvas-umbrella'),
  $rootMainDiv                = $('#uninav #off-canvas-main'),
  $rootDrillDownNavUmbrella   = $('#off-canvas-umbrella-navigation .root-umbrella-nav'),
  $rootElementUmbrella        = $('.off-canvas-nav-container'),
  $rootDrillDownNavMain       = $('#off-canvas-main-navigation .root-main-nav'),
  $rootElementMain            = $('.off-canvas-nav-container')
  translateXVal               = menuWidth;


  // drillDownSelectorsOffCanvasUmbrella = {
  //   rootDrillDownNav: '#off-canvas-umbrella-navigation .root-umbrella-nav',
  //   rootElement: '.off-canvas-nav-container',
  //   translateXVal: menuWidth
  // },
  // drillDownSelectorsOffCanvasMain = {
  //   rootDrillDownNav: '#off-canvas-main-navigation .root-main-nav',
  //   rootElement: '.off-canvas-nav-container',
  //   translateXVal: menuWidth
  // },
  // offCanvasMainDrillDown = new DrillDownMenu(drillDownSelectorsOffCanvasMain),
  // offCanvasUmbrellaDrillDown = new DrillDownMenu(drillDownSelectorsOffCanvasUmbrella);

  // offCanvasMainDrillDown.createClickHandlers();
  // offCanvasUmbrellaDrillDown.createClickHandlers();

  $('#uninav .uninav__umbrella-nav-button-container button').on('click', function() {
    $offCanvasNavContainer.css({ transform: "translateX(" + menuVisibleXVal + "px)"});
  });

  //CLOSE OFF-CANVAS-NAV
  $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('click', function() {
    $offCanvasNavContainer.css({ transform: "translateX(-" +  menuWidth + "px)"});
  });

  $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('click', function() {
    $(this).parents('.off-canvas-menu').css({ transform: "translateX(-" +  menuWidth + "px)"});
  });

  $rootUmbrellaDiv.find('.toggle-menu-label').on('click', function() {
    changeContextualMenus($(this));
  });

  $rootMainDiv.find('.toggle-menu-label').on('click', function() {
    changeContextualMenus($(this));
  });

  $rootUmbrellaDiv.find('.close.js-close-off-canvas-nav').on('click', function() {
    $offCanvasNavContainer.css({ transform: "translateX(-" +  menuWidth + "px)"});
  });

  $('#uninav .uninav__hamburger-menu .hamburger-menu-button').on('click', function() {
    $offCanvasNavContainer.css({ transform: "translateX(" + menuVisibleXVal + "px)"});
  });

  $rootMainDiv.find('.menu-header .menu-label').on('click', function() {
    moveOffCanvasToRoot($(this));
  });

  $rootUmbrellaDiv.find('.menu-header .menu-label').on('click', function() {
    moveOffCanvasToRoot($(this));
  });

  $rootDrillDownNavUmbrella.on('click', '.drill-down-parent', drillMenuDown);
    
  $rootDrillDownNavMain.on('click', '..drill-down-parent', drillMenuDown);

  $rootDrillDownNavUmbrella.on('click', '.menu-back', drillMenuUp);

  $rootDrillDownNavMain.on('click', '.menu-back', drillMenuUp);

  function changeContextualMenus($element) {
    var $otherContextualMenu = $element.parents('.off-canvas-menu').siblings('.off-canvas-menu'),
    $currentContextualMenu   = $element.parents('.off-canvas-menu');
    $currentContextualMenu.removeClass('slide-in');
    $currentContextualMenu.addClass('slide-out');
    
    $otherContextualMenu.show();
    $otherContextualMenu.removeClass('slide-out');
    $otherContextualMenu.addClass('slide-in');
    
    setTimeout(function() {
      $currentContextualMenu.hide();
    }, 500)

    return;
  }

  function moveOffCanvasToRoot(element) {

    if (element.parents('#off-canvas-umbrella').length === 1) {
      $rootUmbrellaDiv.find('.root-umbrella-nav').css({ transform: "translateX(-" + menuVisibleXVal + "px" });
      $rootUmbrellaDiv.find('.drilldown-menu').hide();

      return;
    }
    $rootMainDiv.find('.root-main-nav').css({ transform: "translateX(-" + menuVisibleXVal + "px"  });
    $rootMainDiv.find('.drilldown-menu').hide();

    return;
  }

  function drillMenuDown() {
    var $menuToDrillDownTo  = $(this).siblings('.drilldown-menu'),
    ulCurrentPos            = getTranslateXVal($rootDrillDownNavMain),
    umbrellaDrillDown       = $(this).parents('#off-canvas-umbrella').length,
    translateXVal           = ulCurrentPos - menuWidth;
    // debugger
    if (umbrellaDrillDown) {
      ulCurrentPos  = getTranslateXVal($rootDrillDownNavUmbrella),
      translateXVal = ulCurrentPos - menuWidth;

      $menuToDrillDownTo.show();
      $rootDrillDownNavUmbrella.css({ transform: "translateX(" + translateXVal + "px)" });
      $rootElementUmbrella.animate({ scrollTop: 0 }, 'slow');
      return
    }
    
    $menuToDrillDownTo.show();
    $rootDrillDownNavMain.css({ transform: "translateX(" + translateXVal + "px)" });
    $rootElementMain.animate({ scrollTop: 0 }, 'slow');
    return;
  }
  
  function drillMenuUp() {
    var umbrellaDrillDown = $(this).parents('#off-canvas-umbrella').length,
    ulCurrentPos  = getTranslateXVal($rootDrillDownNavMain),
    translateXVal     = ulCurrentPos + menuWidth;

    if (umbrellaDrillDown) {
      ulCurrentPos  = getTranslateXVal($rootDrillDownNavUmbrella),
      translateXVal = ulCurrentPos + menuWidth;

      $rootDrillDownNavUmbrella.css({ transform: "translateX(" + translateXVal + "px)"  });
      $(this).parent().hide();
      return;
    }
  
    $rootDrillDownNavMain.css({ transform: "translateX(" + translateXVal + "px)"  });
    $(this).parent().hide();
  
    return;
  }
  
  function getTranslateXVal(selector) {
    var transformMatrix = selector.css("-webkit-transform") ||
                          selector.css("-moz-transform")    ||
                          selector.css("-ms-transform")     ||
                          selector.css("-o-transform")      ||
                          selector.css("transform");
    
    transformMatrix = transformMatrix === "none" ? 0 : transformMatrix;
    if (!isNaN(transformMatrix))
      return 0;
    
    var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
    var x = matrix[12] || matrix[4];//translate x
  
    return parseInt(x);
  }
  
  function moveOffCanvasToCurrentPathItem() {
    var currentPath = $offCanvasNavContainer.find('li .current');
  
    if (currentPath.length) {
      
      var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
      umbrellaDrillDown     = currentPath.parents('#off-canvas-umbrella').length;
      $drillDownParents.show();
  
      if (umbrellaDrillDown) {
        $rootUmbrellaDiv.show();
        $rootMainDiv.hide();
        $rootUmbrellaDiv.css({ transform: "translateX(-" + (menuWidth * $drillDownParents.length) + "px" });
        $rootMainDiv.css({ transform: "translateX(-" + menuWidth + "px" });
      }
      $rootMainDiv.show();
      $rootUmbrellaDiv.hide();
      $rootMainDiv.css({ transform: "translateX(-" + ((menuWidth * 2) * $drillDownParents.length) + "px" });
      $rootMainDiv.css({ transform: "translateX(-" + menuWidth + "px" });
    }
  }

  moveOffCanvasToCurrentPathItem();
});



///////////////////////////////////////



