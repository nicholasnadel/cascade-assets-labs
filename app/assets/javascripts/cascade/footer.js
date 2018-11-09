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

	$.getJSON('https://forecast.chapman.edu/chapman/banner-json.php?callback=orange', function(data) {
		var iconPath = data.weather.icon_path,
			tempF = data.weather.temp_f,
			tempC = data.weather.temp_c,
			url = '//www.chapman.edu',
			$weather = $('.weather');
		//find weather class in html and substitute placeholders with current temp
		$weather.find('img').attr('src', url + iconPath);
		$weather.find('.temp #tempF').html(tempF);
		$weather.find('.temp #tempC').html(tempC);
	});
});

$(document).ready(function() {
	$('.weather').css('display', 'flex');
	if (document.location.pathname.indexOf('/navsNoJs/') == 0) {
		$('.weather').css('display', 'none');
	}
});
