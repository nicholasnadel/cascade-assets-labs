$(document).ready(function() {
  var drillDownSelectorsLeftNav = {
    rootDrillDownNav: '#left-column-navigation .root-left-nav',
    rootElement: '#left-column-navigation',
  };

  var leftNavDrillDown = new DrillDownMenu(drillDownSelectorsLeftNav);
  
  leftNavDrillDown.createClickHandlers();
});
