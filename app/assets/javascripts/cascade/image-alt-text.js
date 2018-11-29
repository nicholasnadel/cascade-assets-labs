function AddImageAlt() {
	var missingAlt = $('img').not('[alt]');
	var blankAlt = $('img[alt=" "');
	var missingAria = $('img').not('[aria-label]');
	var emptyLinkSocial = $('article a').not('[aria-label]');

	$(missingAlt).each(function() {
		var h2 = $(this).parent().find('h2').text().split(/\s+/).slice(0, 5).join(' ');
		console.log(h2);
		if ($(h2 != ' ') || missingAlt.length) {
			$(this).attr('alt', 'embedded image from external source');
		} else {
			$(this).attr('alt', h2);
		}
		var missingAlt = $('img').not('[alt]');

		if ($(missingAlt.length)) {
			$(this).attr('alt', '" "');
		}
	});

	// var blankAlt = $('.feed-column img[alt=" "]');
	$(blankAlt).each(function() {
		var h2 = $(this).parent().find('h2').text().split(/\s+/).slice(0, 5).join(' ');
		$(this).attr('alt', h2);

		if ($(blankAlt.legnth)) {
			$('img').attr('alt', 'embedded image from external source');
		}
	});
}

function fixEmptySocialLinks() {
	var emptyShareLink = $('article a.post_external_link').not('[aria-label]');
	var emptyLinkSocial = $('article a.post_external_link').not('[aria-label]');
	var emptyLinkText = $('article a.post_external_link');
	$(emptyLinkSocial).each(function() {
		var h2 = $(this).parent().find('.message h2').text().split(/\s+/).slice(0, 5).join(' ');
		var socialTitle = $(this).parent('.message h2').text();
		var nearestText = $(this).closest('div').text().split(/\s+/).slice(0, 5).join(' ');
		$(this).html(h2);
		// $(this).attr('aria-label', h2 + '...');
	});
}

$(window).load(function() {
	AddImageAlt();
	fixEmptySocialLinks();
});
