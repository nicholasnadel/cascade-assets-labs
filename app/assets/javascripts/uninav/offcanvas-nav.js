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
  headerHeight                = $('#uninav .cu-off-canvas-header').height() + $('#uninav .menu-header').height(),
  $sectionMenuButton          = $('#uninav .uninav__umbrella-nav-button-container button'),
  $offCanvasOverlay           = $('.off-canvas-overlay#js-off-canvas-overlay');


  $sectionMenuButton.on('click', function() {
    $offCanvasNavContainer.css({ 
      transform: "translateX(" + menuVisibleXVal + "px)",
      visibility: 'visible'
    });
    $offCanvasOverlay.show();
  }); 

  $(window).on('scroll', setSectionMenuButtonSize)

  //CLOSE OFF-CANVAS-NAV
  $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('click', function() {
    $offCanvasNavContainer.css({ 
      transform: "translateX(-" +  menuWidth + "px)",
      visibility: 'hidden'
    });
    $offCanvasOverlay.hide();
  });

  $offCanvasNavContainer.find('.close.js-close-off-canvas-nav').on('keydown', function(e) {
    if(e.key === "Enter" || e.key === "Space")
      $offCanvasNavContainer.css({ 
        transform: "translateX(-" +  menuWidth + "px)",
        visibility: 'hidden'
      });
      $offCanvasOverlay.hide();
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
    $offCanvasOverlay.hide();
  });

  $('#uninav .uninav__hamburger-menu .hamburger-menu-button').on('click', function() {
    $offCanvasNavContainer.css({ transform: "translateX(" + menuVisibleXVal + "px)"});
    $offCanvasOverlay.show();
  });

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
    if(e.key === "Enter") {
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

  function changeContextualMenus($element) {
    var $otherContextualMenu  = $element.parents('.off-canvas-menu').siblings('.off-canvas-menu'),
    $currentContextualMenu    = $element.parents('.off-canvas-menu'),
    $activeDrillDownMenu      = $otherContextualMenu.find('.drilldown-menu.active')
    
    $currentContextualMenu.removeClass('slide-in');
    $currentContextualMenu.addClass('slide-out');
    $otherContextualMenu.show();
    $otherContextualMenu.removeClass('slide-out');
    $otherContextualMenu.addClass('slide-in');

    if (!$activeDrillDownMenu.length) {
      if (!$rootDrillDownNavMain.initialHeight)
        $rootDrillDownNavMain.initialHeight = $('.root-main-nav').height();

      if (!$rootDrillDownNavUmbrella.initialHeight)
        $rootDrillDownNavUmbrella.initialHeight = $('.root-umbrella-nav').height();

      if ($otherContextualMenu.find('.root-umbrella-nav').length) {
        if ( $rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
          $rootElement.css({ overflowY: 'scroll' });
        } else {
          $rootElement.css({ overflowY: 'hidden' });
        }
        $rootDrillDownNavUmbrella.css({ height: $rootDrillDownNavUmbrella.initialHeight });
      } else {
        if ($rootDrillDownNavMain.initialHeight + headerHeight >= $(window).height()) {
          $rootElement.css({ overflowY: 'scroll' });
        } else {
          $rootElement.css({ overflowY: 'hidden' });
        }
        $rootDrillDownNavMain.css({ height: $rootDrillDownNavMain.initialHeight });
      }



      setTimeout(function() {
        $currentContextualMenu.hide();
      }, 500);

      return;
    }

    if ($activeDrillDownMenu.height() + headerHeight >= $(window).height()) {
      $rootElement.css({ overflowY: 'scroll' });
    } else {
      $rootElement.css({ overflowY: 'hidden' });
    }

    setTimeout(function() {
      $currentContextualMenu.hide();
    }, 500);

    return;
  }

  function moveOffCanvasToRoot(element) {
    if (element.parents('#off-canvas-umbrella').length === 1) {
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

  function drillMenuDown() {
    var $menuToDrillDownTo  = $(this).siblings('.drilldown-menu'),
    ulCurrentPos            = getTranslateXVal($rootDrillDownNavMain),
    umbrellaDrillDown       = $(this).parents('#off-canvas-umbrella').length,
    translateXVal           = ulCurrentPos - menuWidth;

    if (umbrellaDrillDown) {
      ulCurrentPos  = getTranslateXVal($rootDrillDownNavUmbrella),
      translateXVal = ulCurrentPos - menuWidth;
      $rootDrillDownNavUmbrella.find('.drilldown-menu.active').removeClass('active');
      $menuToDrillDownTo.addClass('active');

      $menuToDrillDownTo.show();
      $rootElement.animate({ scrollTop: 0 });
      $rootDrillDownNavUmbrella.css({ transform: "translateX(" + translateXVal + "px)" });

      $rootDrillDownNavUmbrella.css({ height: $menuToDrillDownTo.height() });

      if ($menuToDrillDownTo.height() + headerHeight > $(window).height()) {
        $rootElement.css({ overflowY: 'scroll' });
        return
      }

      $rootElement.css({ overflowY: 'hidden' })

      return;
    }
    
    $rootDrillDownNavMain.find('.drilldown-menu.active').removeClass('active');
    $menuToDrillDownTo.addClass('active');
    $menuToDrillDownTo.show();
    $rootDrillDownNavMain.css({ transform: "translateX(" + translateXVal + "px)" });
    $rootElement.animate({ scrollTop: 0 }, 'slow');
    if ($menuToDrillDownTo.height() + headerHeight > $(window).height()) {
      $rootElement.css({ overflowY: 'scroll' });
      return
    }

    $rootElement.css({ overflowY: 'hidden' })
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
  
  function moveToCurrentSetHeight() {
    var currentPath           = $rootElement.find('li.current'),
    umbrellaNav               = $rootDrillDownNavUmbrella.length,
    $currentPathDrillDownMenu = currentPath.parent('.drilldown-menu');

    if (currentPath.length) {
      $currentPathDrillDownMenu.addClass('active');
      var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
      umbrellaDrillDown     = currentPath.parents('#off-canvas-umbrella').length;
      
      $drillDownParents.show();
      $rootDrillDownNavUmbrella.initialHeight  = $('.root-umbrella-nav').height();

      if (umbrellaDrillDown) {
        $rootUmbrellaDiv.show();
        $rootMainDiv.hide();
        $rootDrillDownNavUmbrella.css({ transform: "translateX(-" + (menuWidth * $drillDownParents.length) + "px" });
        $rootMainDiv.css({ transform: "translateX(-" + menuWidth + "px" });

        if ( $currentPathDrillDownMenu.length) {
          if ($currentPathDrillDownMenu.height() + headerHeight >= $(window).height()) {
            $rootElement.css({ overflowY: 'scroll' });
          } else {
            $rootElement.css({ overflowY: 'hidden' });
          }
        } else {
          if ($rootDrillDownNavUmbrella.initialHeight + headerHeight >= $(window).height()) {
            $rootElement.css({ overflowY: 'scroll' });
          } else {
            $rootElement.css({ overflowY: 'hidden' });
          }
        }
      
        return;
      }

      $rootMainDiv.show();
      $rootUmbrellaDiv.hide();
      $rootDrillDownNavMain.initialHeight = $('.root-umbrella-nav').height();
      $rootDrillDownNavMain.css({ transform: "translateX(-" + ((menuWidth * 2) * $drillDownParents.length) + "px" });
      $rootUmbrellaDiv.css({ transform: "translateX(-" + menuWidth + "px" });

      if ($currentPathDrillDownMenu.length) {
        if ($currentPathDrillDownMenu.height() + headerHeight >= $(window).height()) {
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


  $offCanvasNavContainer.find('.toggle-menu-label').off('focusin').on('focusin', function() {
    var eventListeners  = { shiftTab: false };
    setTabFocus         = null;


    Mousetrap(this).bind('shift+tab', function(e) {
      Mousetrap.unbind('shift+tab');
      eventListeners.shiftTab = true;
      return;
    });
    
    $(this).off('focusout').on('focusout', function() {

      // setTabFocus = setTimeout(function() {
      //   if (eventListeners.shiftTab === true) {
      //     eventListeners.shiftTab = false;
      //     return;
      //   }
      //   setTabOnToggleMenuFocusOut();
      // }, 5000);

      // function setTabOnToggleMenuFocusOut() {
        if (eventListeners.shiftTab === true) {
          eventListeners.shiftTab = false;
          return;
        }
        
        var umbrellaNav = $rootUmbrellaDiv.is(':visible');
        
        if (umbrellaNav) {
          var $activeUmbrellaDrillDown = $rootDrillDownNavUmbrella.find('.drilldown-menu.active').children('.menu-back');
          if ($activeUmbrellaDrillDown.length) {
            $activeUmbrellaDrillDown.focus();
            return;
          }
    
          var $firstMenuItem = $rootDrillDownNavUmbrella.find('.drill-down-list-item:first');
    
          if ($firstMenuItem.find('.drilldown-menu').length) {
            $firstMenuItem.find('.drill-down-parent').focus();
            return;
          }
      
          $firstMenuItem.find('a').focus();
          return;
        }
    
        var $activeMainDrillDown = $rootDrillDownNavMain.find('.drilldown-menu.active').children('.menu-back');
        if ($activeMainDrillDown.length) {
          $activeMainDrillDown.focus();
          return;
        }
        
        var $firstMenuItem = $rootDrillDownNavMain.find('.drill-down-list-item:first');
    
        if ($firstMenuItem.find('.drilldown-menu').length) {
          $firstMenuItem.find('.drill-down-parent').focus();
          return;
        }
    
        $firstMenuItem.find('a').focus();
        
        return;
      // }
    });
  });

  selectLastDrillDownElement();
  moveToCurrentSetHeight();
});
