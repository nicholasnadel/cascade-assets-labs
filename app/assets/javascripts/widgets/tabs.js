var TabsWidget = {};

TabsWidget.onTabClicked = function() {
  var $widget      = $(this).closest('.tabs-widget');
  var $navItem     = $(this);
  var $contentItem = $widget.find('.tabs-content > li:eq(' + $navItem.index() + ')');

  $navItem.addClass('active');
  $navItem.siblings().removeClass('active');
  
  $contentItem.addClass('active');
  $contentItem.siblings().removeClass('active');
};

$(function() {
  $tabNavLi = $('.tabs-widget .tabs-nav > li');
  $tabNavLi.on('click', TabsWidget.onTabClicked);

  $tabNavLi.keydown(function(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      TabsWidget.onTabClicked.call(e.currentTarget);
      return false
    }
  })
})
