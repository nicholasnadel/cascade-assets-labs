

$(function() {
  $.each($('.collapsibles-widget'), function(ind) {
    $(this).attr('id', 'accordion-' + parseInt(ind + 1));
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
    $(".collapsibles-widget .toggle-expand-collapse.expand").click(function () {
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

      console.log('currentAccordion' + currentAccordion);
      
      // var childContent = $('childContent' + parent)
      // console.log(childContent);
      // console.log('childcontent::' + content);
      // childContent = "'" + childContent + "'";
      // console.log('childcontent w quotes' + childContent);
      $(content).fadeIn();

      $(currentAccordion).addClass('active');
      $(currentExpand).hide()
      $(currentCollapse).fadeIn()
    });
    // keys 🎹
    $(".collapsibles-widget .toggle-expand-collapse.expand").keydown(function (e) {
      if (e.keyCode === 32 || e.keyCode === 13) {
        $(currentAccordion).addClass('active');
        // $(".accordion .content").css('display', 'block');
        $(content).fadeIn();
        $(currentExpand).hide();
        $(currentCollapse).fadeIn().focus();
      }
    })
  }

  function collapseAll() {
    $(".collapsibles-widget .toggle-expand-collapse.collapse").click(function () {
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
      $(currentExpand).fadeIn();
      $(currentCollapse).hide();
    })
    // keys 🎹
    $(".collapsibles-widget .toggle-expand-collapse.collapse").keydown(function (e) {
      if (e.keyCode === 32 || e.keyCode === 13) {
        $(".accordion").removeClass('active');
        $(".accordion .content").css('display', 'none');
        $('.collapsibles-widget .toggle-expand-collapse.collapse').hide();
        $('.collapsibles-widget .toggle-expand-collapse.expand').fadeIn().focus();
      }
    })
  }
  $('.collapsibles-widget .toggle-expand-collapse.collapse').hide();
  expandAll();  
  collapseAll();
});

