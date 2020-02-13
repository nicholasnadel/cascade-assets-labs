$(document).ready(function() {
  var programEvents = $('[data-chapman-program-events]');
  
  if (!programEvents.length) return;

  $('[data-chapman-program-events]').each(function() {
    var categoryParams = {};
    $('[data-program-event-category]').each( function(idx, category) {
      categoryParams['param-' + idx] =  $(category).attr('data-program-event-category')
      debugger

    });
    debugger
    // $(this).fetchProgramEvents({ 
    //   feed_path: ,
    //   categories: categoryParams
    // });
  });
});