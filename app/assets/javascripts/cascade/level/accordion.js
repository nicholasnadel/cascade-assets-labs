$(function () {
  $(".accordion .header").click(function () {
    $accordion = $(this);
    //getting the next element
    $content = $accordion.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(100, function () {
      //execute this after slideToggle is done
      //change text of accordion based on visibility of content div
      $accordion.text(function () {
        //change text based on condition
        // return $content.is(":visible") ? "Collapse" : "Expand";
      });
    });
  });


  function expandAll() {
  $(".collapsibles-widget .toggle-expand-collapse.expand").click(function () {
    $(".accordion").addClass('active');
    $(".accordion").toggleClass("active");
    $(".accordion .content").css('display', 'block');
    console.log('expanding')
    $('.collapsibles-widget .toggle-expand-collapse.expand').hide()
    $('.collapsibles-widget .toggle-expand-collapse.collapse').show()
  });
}

function collapseAll() {
  $(".collapsibles-widget .toggle-expand-collapse.collapse").click(function () {
    $(".accordion").removeClass('active');
    $(".accordion .content").css('display', 'none');
    console.log('collapsing')
    $('.collapsibles-widget .toggle-expand-collapse.collapse').hide()
    $('.collapsibles-widget .toggle-expand-collapse.expand').show()

    // $('.collapsibles-widget .toggle-expand-collapse.expand').toggleClass('hidden')

  })
}

$('.collapsibles-widget .toggle-expand-collapse.collapse').hide()
expandAll();
collapseAll();
});
