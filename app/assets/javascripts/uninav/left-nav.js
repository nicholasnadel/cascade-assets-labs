$(document).ready(function () {
  var $rootDrillDownNav = $('#left-column-navigation .root-left-nav'),
    $rootElement = $('#left-column-navigation'),
    resizeTimer = null;
  if (!$rootElement.length || !$rootElement) return;
  function drillMenuDown() {
    var $menuToDrillDownTo = $(this).siblings('.drilldown-menu'),
      widthAmount = $rootDrillDownNav.width(),
      ulCurrentPos = getTranslateXVal($rootDrillDownNav),
      translateXVal = ulCurrentPos - widthAmount;
    $menuToDrillDownTo.show();
    $rootDrillDownNav.addClass('fade-in');
    $rootDrillDownNav.css({ transform: "translateX(" + translateXVal + "px)" });

    // buttery smooth + performant: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
    $('.root-left-nav').mouseover(function () {
      $(this).css('will-change', 'transform')
    });
    $('.root-left-nav').focusin(function () {
      $(this).css('will-change', 'transform')
    });
    $('.root-left-nav').mouseout(function () {
      $(this).css('will-change', 'auto')
    });
    $('.root-left-nav').blur(function () {
      $(this).css('will-change', 'transform')
    });

    $rootElement.css({ height: $menuToDrillDownTo.height() });
    // if ($menuToDrillDownTo.height() >= $(window).height()) {
    //   $rootElement.css({ overflowY: 'scroll' });
    // } else {
    //   $rootElement.css({ overflowY: 'hidden' });
    // }
    // $rootElement.animate({ scrollTop: 0 }, 'slow');
    return;
  }
  function drillMenuUp() {
    var widthAmount = $rootDrillDownNav.width(),
      ulCurrentPos = getTranslateXVal($rootDrillDownNav),
      translateXVal = ulCurrentPos + widthAmount,
      $parentDrillDownMenu = $(this).closest('.drill-down-list-item').closest('.drilldown-menu');
    $rootDrillDownNav.css({ transform: "translateX(" + translateXVal + "px)" });
    $(this).parent().hide();
    if (translateXVal >= 0) {
      $rootElement.css({ height: ($rootDrillDownNav.initialHeight) });
      return;
    }
    $rootElement.css({ height: ($parentDrillDownMenu.height()) });
    // if ($menuToDrillDownTo.height() >= $(window).height()) {
    //   $rootElement.css({ overflowY: 'scroll' });
    // } else {
    //   $rootElement.css({ overflowY: 'hidden' });
    // }
    return;
  }
  function getTranslateXVal(selector) {
    var transformMatrix = selector.css("-webkit-transform") ||
      selector.css("-moz-transform") ||
      selector.css("-ms-transform") ||
      selector.css("-o-transform") ||
      selector.css("transform");
    transformMatrix = transformMatrix === "none" ? 0 : transformMatrix;
    if (!isNaN(transformMatrix))
      return 0;
    var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
    var x = matrix[12] || matrix[4];//translate x
    return parseInt(x);
  }
  function moveOffCanvasToCurrentPathItem() {
    var currentPath = $rootDrillDownNav.find('li.current'),
      $currentPathDrillDownMenu = currentPath.parent('.drilldown-menu');
    $rootElement.show();
    if (currentPath.length) {
      var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
        widthAmount = $rootDrillDownNav.width();
      $drillDownParents.show();
      $rootDrillDownNav.css({ transform: "translateX(-" + (widthAmount * $drillDownParents.length) + "px" });
      $rootElement.css({ height: $currentPathDrillDownMenu.height() });
      $rootDrillDownNav.css({ transition: 'all .5s' });
      $rootDrillDownNav.initialHeight = $rootDrillDownNav.height();
      return;
    }
    $rootElement.css({ height: $rootDrillDownNav.initialHeight });
    $rootDrillDownNav.initialHeight = $rootDrillDownNav.height();
    return;
  }
  function resizeRootDrillDown() {
    var widthAmount = $rootDrillDownNav[0].getBoundingClientRect().width,
      ulCurrentPos = getTranslateXVal($rootDrillDownNav),
      $drillDownMenus = $rootDrillDownNav.find('.drilldown-menu'),
      $drillDownMenuVisible = $rootDrillDownNav.find('.drilldown-menu[style*="display: block"]')
    $drillDownMenus.css({ left: widthAmount + "px" });
    $rootDrillDownNav.css({ transform: "translateX(-" + (!ulCurrentPos ? ulCurrentPos : widthAmount * $drillDownMenuVisible.length) + "px" });
  }
  // function disableScroll() {
  //   $rootElement.scrollTop(0);
  //   // console.log(this.pageYOffset);
  //   // console.log(this.scrollTop);
  // }
  $rootDrillDownNav.on('click', '.drill-down-parent', drillMenuDown);
  $rootDrillDownNav.on('click', '.toggle-drilldown', drillMenuDown);
  $rootDrillDownNav.on('click', '.menu-back', drillMenuUp);
  // $rootElement.on('scroll', disableScroll);
  var checkResizeRootDrillDown = function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeRootDrillDown, 500);
  };
  $(window).resize(checkResizeRootDrillDown);
  moveOffCanvasToCurrentPathItem();
});
