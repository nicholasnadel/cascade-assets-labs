
var DrillDownMenu = (function(selectors) {
  // var $rootDrillDownMenu  = $(selectors.rootDrillDownNav);
  // var $scrollToTopElement = $(selectors.scrollToTop);
  var self = null;

  var Constructor = function (selectors) {
    // if (!selector) return;
    self = this;

    if (!selectors.rootDrillDownNav) return;

    this.$rootDrillDownNav    = $(selectors.rootDrillDownNav);
    this.$scrollToTopElement  = $(selectors.scrollToTop);
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
    translateXVal           = ulCurrentPos - widthAmount;
    debugger
    $menuToDrillDownTo.show();
    this.$rootDrillDownNav.css({ transform: "translateX(" + translateXVal + "px)"  });
    this.$scrollToTopElement && this.$scrollToTopElement.animate({ scrollTop: 0 }, 'slow');
    
    return;
  }

  /**
  * Run a callback on each item
  * @param  {Function} callback The callback function to run
  */
  Constructor.prototype.drillMenuUp = function($element) {
    var widthAmount = this.$rootDrillDownNav.width(),
    ulCurrentPos    = this.getTranslateXVal(this.$rootDrillDownNav),
    translateXVal   = ulCurrentPos + widthAmount;

    this.$rootDrillDownNav.css({ transform: "translateX(" + translateXVal + "px)"  });
    $element.parent().hide();

    return;
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
    var currentPath = $rootDrillDownMenu.find('li .current');

    if (currentPath.length) {
      var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
      widthAmount           = $rootDrillDownMenu.width();
      $drillDownParents.show();
      $rootDrillDownMenu.show();
      $rootDrillDownMenu.css({ transform: "translateX(-" + (widthAmount * $drillDownParents.length) + "px" });
    }
  }

  Constructor.prototype.createClickHandlers = function() {
    // debugger
    var drillMenuDown = function(event) {
      this.drillMenuDown($(event.currentTarget));
    };

    var drillMenuUp = function(event) {
      this.drillMenuUp($(event.currentTarget));
    };

    
    // this.$rootDrillDownNav.on('click', '.drill-down-parent', (event) => {
    //   debugger
    //   self.drillMenuDown($(this));
    // });
    // debugger
    this.$rootDrillDownNav.on('click', '.drill-down-parent', drillMenuDown.bind(this));
  
    this.$rootDrillDownNav.on('click', '.toggle-drilldown', drillMenuDown.bind(this));
  
    this.$rootDrillDownNav.on('click', '.menu-back', drillMenuUp.bind(this));
  }

  Constructor.prototype.hideDrillDownMenus = function() {
    self.$scrollToTopElement.children('.drilldown-menu').hide();
  };

  var instantiate = function (selectors) {
    return new Constructor(selectors);
  };

  /**
  * Instantiate a new constructor
  */
  return instantiate
})();

// $(document).ready(function() {

//   var drillDownSelectorsLeftNav = {
//     rootDrillDownNav: '#left-column-navigation .root-left-nav',
//     scrollToTop: '#left-column-navigation'
//   }

//   var $rootDrillDownMenu  = $(drillDownSelectorsLeftNav.rootDrillDownNav);
//   var $scrollToTopElement = $(drillDownSelectorsLeftNav.scrollToTop)

//   $rootDrillDownMenu.on('click', '.drill-down-parent', function(event) {
//     drillMenuDown($(this));
//   });

//   $rootDrillDownMenu.on('click', '.toggle-drilldown', function(event) {
//     drillMenuDown($(this));
//   });

//   $rootDrillDownMenu.on('click', '.menu-back', function() {
//     drillMenuUp($(this));
//   });

//   moveOffCanvasToCurrentPathItem();
//   /**@function
//    * @name drillMenuDown
//    * @description translates the rootUl class provided aross the x-axis
//    * @param {jQueryObject} $element - the this context of the clicked element
//    * @param {onject} selectors - object of selectors and width for translation
//    */
//   function drillMenuDown($element) {
//     var $menuToDrillDownTo  = $element.siblings('.drilldown-menu'),
//     widthAmount             = $rootDrillDownMenu.width(),
//     ulCurrentPos            = getTranslateXVal($rootDrillDownMenu),
//     translateXVal           = ulCurrentPos - widthAmount;
    
//     $menuToDrillDownTo.show();
//     $rootDrillDownMenu.css({ transform: "translateX(" + translateXVal + "px)"  });
//     $scrollToTopElement.length && $scrollToTopElement.animate({ scrollTop: 0 }, 'slow');
    
//     return
//   }

//   function drillMenuUp($element, selectors) {
//     var widthAmount = $rootDrillDownMenu.width(),
//     ulCurrentPos    = getTranslateXVal($rootDrillDownMenu),
//     translateXVal   = ulCurrentPos + widthAmount;

//     $rootDrillDownMenu.css({ transform: "translateX(" + translateXVal + "px)"  });
//     $element.parent().hide();

//     return;
//   }

//   function getTranslateXVal(selector) {
//     var transformMatrix = selector.css("-webkit-transform") ||
//                           selector.css("-moz-transform")    ||
//                           selector.css("-ms-transform")     ||
//                           selector.css("-o-transform")      ||
//                           selector.css("transform");
    
//     transformMatrix = transformMatrix === "none" ? 0 : transformMatrix;

//     if (!isNaN(transformMatrix))
//       return 0;
    
//     var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
//     var x = matrix[12] || matrix[4];//translate x

//     return parseInt(x);
//   }

//   function moveOffCanvasToCurrentPathItem() {
//     var currentPath = $rootDrillDownMenu.find('li .current');

//     if (currentPath.length) {
//       var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
//       widthAmount                       = $rootDrillDownMenu.width();
//       $drillDownParents.show();
//       $rootDrillDownMenu.show();
//       $rootDrillDownMenu.css({ transform: "translateX(-" + (widthAmount * $drillDownParents.length) + "px" });
//     }
//   }
// })