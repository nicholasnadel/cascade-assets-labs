
$(document).ready(function() {

  var drillDownSelectorsLeftNav = {
    rootDrillDownNav: '#left-column-navigation .root-left-nav',
    scrollToTop: '#left-column-navigation'
  }

  var $rootDrillDownMenu  = $(drillDownSelectorsLeftNav.rootDrillDownNav);
  var $scrollToTopElement = $(drillDownSelectorsLeftNav.scrollToTop)

  $rootDrillDownMenu.on('click', '.drill-down-parent', function(event) {
    drillMenuDown($(this));
  });

  $rootDrillDownMenu.on('click', '.toggle-drilldown', function(event) {
    drillMenuDown($(this));
  });

  $rootDrillDownMenu.on('click', '.menu-back', function() {
    drillMenuUp($(this));
  });

  moveOffCanvasToCurrentPathItem();
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
    
    $menuToDrillDownTo.show();
    $rootDrillDownMenu.css({ transform: "translateX(" + translateXVal + "px)"  });
    $scrollToTopElement.length && $scrollToTopElement.animate({ scrollTop: 0 }, 'slow');
    
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
    var currentPath = $rootDrillDownMenu.find('li .current');

    if (currentPath.length) {
      var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
      widthAmount                       = $rootDrillDownMenu.width();
      $drillDownParents.show();
      $rootDrillDownMenu.show();
      $rootDrillDownMenu.css({ transform: "translateX(-" + (widthAmount * $drillDownParents.length) + "px" });

    }
  }
})