function removeSrc() {
	$('script').each(function() {
		var old_src = jQuery(this).attr('src');
		$(this).attr('src', 'about:blank');
		//console.log('removed source');
	});
}

$(function() {
	$('.footer .footer-menu .links-header').on('click', function() {
		if ($(document).width() > 420 && $(window).width() > 420) return;

		if ($(this).siblings('ul').hasClass('linksIn')) {
			$(this).siblings('ul').removeClass('linksIn').addClass('linksOut');
			return;
		}

		if ($(this).siblings('ul').hasClass('linksOut')) {
			$(this).siblings('ul').removeClass('linksOut').addClass('linksIn');
			return;
		}

		$(this).siblings('ul').addClass('linksIn');
	});

	$(".footer a[href='#']").click(function() {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});
});

toggleWeather();
