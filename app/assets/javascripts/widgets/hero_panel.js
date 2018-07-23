$(document).ready(function(){
  var trigger = $('.hero-select-button');
  var list    = $('.hero-select-list');
  var highlighted;

  var highlight = function(i) {
    highlighted = $(i);
    highlighted.addClass('selected').siblings('.selected').removeClass('selected');
  };

  trigger.on('click', function() {
    trigger.toggleClass('active');
    list.slideToggle(200);
  });

  $('.hero-select-list li').on('hover', function() {
    highlight(this);
  });

  $(document).on('click', function(event) {
    if(trigger[0] !== event.target && !list.has(event.target).length) {
      list.slideUp(200);
    }
  });
});