$(document).ready( function() {
  var $rootNav = $('.root-umbrella-nav');

  $('#uninav .off-canvas-nav .toggle').on('click', function() {
    $(this).siblings('.drilldown-menu').show();
    // $(this).siblings('.drilldown-menu').addClass('show');
    // console.log($rootNav.css());
    // debugger
    var rootNavTranslateXVal = parseInt(getTranslateXVal($rootNav)) - 400;

    $rootNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px"  });
  });

  $('#uninav .off-canvas-nav .menu-back').on('click', function() {
    // debugger
    var $backButton = $(this);

    setTimeout(function() {
      $backButton.parent().hide();
    }, 1000);
    
    var rootNavTranslateXVal = parseInt(getTranslateXVal($rootNav)) + 400;
    
    $rootNav.css({ transform: "translateX(" + rootNavTranslateXVal + "px"  });
  })

  function getTranslateXVal(selector) {
    var transformMatrix = selector.css("-webkit-transform") ||
                          selector.css("-moz-transform")    ||
                          selector.css("-ms-transform")     ||
                          selector.css("-o-transform")      ||
                          selector.css("transform");
    var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
    var x = matrix[12] || matrix[4];//translate x
    return x;
  }
});