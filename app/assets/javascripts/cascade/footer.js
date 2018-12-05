function removeSrc() {
	$('script').each(function() {
		var old_src = jQuery(this).attr('src');
		$(this).attr('src', 'about:blank');
		//console.log('removed source');
	});
}

function toggleWeather() {
	$(document).ready(function() {
		if (window.location.href.indexOf('/navsNoJS/') > -1) {
			// removeSrc();
			$('.weather').css('display', 'none');
		} else {
			$('.weather').css('display', 'flex');
			//console.log('displaying weather widget');
		}
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

toggleWeather();