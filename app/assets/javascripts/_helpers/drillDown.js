
var DrillDownMenu = (function(selectors) {

  var Constructor = function (selectors) {

    if (!selectors.rootDrillDownNav) return;

    this.$rootDrillDownNav  = $(selectors.rootDrillDownNav);
    this.$rootElement       = $(selectors.rootElement);
    this.rootDrillDownNav   = selectors.rootDrillDownNav;
    this.rootElement        = selectors.rootElement;
    this.translateXVal      = selectors.translateXVal;
    this.resizeTimer        = null;
    return;

  };

  /**
  * Run a callback on each item
  * @param  {Function} callback The callback function to run
  */
 Constructor.prototype.drillMenuDown = function($element) {
    var $menuToDrillDownTo  = $element.siblings('.drilldown-menu'),
    widthAmount             = this.$rootDrillDownNav[0].getBoundingClientRect().width,
    ulCurrentPos            = this.getTranslateXVal(this.$rootDrillDownNav),
    translateXVal           = this.translateXVal ? 
                                                "-" + (this.translateXVal - ulCurrentPos) + "px" : 
                                                Math.floor(((ulCurrentPos - widthAmount) * 100) / 100 )  + "px"
    $menuToDrillDownTo.show();
    this.$rootDrillDownNav.css({ transform: "translateX(" + translateXVal + ")"  });

    this.$rootElement && this.$rootElement.animate({ scrollTop: 0 }, 'slow');
    
    return;
  }

  /**
  * Run a callback on each item
  * @param  {Function} callback The callback function to run
  */
  Constructor.prototype.drillMenuUp = function($element) {
    var widthAmount = this.$rootDrillDownNav.width(),
    ulCurrentPos    = this.getTranslateXVal(this.$rootDrillDownNav),
    translateXVal   = this.translateXVal ? (ulCurrentPos + this.translateXVal) + "px" : 
                                        Math.floor(((ulCurrentPos + widthAmount) * 100) / 100 )  + "px"

    this.$rootDrillDownNav.css({ transform: "translateX(" + translateXVal + ")"  });
    $element.parent().hide();

    return;
  }

  Constructor.prototype.setRootNavHeight = function() {
    var $rootElementChildren  = this.$rootElement.children();
    var rootChildrenHeight    = 0;
    
    $rootElementChildren.each( function(idx, childElement) {
      var currentNav = childElement.find(this.rootDrillDownNav);
      if (!currentNav) {
        rootChildrenHeight = rootChildrenHeight + childElement.height;
      }
    });
  }

  Constructor.prototype.getTranslateXVal = function(selector) {
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

  Constructor.prototype.moveOffCanvasToCurrentPathItem = function() {
    var currentPath = this.$rootDrillDownNav.find('li .current');

    if (currentPath.length) {
      var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
      widthAmount           = Math.floor(((this.$rootDrillDownNav[0].getBoundingClientRect().width) * 100) / 100 ) || this.translateXVal
      $drillDownParents.show();
      this.$rootDrillDownNav.show();
      this.$rootDrillDownNav.css({ transform: "translateX(-" + (widthAmount * $drillDownParents.length) + "px" });
    }
  }

  Constructor.prototype.resizeRootDrillDown = function() {
    var widthAmount       = this.$rootDrillDownNav[0].getBoundingClientRect().width,
    ulCurrentPos          = this.getTranslateXVal(this.$rootDrillDownNav),
    $drillDownMenus       = this.$rootDrillDownNav.find('.drilldown-menu');
    $drillDownMenuVisible = this.$rootDrillDownNav.find('.drilldown-menu[style*="display: block"]')
    $drillDownMenus.css({ left: widthAmount + "px" });
    this.$rootDrillDownNav.css({ transform: "translateX(-" + (!ulCurrentPos ? ulCurrentPos :  widthAmount * $drillDownMenuVisible.length) + "px"});
  }

  Constructor.prototype.createClickHandlers = function() {
    var drillMenuDown = function(event) {
      this.drillMenuDown($(event.currentTarget));
    };

    var drillMenuUp = function(event) {
      this.drillMenuUp($(event.currentTarget));
    };

    var resizeRootDrillDown = function(event) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(this.resizeRootDrillDown.bind(this), 500);
    };

    if (!this.translateXVal)
      $(window).resize(resizeRootDrillDown.bind(this));

    this.$rootDrillDownNav.on('click', '.drill-down-parent', drillMenuDown.bind(this));
  
    this.$rootDrillDownNav.on('click', '.toggle-drilldown', drillMenuDown.bind(this));
  
    this.$rootDrillDownNav.on('click', '.menu-back', drillMenuUp.bind(this));

    this.moveOffCanvasToCurrentPathItem();

  }

  var instantiate = function (selectors) {
    return new Constructor(selectors);
  };

  /**
  * Instantiate a new constructor
  */
  return instantiate
})();
