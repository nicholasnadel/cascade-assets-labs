function addMissingAltText() {
	var missingAlt = $('img').not('[alt]');
	var blankAlt = $('img[alt=" "]');
	var missingAria = $('img').not('[aria-label]');
	var emptyLinkSocial = $('article a').not('[aria-label]');
	$('img').each(function() {
		$(missingAlt).attr('alt', 'embedded image from external source');
		$(blankAlt).attr('alt', 'embedded image from external source');
	});
}

function fixEmptySocialLinks() {
	var emptyLinkSocial = $('article a.post_external_link').not('[aria-label]');
	$(emptyLinkSocial).each(function() {
		var h2 = $(this).parent().find('.message h2').text().split(/\s+/).slice(0, 5).join(' ');
		var socialTitle = $(this).parent('.message h2').text();
		var nearestText = $(this).closest('div').text().split(/\s+/).slice(0, 5).join(' ');
		// $(this).attr('aria-label', 'external link');
		$(this).attr('aria-label', 'read more about ' + h2 + '...');
	});
}

$(window).load(function() {
	addMissingAltText();
	fixEmptySocialLinks();
});
