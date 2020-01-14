$(document).ready(function() {
  // var drillDownSelectorsLeftNav = {
  //   rootDrillDownNav: '#left-column-navigation .root-left-nav',
  //   rootElement: '#left-column-navigation',
  // };

  // var leftNavDrillDown = new DrillDownMenu(drillDownSelectorsLeftNav);
  
  // leftNavDrillDown.createClickHandlers();


  /////////////////////////////
  var $rootDrillDownNav   = $('#left-column-navigation .root-left-nav'),
  $rootElement            = $('#left-column-navigation'),
  // rootDrillDownNav   = selectors.rootDrillDownNav;
  // rootElement        = selectors.rootElement;
  resizeTimer        = null;


  $rootElement.initialHeight = $rootDrillDownNav.css("height");
  /**
  * Run a callback on each item
  * @param  {Function} callback The callback function to run
  */
 function drillMenuDown() {
    var $menuToDrillDownTo  = $(this).siblings('.drilldown-menu'),
    widthAmount             = $rootDrillDownNav[0].getBoundingClientRect().width,
    ulCurrentPos            = getTranslateXVal($rootDrillDownNav),
    translateXVal           = Math.floor(((ulCurrentPos - widthAmount) * 100) / 100 )  + "px";

    $menuToDrillDownTo.show();
    $rootDrillDownNav.css({ transform: "translateX(" + translateXVal + ")"  });
    $rootElement.css({ height: $menuToDrillDownTo.height() });
    // $rootElement.animate({ scrollTop: 0 }, 'slow');
    
    return;
  }

  /**
  * Run a callback on each item
  * @param  {Function} callback The callback function to run
  */
 function drillMenuUp() {
    var widthAmount = $rootDrillDownNav[0].getBoundingClientRect().width,
    ulCurrentPos    = getTranslateXVal($rootDrillDownNav),
    translateXVal   = Math.floor(((ulCurrentPos + widthAmount) * 100) / 100 )  + "px"
    $rootDrillDownNav.css({ transform: "translateX(" + translateXVal + ")"  });
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
    var currentPath = $rootDrillDownNav.find('li .current');

    if (currentPath.length) {
      var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
      widthAmount           = Math.floor((($rootDrillDownNav[0].getBoundingClientRect().width) * 100) / 100 );

      $drillDownParents.show();
      $rootDrillDownNav.css({ transform: "translateX(-" + (widthAmount * $drillDownParents.length) + "px" });
    }
  }

  function resizeRootDrillDown() {
    var widthAmount       = $rootDrillDownNav[0].getBoundingClientRect().width,
    ulCurrentPos          = getTranslateXVal($rootDrillDownNav),
    $drillDownMenus       = $rootDrillDownNav.find('.drilldown-menu'),
    $drillDownMenuVisible = $rootDrillDownNav.find('.drilldown-menu[style*="display: block"]')
    $drillDownMenus.css({ left: widthAmount + "px" });
    $rootDrillDownNav.css({ transform: "translateX(-" + (!ulCurrentPos ? ulCurrentPos :  widthAmount * $drillDownMenuVisible.length) + "px"});
  }

  function disableScroll() {
    // debugger
    $rootElement.scrollTop(0);
    // console.log(this.pageYOffset);
    // console.log(this.scrollTop);
  }

  $rootDrillDownNav.on('click', '.drill-down-parent', drillMenuDown);
  
  $rootDrillDownNav.on('click', '.toggle-drilldown', drillMenuDown);

  $rootDrillDownNav.on('click', '.menu-back', drillMenuUp);

  $rootElement.on('scroll', disableScroll);

  var checkResizeRootDrillDown = function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeRootDrillDown, 500);
  };

  $(window).resize(checkResizeRootDrillDown);

  moveOffCanvasToCurrentPathItem();
});
