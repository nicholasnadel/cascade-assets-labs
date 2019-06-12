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
  }).fail(function () {
    $.get('https://social03.chapman.edu:4040/data?url=' + newsroomFeed, function (rssData) {
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
      var featuredStoryImg    = 'https://news.chapman.edu/wp-content/uploads/2019/06/baseball-on-stage-580x387.jpg',
          featuredStoryAlt    =  'baseball coaches gather on stage.',
          featuredStoryDes    = 'There’s no better way to end the weeklong celebration and professional gathering that is Staff Summit than with an awards ceremony honoring some of the best and brightest staff members—except, of course,...',
          featuredStoryLink   = 'https://news.chapman.edu/wp-content/uploads/2019/06/baseball-on-stage-580x387.jpg',
          featuredStoryTitle  = 'Stellar Staff and Baseball Champs Share the Spotlight at Chapman’s Staff Summit Awards',
          firstStoryTitle     = 'A Voice for the Voiceless',
          firstStoryLink      = 'https://news.chapman.edu/2019/06/06/a-voice-for-the-voiceless/',
          firstStoryImg       = 'https://news.chapman.edu/wp-content/uploads/2019/06/gonzalez-ed-580x387.jpg'
          firstStoryAlt       = "Flor Gonzalez (JD '19) with Dean Matt Parlow.",
          secondStoryTitle    = 'What’s in a Name? For Amazonian Tribes, There’s a Connection...',
          secondStoryLink     = 'https://news.chapman.edu/2019/06/06/whats-in-a-name-for-amazonian-tribes-theres-a-connection-to-culture-and-identity/',
          secondStoryImg      = 'https://news.chapman.edu/wp-content/uploads/2019/05/P1010432-580x425.jpg'
          secondStoryAlt      = "peruvian soccer team",
          thirdStoryTitle     = 'Fighting Fires With Facebook',
          thirdStoryLink      = 'https://news.chapman.edu/2019/05/31/fighting-fires-with-facebook/',
          thirdStoryImg       = 'https://news.chapman.edu/wp-content/uploads/2019/05/fire-580x387.jpg'
          thirdStoryAlt       = "Rescue teams evacuating neighborhood from wildfire",
  
  
      $('.homepage #featured_newsroom_stories .maxWidth .announcement img').attr('src', featuredStoryImg);
      $('.homepage #featured_newsroom_stories .maxWidth .announcement img').attr('alt', featuredStoryAlt);
      $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').attr('href', featuredStoryLink);
      $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').attr('data-cta-label', featuredStoryTitle);
      $('.homepage #featured_newsroom_stories .maxWidth .announcement h2 a').text(featuredStoryTitle);
      $('.homepage #featured_newsroom_stories .maxWidth .announcement #featured-description').text(featuredStoryDes);
  
      $('.homepage .third .story.story-1').attr('aria-label',firstStoryTitle);
      $('.homepage .third .story.story-1' + ' a.permalink').attr('href', firstStoryLink);
      $('.homepage .third .story.story-1' + ' a.permalink').attr('data-cta-label',firstStoryTitle);
      $('.homepage .third .story.story-1' + ' a.permalink h2.title').text(firstStoryTitle);
      $('.homepage .third .story.story-1' + ' a.permalink .story-bg').attr('style', 'background-image:url(' + firstStoryImg + ')');
      $('.homepage .third .story.story-1' + ' a.permalink .story-bg').attr('aria-label', firstStoryAlt);
      $('.homepage .third .story.story-1' + ' a.permalink img').attr('alt', firstStoryAlt);
      $('.homepage .third .story.story-1' + ' a.permalink img').attr('src', + firstStoryImg);
  
      $('.homepage .third .story.story-2').attr('aria-label',secondStoryTitle);
      $('.homepage .third .story.story-2' + ' a.permalink').attr('href', secondStoryLink);
      $('.homepage .third .story.story-2' + ' a.permalink').attr('data-cta-label',secondStoryTitle);
      $('.homepage .third .story.story-2' + ' a.permalink h2.title').text(secondStoryTitle);
      $('.homepage .third .story.story-2' + ' a.permalink .story-bg').attr('style', 'background-image:url(' + secondStoryImg + ')');
      $('.homepage .third .story.story-2' + ' a.permalink .story-bg').attr('aria-label', secondStoryAlt);
      $('.homepage .third .story.story-2' + ' a.permalink img').attr('alt', secondStoryAlt);
      $('.homepage .third .story.story-2' + ' a.permalink img').attr('src', + secondStoryImg);
  
      $('.homepage .third .story.story-3').attr('aria-label',thirdStoryTitle);
      $('.homepage .third .story.story-3' + ' a.permalink').attr('href', thirdStoryLink);
      $('.homepage .third .story.story-3' + ' a.permalink').attr('data-cta-label',thirdStoryTitle);
      $('.homepage .third .story.story-3' + ' a.permalink h3.title').text(thirdStoryTitle);
      $('.homepage .third .story.story-3' + ' a.permalink .story-bg').attr('style', 'background-image:url(' + thirdStoryImg + ')');
      $('.homepage .third .story.story-3' + ' a.permalink .story-bg').attr('aria-label', thirdStoryAlt);
      $('.homepage .third .story.story-3' + ' a.permalink img').attr('alt', thirdStoryAlt);
      $('.homepage .third .story.story-3' + ' a.permalink img').attr('src', + thirdStoryImg);
    });
  });;
});
