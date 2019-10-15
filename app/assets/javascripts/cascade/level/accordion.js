var parent = $(this).closest('.collapsibles-widget').attr('id');
parent = '#' + parent;
contentClass = ' .content';
console.log(parent);
var content = parent + contentClass;
console.log(content);

var accordionClass = ' .accordion';
var currentAccordion = parent + accordionClass;

var expandClass = ' .toggle-expand-collapse.expand';
var collapseClass = ' .toggle-expand-collapse.collapse';
var currentExpand = parent + expandClass;
var currentCollapse = parent + collapseClass;

$(function () {
  // add unique ID to each accordion on page
  $.each($('.collapsibles-widget'), function (ind) {
    $(this).attr('id', 'accordion-' + parseInt(ind + 1));

    // if multiple accordions, change text
    if ((currentAccordion).length > 1) {
      $('.toggle-expand-collapse.expand').text('Expand Each Dropdown In This Section');
      $('.toggle-expand-collapse.collapse').text('Collapse Each Dropdown In This Section');
    } else {
      $('.toggle-expand-collapse.expand').text('Expand')
    }
  });

});

$(function () {
  // $(".accordion .content").not(".accordion.active .content").css("display", "none");
  $(".accordion .header").click(function () {
    $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
  });
  $(".accordion").children(".header").keydown(function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
      return false
    }
  })

  function expandAll() {
    $(".collapsibles-widget .toggle-expand-collapse.expand").on('click keypress', function (event) {
      var parent = $(this).closest('.collapsibles-widget').attr('id');
      var parent = '#' + parent;
      var contentClass = ' .content';
      console.log(parent);
      var content = parent + contentClass;
      console.log(content);

      var accordionClass = ' .accordion';
      var currentAccordion = parent + accordionClass;

      var expandClass = ' .toggle-expand-collapse.expand';
      var collapseClass = ' .toggle-expand-collapse.collapse';
      var currentExpand = parent + expandClass;
      var currentCollapse = parent + collapseClass;

      console.log('currentAccordion' + currentAccordion);

      var introTextHeight = $('.editableContent.summaryText').height() + 20;
      $(content).fadeIn('fast');
      $(currentAccordion).addClass('active');
      $(currentExpand).hide()
      $(currentCollapse).fadeIn('fast')
      // focus on collapse toggle
      $(currentCollapse).focus();
      // scroll to top of id

      console.log('introtextheight:' + introTextHeight);
      $('html, body').animate({
        scrollTop: $(parent).offset().top - introTextHeight
      }, 100);
    });

  }

  function collapseAll() {
    $(".collapsibles-widget .toggle-expand-collapse.collapse").on('click keypress', function (event) {
      var parent = $(this).closest('.collapsibles-widget').attr('id');
      parent = '#' + parent;

      console.log('collapse parent: ' + parent)
      var contentClass = ' .content';
      var accordionClass = ' .accordion';
      var content = parent + contentClass;

      var currentAccordion = parent + accordionClass;
      console.log('currentAccordion' + currentAccordion);

      var expandClass = ' .toggle-expand-collapse.expand';
      var collapseClass = ' .toggle-expand-collapse.collapse';
      var currentExpand = parent + expandClass;
      var currentCollapse = parent + collapseClass;


      console.log('currentAccordion: ' + currentAccordion);
      $(currentAccordion).removeClass('active');
      $(content).css('display', 'none');
      $(currentExpand).fadeIn('fast');
      $(currentCollapse).hide();

      var introTextHeight = $('.editableContent.summaryText').height() + 20;
      console.log('introtextheight:' + introTextHeight);
      $('html, body').animate({
        scrollTop: $(parent).offset().top - introTextHeight
      }, 100);

      $(currentExpand).focus();

    })
  }
  $('.collapsibles-widget .toggle-expand-collapse.collapse').hide();
  expandAll();
  collapseAll();
});


// keys 🎹
function a11yClick(event) {
  if (event.type === 'click') {
    return true;
  } else if (event.type === 'keypress') {
    var code = event.charCode || event.keyCode;
    if ((code === 32) || (code === 13)) {
      return true;
    }
  } else {
    return false;
  }
}