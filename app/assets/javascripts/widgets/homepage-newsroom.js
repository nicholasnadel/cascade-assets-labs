$(document).ready(function () {
  var newsroomFeed = 'https://dev-www.chapman.edu/getFeed.ashx?name=newsEditorsPicks';
  
  function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    
    return textArea.value;
  }

  function trimDescription(description, title) {
    var descriptionNoHTML       = description.trim().replace(/(<([^>]+)>)/ig, ""),
        descriptionNoHTMLLength = descriptionNoHTML.length,
        titleLength             = title.length;
    
    descriptionNoHTML = decodeEntities(descriptionNoHTML);
    
    if (descriptionNoHTMLLength > 500 && titleLength < 30) {
      descriptionNoHTML = descriptionNoHTML.substring(0, descriptionNoHTML.indexOf(" ", 500) < 0 ? 501 : descriptionNoHTML.indexOf(" ", 500));
      descriptionNoHTML = descriptionNoHTML + '...';
      return descriptionNoHTML;
    }

    if (descriptionNoHTMLLength > 400 && titleLength < 60) {
      descriptionNoHTML = descriptionNoHTML.substring(0, descriptionNoHTML.indexOf(" ", 400) < 0 ? 401 : descriptionNoHTML.indexOf(" ", 400));
      descriptionNoHTML = descriptionNoHTML + '...';
      return descriptionNoHTML;
    }

    if (descriptionNoHTMLLength > 200 && titleLength > 60) {
      descriptionNoHTML = descriptionNoHTML.substring(0, descriptionNoHTML.indexOf(" ", 200) < 0 ? 201 : descriptionNoHTML.indexOf(" ", 200));
      descriptionNoHTML = descriptionNoHTML + '...';
      return descriptionNoHTML;
    }

    return descriptionNoHTML;
  }

  function trimTitle(title) {

    if (title.length > 55) {
      title = title.substring(0, title.indexOf(" ", 55) < 0 ? 56 : title.indexOf(" ", 55));
      title = title + '...'
    }

    return title
  }
  
  $.get('https://social04.chapman.edu:4040/data?url=' + newsroomFeed, function (rssData) {

    rssData[0].item.forEach(function (item, idx) {
      //First item in the rss feed array is the featured story 
      if (idx === 0) {

        $('.homepage #featured_newsroom_stories .maxWidth .announcement img').attr('src', item.image[0].img[0].$.src);
        $('.homepage #featured_newsroom_stories .maxWidth .announcement img').attr('alt', item.image[0].img[0].$.alt);
        $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').attr('href', item.link[0]);
        $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').attr('data-cta-label', item.title[0]);
        $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').text(item.title[0]);
        $('.homepage #featured_newsroom_stories .maxWidth .announcement #featured-description').text(trimDescription(item.description[0], item.title[0]));

        return
      }
      $('.homepage .third .story.story-' + idx).attr('aria-label', item.title[0]);
      $('.homepage .third .story.story-' + idx + ' a.permalink').attr('href', item.link[0]);
      $('.homepage .third .story.story-' + idx + ' a.permalink').attr('data-cta-label', item.title[0]);
      $('.homepage .third .story.story-' + idx + ' a.permalink h2.title').text(trimTitle(item.title[0]));
      $('.homepage .third .story.story-' + idx + ' a.permalink .story-bg').attr('style', 'background-image:url(' + item.image[0].img[0].$.src + ')');
      $('.homepage .third .story.story-' + idx + ' a.permalink .story-bg').attr('aria-label', item.image[0].img[0].$.alt);
      $('.homepage .third .story.story-' + idx + ' a.permalink img').attr('alt', item.image[0].img[0].$.alt);
      $('.homepage .third .story.story-' + idx + ' a.permalink img').attr('src', + item.image[0].img[0].$.src);

    });
  });
});
