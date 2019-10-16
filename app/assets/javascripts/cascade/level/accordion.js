var currentCollapsibleWidget = $(this).closest('.collapsibles-widget').attr('id');
var accordionClass = ' .accordion';
var currentAccordion = currentCollapsibleWidget + accordionClass;
$(function () {
  // ADD UNIQUE ID TO EACH ACCORDION ON PAGE
  $.each($('.collapsibles-widget'), function (ind) {
    $(this).attr('id', 'accordion-' + parseInt(ind + 1));
    // if multiple accordions, change text
    if ((currentAccordion).length > 1) {
      $('.toggle-expand-collapse').text('Expand Each Dropdown In This Section');
    } else {
      $('#collapsibles-widget__toggle').text('Expand')
    }
  });
  // HANDLE CLICKS ON HEADERS
  $(".accordion .header").click(function () {
    $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
  });
  $(".accordion").children(".header").keydown(function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
      return false
    }
  })
  // HANDLE EXPAND TOGGLES
  $(".collapsibles-widget .toggle-expand-collapse").on('click keypress', function (event) {
    var currentCollapsibleWidget = $(this).closest('.collapsibles-widget').attr('id');
    var currentCollapsibleWidget = '#' + currentCollapsibleWidget;
    var contentClass = ' .content';
    var content = currentCollapsibleWidget + contentClass;
    var accordionClass = ' .accordion';
    var currentAccordion = currentCollapsibleWidget + accordionClass;
    var toggleClass = ' .toggle-expand-collapse';
    var currentToggle = currentCollapsibleWidget + toggleClass;
    var expandClass = ' .toggle-expand-collapse.expand';
    var toggleId = ' #collapsibles-widget__toggle';
    var currentToggle = currentCollapsibleWidget + toggleId;
    var expandId = ' #collapsibles-widget__expand';
    var currentExpand = currentCollapsibleWidget + expandId;
    var collapseId = ' #collapsibles-widget__collapse';
    var currentCollapse = currentCollapsibleWidget + collapseId;
    var collapseClass = ' .toggle-expand-collapse.collapse';
    var introText = ' .editableContent.summaryText';
    var currentIntroText = currentCollapsibleWidget + introText;
    console.log('currentinrotext: ' + currentIntroText);
    var currentIntroTextHeight = $(currentIntroText).height();
    console.log('currentintrotextheight: ' + currentIntroTextHeight);
    var omniHeight = $('#omni-nav-v2').height();

    // EXPAND
    if ($(currentToggle).hasClass('expand')) {
      $(content).fadeIn('fast');
      $(currentAccordion).addClass('active');
      $(currentToggle).removeClass('expand');
      $(currentToggle).addClass('collapse');
      $(currentCollapse).fadeIn('fast')
      // focus on collapse toggle
      $(currentCollapse).focus();
      // scroll to top of id
      if ((currentAccordion).length > 1) {
        $(currentToggle).text('Collapse Each Dropdown In This Section');
      } else {
        $(currentToggle).text('Collapse');
      }
      console.log(currentIntroTextHeight);
      console.log('omniheight: ' + omniHeight);

      $('html, body').animate({
        scrollTop: $(currentCollapsibleWidget).offset().top - omniHeight
      }, 100);
    }
    // HANDLE COLLAPSE TOGGLES
    else if ($(currentToggle).hasClass('collapse')) {
      $(currentAccordion).removeClass('active');
      $(content).css('display', 'none');
      $(currentExpand).fadeIn('fast');
      $(currentCollapse).fadeOut('fast');
      $(currentToggle).removeClass('collapse');
      $(currentToggle).addClass('expand');
      $(currentExpand).focus();
      if ((currentAccordion).length > 1) {
        $(currentToggle).text('Expand Each Dropdown In This Section');
      } else {
        $(currentToggle).text('Expand');
      }
      $('html, body').animate({
        scrollTop: $(currentCollapsibleWidget).offset().top - omniHeight
      }, 100);
    }
  });
});
// KEYS 🎹
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