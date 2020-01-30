$(document).ready( function() {
  
  var $offCanvasNavContainer  = $('#uninav .off-canvas-nav-container'),
  menuVisibleXVal             = 0,
  menuWidth                   = 410,
  $rootUmbrellaDiv            = $('#off-canvas-umbrella'),
  $rootMainDiv                = $('#off-canvas-main'),
  $rootDrillDownNavUmbrella   = $('#off-canvas-umbrella-navigation .root-umbrella-nav'),
  $rootDrillDownNavMain       = $('#off-canvas-main-navigation .root-main-nav'),
  $rootElement                = $('.off-canvas-nav-container')
  translateXVal               = menuWidth,
  headerHeight                = $('#uninav .cu-off-canvas-header').height() + $('#uninav .menu-header').height(),
  $sectionMenuButton          = $('#uninav .uninav__umbrella-nav-button-container button'),
  $offCanvasOverlay           = $('.off-canvas-overlay#js-off-canvas-overlay');


  var MENUWIDTH   = 410,
  MENUVISIBLE     = 0;

  var offCanvasContainer = {
    $selectors: {
      main: $('#uninav .off-canvas-nav-container'),
      overlay: $('.off-canvas-overlay#js-off-canvas-overlay'),
      sectionMenuButton: $('#uninav .uninav__umbrella-nav-button-container button'),
      hamburgerButton: $('#uninav .uninav__hamburger-menu .hamburger-menu-button')
    },
    headerHeight: $('#uninav .cu-off-canvas-header').height() + $('#uninav .menu-header').height()
  },
  umbrella = {
    $selectors: {
      rootMenu: $('#off-canvas-umbrella'),
      menu: $('#off-canvas-umbrella-navigation .root-umbrella-nav'),
      menuToggle: $('#off-canvas-umbrella .toggle-menu-label')
    },
    menuHeight: null,
    initialHeight: $('#off-canvas-umbrella-navigation .root-umbrella-nav').height(), 
    onPage: $('#off-canvas-umbrella').length
  },
  main = {
    $selectors: {
      rootMenu: $('#off-canvas-main'),
      menu: $('#off-canvas-main-navigation .root-main-nav'),
      menuToggle: $('#off-canvas-main .toggle-menu-label'),
    },
    menuHeight: null,
    initialHeight: $('#off-canvas-main-navigation .root-main-nav').height()
  };

  bindOffCanvascontainerEventHandlers = function() {
    //If umbrella nav on page open offcanvas nav on section menu click, enter, or space
    offCanvasContainer.$selectors.sectionMenuButton
      .off('click keypress').on('click keypress', function(e) {
        e.stopPropagation();
        if (a11yClickSpaceEnter(e)) {
          openCloseOffCanvasNav();
          return;
        }
      });

    offCanvasContainer.$selectors.hamburgerButton
      .off('click keypress').on('click keypress', function(e) {
        if (a11yClickSpaceEnter(e)) {
          openCloseOffCanvasNav();
          return;
        }
      });

    //If umbrella nav is open close nav on click, enter, or space
    offCanvasContainer.$selectors.main
      .find('.close.js-close-off-canvas-nav')
        .off('click keypress').on('click keypress', function(e) {
          if (a11yClickSpaceEnter(e)) {
            openCloseOffCanvasNav();
            return;
          }
        });
    
    offCanvasContainer.$selectors.overlay
      .off('click').on('click', function(e) {
        openCloseOffCanvasNav();
      });
      
  };

  bindUmbrellaEventHandlers = function() {
    umbrella.$selectors.rootMenu
      .find('.toggle-menu-label')
        .on('click keypress', function(e) {
          if (a11yClickSpaceEnter(e)) {
            changeContextualMenus.bind(this)($mainSelectors.root);
            return;
          }
        });
    
    umbrella.$selectors.menuToggle
      .off('focusin').on('focusin', function(e) {
        var options = {
          cancelShiftTab: true,
          $rootDrillDown: $umbrellaSelectors.rootDrillDown
        },
        setFocusOnTabOut = setNextFocus.bind(this, e, options);
        setFocusOnTabOut();
      });
  
    umbrella.$selectors.rootMenu
      .find('.menu-header .menu-label')
        .on('click', function() {
          moveOffCanvasToRoot();
        });
  }

  bindOffCanvascontainerEventHandlers();
  bindUmbrellaEventHandlers();


  // $buttonSelectors.sectionMenu.on('click', function() {
  //   $offCanvasNavContainer.css({ 
  //     transform: "translateX(" + menuVisibleXVal + "px)",
  //     visibility: 'visible'
  //   });
  //   $offCanvasOverlay.show();
  // }); 

  $(window).on('scroll', setSectionMenuButtonSize)

  //CLOSE OFF-CANVAS-NAV
  // $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('click', function() {
  //   $offCanvasNavContainer.css({ 
  //     transform: "translateX(-" +  menuWidth + "px)",
  //     visibility: 'hidden'
  //   });
  //   $offCanvasOverlay.hide();
  // });

  // $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('keydown', function(e) {
  //   if(e.key === "Enter" || e.key === "Space")
  //     $offCanvasNavContainer.css({ 
  //       transform: "translateX(-" +  menuWidth + "px)",
  //       visibility: 'hidden'
  //     });
  //     $offCanvasOverlay.hide();
  // });

  // $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('click', function() {
  //   $(this).parents('.off-canvas-menu').css({ transform: "translateX(-" +  menuWidth + "px)"});
  // });

  // $rootUmbrellaDiv.find('.toggle-menu-label').on('click', function() {
  //   changeContextualMenus($(this));
  // });

  $rootMainDiv.find('.toggle-menu-label').on('click', function() {
    changeContextualMenus($(this));
  });

  // $rootUmbrellaDiv.find('.close.js-close-off-canvas-nav').on('click', function() {
  //   $offCanvasNavContainer.css({ transform: "translateX(-" +  menuWidth + "px)"});
  //   $offCanvasOverlay.hide();
  // });

  // $('#uninav .uninav__hamburger-menu .hamburger-menu-button').on('click', function() {
  //   $offCanvasNavContainer.css({ transform: "translateX(" + menuVisibleXVal + "px)"});
  //   $offCanvasOverlay.show();
  // });

  $rootMainDiv.find('.menu-header .menu-label').on('click', function() {
    moveOffCanvasToRoot($(this));
  });

  $rootUmbrellaDiv.find('.menu-header .menu-label').on('click', function() {
    moveOffCanvasToRoot($(this));
  });

  $rootMainDiv.find('.menu-header .menu-label').on('keydown', function(e) {
    if(e.key === "Enter" || e.key === "Space") {
      moveOffCanvasToRoot($(this));
    }
  });

  $rootUmbrellaDiv.find('.menu-header .menu-label').on('keydown', function(e) {
    if(e.key === "Enter" || e.key === "Space") {
      moveOffCanvasToRoot($(this));
    }
  });

  $offCanvasOverlay.on('click', function() {
    $offCanvasNavContainer.css({ 
      transform: "translateX(-" +  menuWidth + "px)",
      visibility: 'hidden'
    });
    $(this).hide();
  });

  $rootDrillDownNavUmbrella.on('click', '.drill-down-parent', drillMenuDown);
   
  $rootDrillDownNavMain.on('click', '..drill-down-parent', drillMenuDown);

  $rootDrillDownNavUmbrella.on('click', '.toggle-drilldown', drillMenuDown);

  $rootDrillDownNavMain.on('click', '.toggle-drilldown', drillMenuDown);

  $rootDrillDownNavUmbrella.on('click', '.menu-back', drillMenuUp);

  $rootDrillDownNavMain.on('click', '.menu-back', drillMenuUp);

  $rootDrillDownNavUmbrella.on('keydown', '.drill-down-parent', function(e) {
    if(e.key === "Enter" || e.key === "Space") {
      var $nextTabableItem = $(this).siblings('.drilldown-menu').children('.menu-back')
      var drillDown = drillMenuDown.bind(this);

      drillDown();

      //REASON FOR SET TIMEOUT SEE THIS SO 
      //https://stackoverflow.com/questions/3580068/is-settimeout-with-no-delay-the-same-as-executing-the-function-instantly/3580703#3580703
      setTimeout(function() {
        $nextTabableItem.focus();
      },500);
      return;
    }
  });

  $rootDrillDownNavMain.on('keydown', '.drill-down-parent', function(e) {
    if(e.key === "Enter" || e.key === "Space") {
      var $nextTabableItem = $(this).siblings('.drilldown-menu').children('.menu-back')
      var drillDown = drillMenuDown.bind(this);

      drillDown();

      //REASON FOR SET TIMEOUT SEE THIS SO 
      //https://stackoverflow.com/questions/3580068/is-settimeout-with-no-delay-the-same-as-executing-the-function-instantly/3580703#3580703
      setTimeout(function() {
        $nextTabableItem.focus();
      },500);
      return;
    }
  });

  $rootDrillDownNavUmbrella.on('keydown', '.menu-back', function(e) {
    if (e.key === "Enter" || e.key === "Space") {
      var $nextTabableItem = $(this).closest('.drill-down-list-item').children('.drill-down-parent');
      var drillup = drillMenuUp.bind(this);

      drillup();

      //REASON FOR SET TIMEOUT SEE THIS SO 
      //https://stackoverflow.com/questions/3580068/is-settimeout-with-no-delay-the-same-as-executing-the-function-instantly/3580703#3580703
      setTimeout(function() {
        $nextTabableItem.focus();
      },500);
      return;
    }
  });

  $rootDrillDownNavMain.on('keydown', '.menu-back', function(e) {
    if (e.key === "Enter" || e.key === "Space") {
      var $nextTabableItem = $(this).closest('.drill-down-list-item').children('.drill-down-parent');
      var drillup = drillMenuUp.bind(this);

      drillup();

      //REASON FOR SET TIMEOUT SEE THIS SO 
      //https://stackoverflow.com/questions/3580068/is-settimeout-with-no-delay-the-same-as-executing-the-function-instantly/3580703#3580703
      setTimeout(function() {
        $nextTabableItem.focus();
      },500);
      return;
    }
  });

  $('#off-canvas-umbrella-navigation .root-umbrella-nav .menu-back').each(function(idx, item) {
    Mousetrap(item).bind('shift+tab', function(e) {
      var currentMenuBack = $(document.activeElement);
      var drillUp = drillMenuUp.bind(currentMenuBack);
      drillUp();
    });
  });

  $('#off-canvas-main-navigation .root-main-nav .menu-back').each(function(idx, item) {
    Mousetrap(item).bind('shift+tab', function(e) {
      var currentMenuBack = $(document.activeElement);
      var drillUp = drillMenuUp.bind(currentMenuBack);
      drillUp();
    });
  });

  function changeContextualMenus($menuToShow, skipDrillDown) {
    debugger
    var $otherContextualMenu  = $menuToShow.parents('.off-canvas-menu').siblings('.off-canvas-menu'),
    $activeDrillDownMenu      = $menuToShow.find('.drilldown-menu.active');
    
    $otherContextualMenu.removeClass('slide-in');
    $otherContextualMenu.addClass('slide-out');
    $menuToShow.show();
    $menuToShow.removeClass('slide-out');
    $menuToShow.addClass('slide-in');

    // used to keep animation on exiting menu
    setTimeout(function() {
      $currentContextualMenu.hide();
    }, 500);

    if (skipDrillDown) {
      // if (!$rootDrillDownNavMain.initialHeight)
      //   $rootDrillDownNavMain.initialHeight = $('.root-main-nav').height();

      // if (!$rootDrillDownNavUmbrella.initialHeight)
      //   $rootDrillDownNavUmbrella.initialHeight = $('.root-umbrella-nav').height();

      // if ($otherContextualMenu.find('.root-umbrella-nav').length) {
      //   if ( $rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
      //     $rootElement.css({ overflowY: 'scroll' });
      //   } else {
      //     $rootElement.css({ overflowY: 'hidden' });
      //   }
      //   $rootDrillDownNavUmbrella.css({ height: $rootDrillDownNavUmbrella.initialHeight });
      // } else {
      //   if ($rootDrillDownNavMain.initialHeight + headerHeight >= $(window).height()) {
      //     $rootElement.css({ overflowY: 'scroll' });
      //   } else {
      //     $rootElement.css({ overflowY: 'hidden' });
      //   }
      //   $rootDrillDownNavMain.css({ height: $rootDrillDownNavMain.initialHeight });
      // }

      // setMenuHeightOverflow()

      return;
    }

    // if (!$activeDrillDownMenu.length) {
    //   $
    // }

    if ($activeDrillDownMenu.height() + headerHeight >= $(window).height()) {
      $rootElement.css({ overflowY: 'scroll' });
    } else {
      $rootElement.css({ overflowY: 'hidden' });
    }

    return;
  }

  function moveOffCanvasToRoot($element, $menuToMove) {
    //POSSIBY JUST USE ROOT FOR EVERYTHING
    $element.find('.drilldown-menu.active').removeClass('active');

    if ($element.parents('#off-canvas-umbrella').length === 1) {
      $rootDrillDownNavUmbrella.find('.drilldown-menu.active').removeClass('active');
      $rootUmbrellaDiv.find('.root-umbrella-nav').css({ transform: "translateX(-" + menuVisibleXVal + "px" });
      $rootUmbrellaDiv.find('.drilldown-menu').hide();

      if ($rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
      } else {
        $rootElement.css({ overflowY: 'hidden' });
      }

      $rootDrillDownNavUmbrella.css({ height: $rootDrillDownNavUmbrella.initialHeight });
      return;
    }
    $rootDrillDownNavMain.find('.drilldown-menu.active').removeClass('active');
    $rootMainDiv.find('.root-main-nav').css({ transform: "translateX(-" + menuVisibleXVal + "px"  });
    $rootMainDiv.find('.drilldown-menu').hide();

    if ( $rootDrillDownNavMain.height() + headerHeight >= $(window).height()) {
      $rootElement.css({ overflowY: 'scroll' });
    } else {
      $rootElement.css({ overflowY: 'hidden' });
    }

    $rootDrillDownNavMain.css({ height: $rootDrillDownNavMain.initialHeight });
    return;
  }

  function drillMenuDown($drillDownMenu, translateAmount) {
    var $menuToDrillDownTo  = $(this).siblings('.drilldown-menu'),
    ulCurrentPos            = getTranslateXVal(main.$selectors.menu),
    umbrellaDrillDown       = $(this).parents('#off-canvas-umbrella').length,
    translateXVal           = ulCurrentPos - menuWidth;
    $rootUmbrellaMenu       = umbrella.$selectors.rootMenu,
    $rootMainMenu           = main.$selectors.rootMenu,
    $umbrellaMenu           = umbrella.$selectors.menu,
    $mainMenu               = main.$selectors.menu;

    if ($drillDownMenu.length) {
      $menuToDrillDownTo  = $drillDownMenu;
      umbrellaDrillDown   = $menuToDrillDown.parents('#off-canvas-umbrella').length;
      $drillDownMenu.parents('ul.drilldown-menu').show();
    }

    if (umbrellaDrillDown) {
      ulCurrentPos  = getTranslateXVal($rootDrillDownNavUmbrella),
      translateXVal = translateAmount || ulCurrentPos - MENUWIDTH;

      $rootUmbrellaMenu.find('.drilldown-menu.active').removeClass('active');
      $menuToDrillDownTo.addClass('active');
      $menuToDrillDownTo.show();

      
      $umbrellaMenu.css({ transform: "translateX(" + translateXVal + "px)" });
      setMenuHeightOverflow( $menuToDrillDownTo );
      offCanvasContainer.$selectors.main.animate({ scrollTop: 0 });
      // $rootUmbrellaMenu.css({ height: $menuToDrillDownTo.height() });

      // if ($menuToDrillDownTo.height() + headerHeight > $(window).height()) {
      //   $rootElement.css({ overflowY: 'scroll' });
      //   return
      // }

      // $rootElement.css({ overflowY: 'hidden' })

      return;
    }
    
    $rootMainMenu.find('.drilldown-menu.active').removeClass('active');
    $menuToDrillDownTo.addClass('active');
    $menuToDrillDownTo.show();
    $mainMenu.css({ transform: "translateX(" + translateXVal + "px)" });
    setMenuHeightOverflow( $menuToDrillDownTo );
    offCanvasContainer.$selectors.root.animate({ scrollTop: 0 }, 'slow');

    // if ($menuToDrillDownTo.height() + headerHeight > $(window).height()) {
    //   $rootElement.css({ overflowY: 'scroll' });
    //   return
    // }

    // $rootElement.css({ overflowY: 'hidden' })
    return;
  }
  
  function drillMenuUp(cb) {
    var umbrellaDrillDown = $(this).parents('#off-canvas-umbrella').length,
    ulCurrentPos          = getTranslateXVal($rootDrillDownNavMain),
    translateXVal         = ulCurrentPos + menuWidth,
    $parentDrillDownMenu  = $(this).closest('.drill-down-list-item').closest('.drilldown-menu');

    if (umbrellaDrillDown) {
      $rootDrillDownNavUmbrella.find('.drilldown-menu.active').removeClass('active');
      $parentDrillDownMenu.addClass('active');
      ulCurrentPos  = getTranslateXVal($rootDrillDownNavUmbrella),
      translateXVal = ulCurrentPos + menuWidth;
      
      $rootDrillDownNavUmbrella.css({ transform: "translateX(" + translateXVal + "px)"  });

      // $rootDrillDownNavUmbrella.animate({ transform: "translateX(" + translateXVal + "px)"  }, function() {
      //   debugger
      //   cb && cb();
      // });

      // cb && cb();
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

      $rootDrillDownNavUmbrella.css({ height: $parentDrillDownMenu.height() });

      if ( $parentDrillDownMenu.height() + headerHeight >= $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
      } else {
        $rootElement.css({ overflowY: 'hidden' });
      }

      return;
    }

    $rootDrillDownNavMain.find('.drilldown-menu.active').removeClass('active');
    $parentDrillDownMenu.addClass('active');
    $rootDrillDownNavMain.css({ transform: "translateX(" + translateXVal + "px)"  });
    $(this).parent().hide();

    if (translateXVal == 0) {
      $rootDrillDownNavMain.css({ height: $rootDrillDownNavMain.initialHeight });

      if ($rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
      } else {
        $rootElement.css({ overflowY: 'hidden' });
      }
      
      return;
    };

    if ($rootDrillDownNavMain.initialHeight + headerHeight >= $(window).height())
      $rootElement.css({ overflowY: 'scroll' });

    $rootDrillDownNavMain.css({ height: $parentDrillDownMenuHeight });
  
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
  
  function moveToCurrent() {
    var $currentMenuItem          = offCanvasContainer.$selectors.main.find('li.current:first'),
    $rootUmbrellaMenu             = umbrella.$selectors.rootMenu,
    $rootMainMenu                 = main.$selectors.rootMenu,
    $umbrellaMenu                 = umbrella.$selectors.menu,
    $mainMenu                     = main.$selectors.menu,
    //umbrellaNav                   = $rootDrillDownNavUmbrella.length,
    $currentMenuItemDrillDownMenu = $currentMenuItem.parent('.drilldown-menu');

    if ($currentMenuItem.length) {
      var $drillDownParents = $currentMenuItem.parents('ul.drilldown-menu'),
      currentOnUmbrella     = $currentMenuItem.parents('#off-canvas-umbrella').length;
      
      $currentMenuItemDrillDownMenu.addClass('active');
      $drillDownParents.show();


      if (currentOnUmbrella) {
        var translateAmount = menuWidth * $drillDownParents.length;

        changeContextualMenus($rootUmbrellaMenu, $currentMenuItemDrillDownMenu.length);



        if ($currentMenuItemDrillDownMenu.length) {
          //COME BACK TO!!! GIVE IT TRANSLATEAMOUNT
          drillMenuDown
          setMenuHeightOverflow($currentMenuItemDrillDownMenu, )
          return;
        }

        return;
      }

      var translateAmount = (menuWidth * 2) * $drillDownParents.length

      // $rootMainMenu.show();
      // $rootUmbrellaMenu.hide();
      // $rootMainDiv.show();
      // $rootUmbrellaDiv.hide();

      // $rootDrillDownNavMain.initialHeight = $('.root-umbrella-nav').height();
      changeContextualMenus($rootMainMenu, $currentMenuItemDrillDownMenu.length);
      // $rootDrillDownNavMain.css({ transform: "translateX(-" + ((menuWidth * 2) * $drillDownParents.length) + "px" });
      // $rootUmbrellaDiv.css({ transform: "translateX(-" + menuWidth + "px" });

      if ($currentPathDrillDownMenu.length) {
        // COME BACK TO!!! GIVE IT TRANSLATEAMOUNT
        drillMenuDown
        setMenuHeightOverflow($currentMenuItemDrillDownMenu);
        return
      }

      return;
    }

    if (umbrella.onPage) {
      // $rootDrillDownNavUmbrella.initialHeight = $('.root-umbrella-nav').height();
      setMenuHeightOverflow($umbrellaMenu);

      // if ($rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
      //   $rootElement.css({ overflowY: 'scroll' });
      // } else {
      //   $rootElement.css({ overflowY: 'hidden' });
      // }
      return;
    }

    setMenuHeightOverflow($mainMenu);
    
    // $rootDrillDownNavMain.initialHeight  = $('.root-main-nav').height();

    // if ($rootDrillDownNavMain.initialHeight + headerHeight >= $(window).height()) {
    //   $rootElement.css({ overflowY: 'scroll' });
    // } else {
    //   $rootElement.css({ overflowY: 'hidden' });
    // }

    return;
  }

  function setSectionMenuButtonSize() {
    // console.log('hello world');
    var scrollThreshHold = .20 * $(window).height();

    if ($(window).scrollTop() < scrollThreshHold && $sectionMenuButton.hasClass('section-menu-small')) {
      $('.section-menu-text').show();
      $('.section-menu-hamburger-icon').hide();
      $sectionMenuButton.removeClass('section-menu-small');
      return;
    }

    if ($(window).scrollTop() > scrollThreshHold && !$sectionMenuButton.hasClass('section-menu-small')) {
      $('.section-menu-hamburger-icon').show();
      $('.section-menu-text').hide();
      $sectionMenuButton.addClass('section-menu-small');
    }
  }

  function selectLastDrillDownElement() {
    var $umbrellaLastItem      = $rootDrillDownNavUmbrella.find('li').last(),
    $mainLastItem              = $rootDrillDownNavMain.find('#off-canvas-cta-item li a').last(),
    $umbrellaDrillDownMenus   = $rootDrillDownNavUmbrella.find('.drilldown-menu'),
    $mainDrillDownMenus       = $rootDrillDownNavMain.find('.drilldown-menu');
    // debugger

    $umbrellaDrillDownMenus.each( function(idx, drillDownMenu) {

      $(drillDownMenu).children(':last-child').off('focusin').on('focusin', function(e) {
        var drilldown = null,
        self          = this,
        eventListeners = {
          click: false,
          shiftTab: false
        }
        
        $(document).off('click').on('click', function(e) {
          e.stopPropagation();
          $(document).off('click');
          eventListeners.click = true;
        });

        
        $(this).off("focusout").on("focusout", function(e) {
          e.stopPropagation();

          var $menuBack = $(this).siblings('.menu-back');

          drilldown = setTimeout(function() {
            if ($(self).find('.active').length) {
              return;
            }

            if (!e.relatedTarget) {
              return;
            }

            if (eventListeners.shiftTab) {
              return;
            }

            if (eventListeners.click) {
              return
            }
            $(document.activeElement).blur();
            drillMenuUp.call($menuBack);
            $(self).parent().closest('.drill-down-list-item').children('.drill-down-parent').focus()
            return;
          }, 500);

          return;
        });

        Mousetrap(this).bind('shift+tab', function(e) {
          e.stopPropagation();
          Mousetrap.unbind('shift+tab');

          eventListeners.shiftTab = true;
        });
      });
    });

    $mainDrillDownMenus.each( function(idx, drillDownMenu) {

      $(drillDownMenu).children(':last-child').off('focusin').on('focusin', function(e) {
        var drilldown = null,
        self          = this,
        eventListeners = {
          click: false,
          shiftTab: false
        }
        
        $(document).off('click').on('click', function(e) {
          e.stopPropagation();
          $(document).off('click');
          eventListeners.click = true;
        });

        
        $(this).off("focusout").on("focusout", function(e) {
          e.stopPropagation();

          var $menuBack = $(this).siblings('.menu-back');

          drilldown = setTimeout(function() {
            if ($(self).find('.active').length) {
              return;
            }

            if (!e.relatedTarget) {
              return;
            }

            if (eventListeners.shiftTab) {
              return;
            }

            if (eventListeners.click) {
              return
            }
            $(document.activeElement).blur();
            drillMenuUp.call($menuBack);
            $(self).parent().closest('.drill-down-list-item').children('.drill-down-parent').focus()
            return;
          }, 500);

          return;
        });

        Mousetrap(this).bind('shift+tab', function(e) {
          e.stopPropagation();
          Mousetrap.unbind('shift+tab');

          eventListeners.shiftTab = true;
        });
      });
    });

    $umbrellaLastItem.on('keydown', function(e) {

      if (e.key === "Tab") {
        $offCanvasNavContainer.css({ 
          transform: "translateX(-" +  menuWidth + "px)",
          visibility: 'hidden'
        });
        $offCanvasOverlay.hide();
      }
    });

    $mainLastItem.on('keydown', function(e) {
      if (e.key === "Tab") {

        $offCanvasNavContainer.css({ 
          transform: "translateX(-" +  menuWidth + "px)",
          visibility: 'hidden'
        });
        $offCanvasOverlay.hide();
      }
    });
  }

  /////// START FOCUS EVENT FOR TOGGLING MENU /////////////
  // $offCanvasNavContainer.find('.toggle-menu-label').off('focusin').on('focusin', function() {
  //   var eventListeners  = { shiftTab: false };
  //   // setTabFocus         = null;


  //   Mousetrap(this).bind('shift+tab', function(e) {
  //     Mousetrap.unbind('shift+tab');
  //     eventListeners.shiftTab = true;
  //     return;
  //   });
    
  //   $(this).off('focusout').on('focusout', function() {

  //       if (eventListeners.shiftTab === true) {
  //         eventListeners.shiftTab = false;
  //         return;
  //       }
        
  //       var umbrellaNav = $rootUmbrellaDiv.is(':visible');
        
  //       if (umbrellaNav) {
  //         var $activeUmbrellaDrillDown = $rootDrillDownNavUmbrella.find('.drilldown-menu.active').children('.menu-back');
  //         if ($activeUmbrellaDrillDown.length) {
  //           $activeUmbrellaDrillDown.focus();
  //           return;
  //         }
    
  //         var $firstMenuItem = $rootDrillDownNavUmbrella.find('.drill-down-list-item:first');
    
  //         if ($firstMenuItem.find('.drilldown-menu').length) {
  //           $firstMenuItem.find('.drill-down-parent').focus();
  //           return;
  //         }
      
  //         $firstMenuItem.find('a').focus();
  //         return;
  //       }
    
  //       var $activeMainDrillDown = $rootDrillDownNavMain.find('.drilldown-menu.active').children('.menu-back');
  //       if ($activeMainDrillDown.length) {
  //         $activeMainDrillDown.focus();
  //         return;
  //       }
        
  //       var $firstMenuItem = $rootDrillDownNavMain.find('.drill-down-list-item:first');
    
  //       if ($firstMenuItem.find('.drilldown-menu').length) {
  //         $firstMenuItem.find('.drill-down-parent').focus();
  //         return;
  //       }
    
  //       $firstMenuItem.find('a').focus();
        
  //       return;
  //     // }
  //   });
  // });
  /////// END FOCUS EVENT FOR TOGGLING MENU /////////////
  
  /////// NEW FUNCTIONS START ////////////

  var setNextFocus = function(e, options) {
    var eventListeners = { shiftTab: false };

    // if next-focus has shift+tab functionality it needs to 
    // determine before timeout ends set shift+tab check to true
    Mousetrap(this).bind('shift+tab', function(e) {
      Mousetrap.unbind('shift+tab');
      eventListeners.shiftTab = true;
    });

    // on focusout determine if the keboard is shiftin
    $(this).off('focusout').on('focusout', function(e) {
      if (options.cancelShiftTab && eventListeners.shiftTab) {
        Mousetrap.unbind('shift+tab');
        eventListeners.shiftTab = false;
        return;
      }

      var $activeDrillDownMenu = findActiveDrillDown(options.$rootDrillDown);

      if ($activeDrillDownMenu) {
        $activeDrillDownMenu.children('.menu-back').focus();
        return;
      }

      var $findFirstListItem = options.rootDrillDown.find('.drill-down-list-item:first');

      if ($findFirstListItem.find('.drilldown-menu').length) {
        $firstMenuItem.find('.drill-down-parent').focus();
        return;
      }

      $findFirstListItem.find('a').focus();
      return;
    });
  }

  function findActiveDrillDown($element) {
    var $activeDrillDownMenu = $element.find('.drilldown-menu.active');

    if ($activeDrillDownMenu.length) {
      return $activeDrillDownMenu;
    }

    return false;
  }

  function openCloseOffCanvasNav() {
    if( offCanvasContainer.$selectors.main.css('visibility') === 'visible') {
      offCanvasContainer.$selectors.main.css({ 
        transform: "translateX(-" +  MENUWIDTH + "px)",
        visibility: 'hidden'
      });
      offCanvasContainer.$selectors.overlay.hide();
      return;
    }

    offCanvasContainer.$selectors.main.css({ 
      transform: "translateX(" +  MENUVISIBLE + "px)",
      visibility: 'visible'
    });
    offCanvasContainer.$selectors.overlay.show();
    return;
  }

  function setMenuHeightOverflow($drillDownMenu) {
    var drillDownMenuHeight = $drillDownMenu.height(),
    $offCanvasRoot          = offCanvasContainer.$selectors.main,
    umbrellaMenu            = $drillDownMenu.parents('#off-canvas-umbrella').length;

    if (umbrellaMenu) {
      umbrella.$selectors.rootMenu.css({ height: drillDownMenuHeight });
    } else {
      main.$selectors.root.css({ height: drillDownMenuHeight })
    }

    if ()

    if (drillDownMenuHeight + offCanvasContainer.headerHeight >= $(window).height()) {
      $offCanvasRoot.css({ overflowY: 'scroll' });
    } else {
      $offCanvasRoot.css({ overflowY: 'hidden' });
    }
  }

  function changeContextualMenus() {

  }

  function setMenuInitializers() {

  };

  /////// NEW FUNCTIONS END ////////////


  ///////// A11Y CLICK FUNCTION //////////////
  function a11yClickSpaceEnter(event){
    if(event.type === 'click'){
      return true;
    }
    else if(event.type === 'keypress'){
      var code = event.key
      if((code === "Enter")|| (code === " ")){
        return true;
      }
    }
    else{
      return false;
    }
  }

  function a11yClickTab(event){
    if(event.type === 'click'){
      return true;
    }
    else if(event.type === 'keypress'){
      var code = event.key;
      if(code === "Tab"){
          return true;
      }
    }
    else{
      return false;
    }
  }

  selectLastDrillDownElement();
  moveToCurrent();
});
