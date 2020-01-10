
$(document).ready(function() {
  /**
 * A number, or a string containing a number.
 * @typedef {(Object)} jQueryObject
 */
  debugger
  var $rootLeftNav      = $('#left-column-navigation .root-left-nav'),

  
  $rootMainNav              = $('#left-column-navigation .root-main-nav'),
  $rootUmbrellaDiv          = $('#left-column-navigation #off-canvas-umbrella'),
  $rootMainDiv              = $('#left-column-navigation #off-canvas-main'),
  $umbrellaDrillDownMenus   = $('#left-column-navigation .root-umbrella-nav .drilldown-menu'),
  $mainDrillDownMenus       = $('#left-column-navigation .root-main-nav .drilldown-menu'),
  $offCanvasNavContainer    = $('#left-column-navigation .off-canvas-nav-container'),
  menuWidth                 = 410,
  menuVisibleXVal           = 0;

  var drillDownSelectorsLeftNav = {
    rootDrillDownNav: '#left-column-navigation .root-left-nav',
  }
  debugger
  var $rootDrillDownMenu = $(drillDownSelectorsLeftNav.rootDrillDownNav);
  debugger
  $rootDrillDownMenu.on('click', '.drill-down-parent', function(event) {
    drillMenuDown($(this));
  });

  $rootDrillDownMenu.on('click', '.toggle-drilldown', function(event) {
    drillMenuDown($(this));
  });

  $rootDrillDownMenu.on('click', '.menu-back', function() {
    drillMenuUp($(this));
  });

  /**@function
   * @name drillMenuDown
   * @description translates the rootUl class provided aross the x-axis
   * @param {jQueryObject} $element - the this context of the clicked element
   * @param {onject} selectors - object of selectors and width for translation
   */
  function drillMenuDown($element) {
    var $menuToDrillDownTo  = $element.siblings('.drilldown-menu'),
    widthAmount             = $rootDrillDownMenu.width(),
    ulCurrentPos            = getTranslateXVal($rootDrillDownMenu),
    translateXVal           = ulCurrentPos - widthAmount;
    debugger
    $menuToDrillDownTo.show();
    $rootDrillDownMenu.css({ transform: "translateX(" + translateXVal + "px)"  });
    
    return
  }

  function drillMenuUp($element, selectors) {
    var widthAmount = $rootDrillDownMenu.width(),
    ulCurrentPos    = getTranslateXVal($rootDrillDownMenu),
    translateXVal   = ulCurrentPos + widthAmount;

    $rootDrillDownMenu.css({ transform: "translateX(" + translateXVal + "px)"  });
    $element.parent().hide();

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
    var currentPath = $(selector.rootDrillDownNav).;

    if (currentPath.length) {
      if (currentPath.parents('#off-canvas-umbrella').length === 1) {
        var currentUmbrellaPathDrillDownLists = currentPath.parents('ul.drilldown-menu');

        currentUmbrellaPathDrillDownLists.show();
        
        $rootUmbrellaNav.css({ transform: "translateX(-" + ( menuWidth * currentUmbrellaPathDrillDownLists.length ) + "px)"});
        return;
      }
      
      if ($rootUmbrellaDiv.length) {
        $rootUmbrellaDiv.css({ transform: "translateX(-" + menuWidth + "px)" });
        $rootUmbrellaDiv.hide();
      }

      $rootMainDiv.show();
      $rootMainDiv.css({ transform: "translateX(-" + menuVisibleXVal + "px" });
      var currentMainPathDrillDownLists = currentPath.parents('ul.drilldown-menu');
      currentMainPathDrillDownLists.show();
      $rootMainNav.css({ transform: "translateX(-" + (menuWidth * currentMainPathDrillDownLists.length) + "px" });

    }
  }

  // function DrillDownMenu {
    
  // }
})
// $('#left-column-navigation')

// {
//   menuWidth: '45rem',
//   root
// }