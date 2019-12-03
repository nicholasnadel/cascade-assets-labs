$(function () {

  ma5menu({
    menu: '.uninav__menu-drilldown--global',
    activeClass: 'active',
    footer: '.uninav--cta',
    position: 'left',
    closeOnBodyClick: true
  });
  contextualMenu({
    menu: '.uninav__menu-drilldown--contextual',
    activeClass: 'active',
    footer: '.uninav--cta',
    position: 'left',
    closeOnBodyClick: true
  });
});
