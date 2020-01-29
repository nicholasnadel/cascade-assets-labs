$(function () {
  if ($(".uninav__logo--secondary").length) {
    console.log('contextual/secondary menu found');
    ma5menu({
      menu: '.uninav__menu-drilldown--contextual-plus-global',
      activeClass: 'active',
      footer: '.uninav--cta',
      position: 'left',
      closeOnBodyClick: true
    });
    mainMenuToggle();
  } else {
    ma5menu({
      menu: '.uninav__menu-drilldown--global',
      activeClass: 'active',
      footer: '.uninav--cta',
      position: 'left',
      closeOnBodyClick: true
    });
    contextualMenuToggle();
  }
});

function destroyMenuClones() {
  // $('div.ma5menu__container:nth-of-type(n+2)').not('.ma5menu__panel--active').remove();
  // $('.ma5menu__container:nth-of-type(n+2), nav#js-ma5menu:nth-of-type(n+2), .ma5menu:nth-of-type(n+2), .ma5menu__panel:nth-of-type(n+2)').remove();


  $('.ma5menu__header:nth-of-type(n+2)').remove();

  console.log('killing clones');
}

function contextualMenuToggle() {
  destroyMenuClones();
  $('<li class="uninav__contextual-menu-toggle" data-ma5order="ma5-li-0"><a aria-label="Contextual school menu" href="#">School Menu</a></li>').prependTo('.ma5menu__container ul');
  $('.ma5menu__container ul').addClass('uninav__menu-drilldown--global');
  $('.ma5menu__container ul').removeClass('uninav__menu-drilldown--contextual');


  $('li.uninav__contextual-menu-toggle').on('click', function () {
    console.log('triggering main campus menu');
    $(ma5menu).remove();
    ma5menu({
      menu: '.uninav__menu-drilldown--contextual',
    });
    mainMenuToggle();
  });
  console.log('prepended contextual menu toggle');
}

function mainMenuToggle() {
  destroyMenuClones();
  $('.ma5menu__container ul').removeClass('uninav__menu-drilldown--global');
  $('.ma5menu__container ul').addClass('uninav__menu-drilldown--contextual');

  $('<li class="uninav__main-menu-toggle" data-ma5order="ma5-li-0"><a aria-label="Toggle Global Chapman Menu"  href="#"><- Chapman Menu</a></li>').prependTo('.ma5menu__container ul')
  console.log('prepended contextual menu toggle');


  $('li.uninav__main-menu-toggle').on('click', function () {
    console.log('triggering main campus menu')
    $(ma5menu).remove();
    ma5menu({
      menu: '.uninav__menu-drilldown--global',
    });
    contextualMenuToggle();
  });
}
