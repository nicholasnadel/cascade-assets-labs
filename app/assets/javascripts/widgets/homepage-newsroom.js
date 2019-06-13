$(document).ready(function () {
  var newsroomFeedCache = 'https://dev-www.chapman.edu/getFeed.ashx?name=newsEditorsPicks';
      newsroomFeed      = 'https://dev-news.chapman.edu/feed/news-editors-picks';

  function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;

    return textArea.value;
  }

  function trimDescription(description, title) {
    var descriptionNoHTML = description.trim().replace(/(<([^>]+)>)/ig, ""),
      descriptionNoHTMLLength = descriptionNoHTML.length,
      titleLength = title.length;

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

  $.get('https://social04.chapman.edu:4040/data?url=' + newsroomFeedCache, function (rssData) {

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
      $('.homepage .third .story.story-' + idx + ' a.permalink img').attr('src', +item.image[0].img[0].$.src);

    });
  }).fail(function () {
    $.get('https://social03.chapman.edu:4040/data?url=' + newsroomFeedCache, function (rssData) {
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
        $('.homepage .third .story.story-' + idx + ' a.permalink img').attr('src', +item.image[0].img[0].$.src);

      });
    }).fail(function () {
      function getImage(imgString) {
        var img = imgString.match(/src="(.+jpg|.+png|.+jpeg|.+gif)"/);

        return img[1];
      }

      function getDescription(descriptionString, title) {
        var description = descriptionString.replace(/\n/g, " ");
        description     = description.match(/<!\[CDATA\[(.*)/);
        description     = trimDescription(description[1], title);

        return description;
      }

      function getAltText(imgString) {
        var altText = imgString.match(/alt="(.*?)"/);

        return altText[1]
      }

      $.get(newsroomFeed, function (xml) {
        var xmlItems = xml.getElementsByTagName('item');

        for (var i = 0; i < xmlItems.length; i++) {
          var image       = getImage(xmlItems[i].getElementsByTagName('image')[0].innerHTML.trim()),
              altText     = getAltText(xmlItems[i].getElementsByTagName('image')[0].innerHTML.trim()),
              title       = xmlItems[i].getElementsByTagName('title')[0].innerHTML,
              description = getDescription(xmlItems[i].getElementsByTagName('description')[0].innerHTML.trim(), title);
              link        = xmlItems[i].getElementsByTagName('link')[0].innerHTML

          if (i === 0) {
            $('.homepage #featured_newsroom_stories .maxWidth .announcement img').attr('src', image);
            $('.homepage #featured_newsroom_stories .maxWidth .announcement img').attr('alt', altText);
            $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').attr('href', link);
            $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').attr('data-cta-label', title);
            $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').text(title);
            $('.homepage #featured_newsroom_stories .maxWidth .announcement #featured-description').text(description);

            continue
          }

          $('.homepage .third .story.story-' + i).attr('aria-label', title);
          $('.homepage .third .story.story-' + i + ' a.permalink').attr('href', link);
          $('.homepage .third .story.story-' + i + ' a.permalink').attr('data-cta-label', title);
          $('.homepage .third .story.story-' + i + ' a.permalink h2.title').text(trimTitle(title));
          $('.homepage .third .story.story-' + i + ' a.permalink .story-bg').attr('style', 'background-image:url(' + image + ')');
          $('.homepage .third .story.story-' + i + ' a.permalink .story-bg').attr('aria-label', altText);
          $('.homepage .third .story.story-' + i + ' a.permalink img').attr('alt', altText);
          $('.homepage .third .story.story-' + i + ' a.permalink img').attr('src', +image);
        }
      })
    });
  });;
});