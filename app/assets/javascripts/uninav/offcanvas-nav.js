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
});



///////////////////////////////////////


$rootDrillDownNavUmbrella.on('click', '.drill-down-parent', drillMenuDown);
  
$rootDrillDownNavMain.on('click', '.toggle-drilldown', drillMenuDown);

$rootDrillDownNavUmbrella.on('click', '.menu-back', drillMenuDown);

$rootDrillDownNavMain.on('click', '.menu-back', drillMenuDown);
