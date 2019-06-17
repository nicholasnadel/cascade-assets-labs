$(document).ready(function () {
  $(".widget-slides").lightSlider({
    gallery: false,
    item: 1,
    thumbItem: 9,
    slideMargin: 0,
    speed: 500,
    pause: 10000,
    auto: true,
    loop: true,
    keyPress: true,
    pauseOnHover: false,
    adaptiveHeight: true,
    // useCSS: true,
    onSliderLoad: function () {
      $(".widget-slides").removeClass("cS-hidden");
    }
  });

  // IE Fallback for widget-slides img { object-fit: } CSS property 
  if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    $('.image-slider-wrapper img').each(function () {
      var t = $(this),
        s = 'url(' + t.attr('src') + ')',
        p = t.parent(),
        d = $('<div></div>');

      p.append(d);
      d.css({
        'height': t.parent().css('height'),
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': '50% 20%',
        'background-image': s
      });
      t.hide();
    });
  }
});