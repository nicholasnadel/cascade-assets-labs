$(document).ready( function() {
  var feedContainer  = new chapDOM('#emergency-feed.emergency-feed-container');
  var emergencyFeed   = 'https://social03.chapman.edu:4040/emergency-feed';
  // debugger

  if (!feedContainer.elems.length) return;

  $.get(emergencyFeed, function(data) {
    // debugger
    if (!data.length) return;

    $('.no-emergency-feed').remove();
    var $feedItemContainer  = $('<div></div>', { class: 'feed-item-container' });
    $('.emergency-feed-updates').append(feedContainer);

    data.forEach( function(feedItem, idx ) {
      
      var $feedItem = $('<p></p>', { 
        class: 'feed-item feed-item-' + idx, 
        text: feedItem.created_at + ' ' + feedItem.text 
      });

      $feedItemContainer.append($feedItem);
      $('.emergency-feed-updates').append($feedItemContainer);
    });

    
  });
})