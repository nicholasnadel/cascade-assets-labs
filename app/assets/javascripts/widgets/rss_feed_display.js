$(document).ready(function() {
  var $rssFeedContainer = $('.rss-feed-display-widget'),
  rssFeedItemColor      = $rssFeedContainer.attr('data-bg-color'),
  rssFeedUrl             = $rssFeedContainer.attr('data-rss-feed');
  debugger
  $rssFeedContainer.append('<div>Hello WORLD</div>')
  if (rssFeedUrl.length) return;

  function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;

    return textArea.value;
  }

  function createFeedItemDateTime(rssFeedItemDate, type) {
    switch(type) {
      case 'wordpress':
        var months  = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
        date        = Date.parse(rssFeedItemDate.substring(0, rssFeedItemDate.indexOf('+'))),
        month       = months[new Date(date).getMonth()],
        dayOfMonth  = new Date(date).getDate(),
        year        = new Date(date).getFullYear(),
        hour        = new Date(date).getHours() > 12 ? new Date(date).getHours() - 12 : new Date(date).getHours(),
        minute      = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes(),
        ampm        = new Date(date).getHours() > 12 ? 'p.m.' : 'a.m.';

        if (hour == 0 || hour == 00)
          hour = 12
    
        return {date: month + ' ' + dayOfMonth + ', ' + year, time: hour + ':' + minute + " " + ampm};
      default:
        return rssFeedItemDate;
    }
  }

  function trimContent(content, length) {
    if (content.length > length) {
      content = content.substring(0, content.indexOf(" ", length) < 0 ? length + 1 : content.indexOf(" ", length));
      content = content + '...'
    }

    return content
  }

  function displayMoreRssItems() {
    debugger;
  }

  $.getJSON("https://social04.chapman.edu:4040/data?url=" + rssFeedUrl, function (data) {
    var feedItems      = data[0].item,
    $rssFeedItemButton = $('<button></button>', {
      class: 'rss-feed-item-widget__button--' + rssFeedItemColor, 
      text: 'View More',
      onclick: function() {displayMoreRssItems}
    })

    if (!feedItems.length) {
      return;
    }

    feedItems.forEach(function(feedItem, idx) {
      var feedItemDate        = createFeedItemDateTime(feedItem.pubDate[0], 'wordpress'),
      feedItemDescription     = feedItem.description[0].trim().replace(/(<([^>]+)>)/ig, '');

      feedItemDescription = decodeEntities(feedItemDescription);

      if (feedItemDescription.length > 100) {
        feedItemDescription = feedItemDescription
        feedItemDescription = feedItemDescription + '...';
      }

      var $feedItemContainer        = $('<div></div>', {class: idx < 3 ? 'rss-feed-item__container bg-color--' + rssFeedItemColor :'hidden'}),
      $feedItemDescriptionContainer = $('<div></div>', {class: 'rss-feed-item__description-container'}),
      $feedItemDescription          = $('<p></p>', {class: 'rss-feed-item__description-text', text: trimContent(feedItemDescription, 100)}),
      $feedItemLink                 = $('<a></a>', {class: 'rss-feed-item__link text--link', href: feedItem.link[0], text: feedItem.title[0]}),
      $feedItemDateContainer        = $('<div></div>', {class: 'rss-feed-item__date-container'}),
      $feedItemDate                 = $('<p></p>', {class: 'rss-feed-item__date', text: feedItemDate.date}),
      $feedItemTime                 = $('<p></p>', {class: 'rss-feed-item__time', text: feedItemDate.time});

      $feedItemDateContainer.append([$feedItemDate, $feedItemTime]);
      $feedItemDescriptionContainer.append([$feedItemLink, $feedItemDescription]);
      $feedItemContainer.append([$feedItemDateContainer, $feedItemDescriptionContainer]);
      $rssFeedContainer.append($feedItemContainer);

    });

    $rssFeedContainer.append($rssFeedItemButton);
    return;

  })
  .done(function (data) {})
  .fail(function (data) {
    $(".events").html("<p>There are no events found or the events feed is temporarily down).</p>");
  });
});
//