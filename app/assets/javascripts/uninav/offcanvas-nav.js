$(document).ready( function() {
  
  var $offCanvasNavContainer  = $('#uninav .off-canvas-nav-container'),
  menuVisibleXVal             = 0,
  menuWidth                   = 410,
  $rootUmbrellaDiv            = $('#uninav #off-canvas-umbrella'),
  $rootMainDiv                = $('#uninav #off-canvas-main'),
  $rootDrillDownNavUmbrella   = $('#off-canvas-umbrella-navigation .root-umbrella-nav'),
  $rootDrillDownNavMain       = $('#off-canvas-main-navigation .root-main-nav'),
  $rootElement                = $('.off-canvas-nav-container')
  translateXVal               = menuWidth;
  headerHeight                = $('#uninav .cu-off-canvas-header').height() + $('#uninav .menu-header').height();


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

    if (!$rootDrillDownNavMain.initialHeight)
      $rootDrillDownNavMain.initialHeight = $('.root-main-nav').height();

    if (!$rootDrillDownNavUmbrella.initialHeight)
      $rootDrillDownNavUmbrella.initialHeight = $('.root-umbrella-nav').height();

    debugger
    if ($otherContextualMenu.find('.root-umbrella-nav').length) {
      if ( $rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
      } else {
        $rootElement.css({ overflowY: 'hidden' });
      }
    } else {
      if ($rootDrillDownNavMain.initialHeight + headerHeight >= $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
      } else {
        $rootElement.css({ overflowY: 'hidden' });
      }
    }
    
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

    if (umbrellaDrillDown) {
      ulCurrentPos  = getTranslateXVal($rootDrillDownNavUmbrella),
      translateXVal = ulCurrentPos - menuWidth;

      $menuToDrillDownTo.show();
      $rootDrillDownNavUmbrella.css({ transform: "translateX(" + translateXVal + "px)" });
      $rootElement.animate({ scrollTop: 0 }, 'slow');
      $rootDrillDownNavUmbrella.css({ height: $menuToDrillDownTo.height() });
      debugger
      if ($menuToDrillDownTo.height() + headerHeight > $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
        return
      }

      $rootElement.css({ overflowY: 'hidden' })
      return;
    }
    
    $menuToDrillDownTo.show();
    $rootDrillDownNavMain.css({ transform: "translateX(" + translateXVal + "px)" });
    $rootElement.animate({ scrollTop: 0 }, 'slow');
    if ($menuToDrillDownTo.height() > $(window).height()) {
      $rootElement.css({ overflowY: 'scroll' });
      return
    }

    $rootElement.css({ overflowY: 'scroll' })
    return;
  }
  
  function drillMenuUp() {
    var umbrellaDrillDown       = $(this).parents('#off-canvas-umbrella').length,
    ulCurrentPos                = getTranslateXVal($rootDrillDownNavMain),
    translateXVal               = ulCurrentPos + menuWidth,
    parentDrillDownMenuHeight   = $(this).closest('.drill-down-list-item').closest('.drilldown-menu').height();
    debugger
    if (umbrellaDrillDown) {
      ulCurrentPos  = getTranslateXVal($rootDrillDownNavUmbrella),
      translateXVal = ulCurrentPos + menuWidth;
      debugger
      $rootDrillDownNavUmbrella.css({ transform: "translateX(" + translateXVal + "px)"  });
      $(this).parent().hide();

      if (translateXVal == 0) {
        $rootDrillDownNavUmbrella.css({ height: $rootDrillDownNavUmbrella.initialHeight });

        if ($rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
          $rootElement.css({ overflowY: 'scroll' });
        } else {
          $rootElement.css({ overflowY: 'hidden' });
        }
        
        return;
      };

      $rootDrillDownNavUmbrella.css({ height: parentDrillDownMenuHeight });

      if ( parentDrillDownMenuHeight + headerHeight >= $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
      } else {
        $rootElement.css({ overflowY: 'hidden' });
      }

      return;
    }

    $rootDrillDownNavMain.css({ transform: "translateX(" + translateXVal + "px)"  });
    $(this).parent().hide();

    if (translateXVal == 0) {
      $rootDrillDownNavMain.css({ height: $rootDrillDownNavMain.initialHeight });
      
      return;
    };

    if ($rootDrillDownNavMain.initialHeight + headerHeight >= $(window).height())
      $rootElement.css({ overflowY: 'scroll' });

    $rootDrillDownNavMain.css({ height: parentDrillDownMenuHeight });
  
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
  
  function moveToCurrentSetHeight() {
    var currentPath = $rootElement.find('li.current'),
    umbrellaNav     = $rootDrillDownNavUmbrella.length;

    if (currentPath.length) {
      var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
      umbrellaDrillDown     = currentPath.parents('#off-canvas-umbrella').length;
      
      $drillDownParents.show();
      $rootDrillDownNavUmbrella.initialHeight  = $('.root-umbrella-nav').height();

      if (umbrellaDrillDown) {
        $rootUmbrellaDiv.show();
        $rootMainDiv.hide();
        $rootUmbrellaDiv.css({ transform: "translateX(-" + (menuWidth * $drillDownParents.length) + "px" });
        $rootMainDiv.css({ transform: "translateX(-" + menuWidth + "px" });

        if ( $rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
          $rootElement.css({ overflowY: 'scroll' });
        } else {
          $rootElement.css({ overflowY: 'hidden' });
        }
      
        return;
      }

      $rootMainDiv.show();
      $rootUmbrellaDiv.hide();
      $rootDrillDownNavMain.initialHeight = $('.root-umbrella-nav').height();
      $rootMainDiv.css({ transform: "translateX(-" + ((menuWidth * 2) * $drillDownParents.length) + "px" });
      $rootMainDiv.css({ transform: "translateX(-" + menuWidth + "px" });

      if ( $rootDrillDownNavMain.initialHeight + headerHeight >= $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });

      } else {
        $rootElement.css({ overflowY: 'hidden' });
      }
      return;
    }

    if (umbrellaNav) {
      $rootDrillDownNavUmbrella.initialHeight = $('.root-umbrella-nav').height();

      if ($rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
      } else {
        $rootElement.css({ overflowY: 'hidden' });
      }
      return;
    }
    
    $rootDrillDownNavMain.initialHeight  = $('.root-main-nav').height();

    if ($rootDrillDownNavMain.initialHeight + headerHeight >= $(window).height()) {
      $rootElement.css({ overflowY: 'scroll' });
    } else {
      $rootElement.css({ overflowY: 'hidden' });
    }

    return;
  }

  moveToCurrentSetHeight();
});
