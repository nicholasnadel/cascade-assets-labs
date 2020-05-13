$(function () {
  if ($('.testimonial-widget').length) {
    $('.testimonial-widget').slick({
      arrows: true,
      centerPadding: "0px",
      dots: true,
      slidesToShow: 1,
      infinite: false,
      adaptiveHeight: false,
      variableWidth: false,
      accessibility: true
    });
    $('.testimonial-widget__button--left').click(function () {
      $(this).closest('.testimonial-widget').slick('slickPrev');
    });
    $('.testimonial-widget__button--right').click(function () {
      $(this).closest('.testimonial-widget').slick('slickNext');
    });
    // The plugin is not fully accessible (despite its claims) when there are links within a slide. Instead, it sets tabindex to -1 for slides not currently visible.  
    // On tab (within .testimonial-widget)
    $('.testimonial-widget').keyup(function (e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 9) {
        // Add tabindex 0 to a elements
        $(".testimonial-widget a").each(function (i) {
          $(this).attr('tabindex', '0');
        });
      }
    });

    $(".testimonial-widget .slick-dots").each(function (i) {
      $(this).parent().addClass('testimonial-widget__slick-dots--margin-bottom')
    });
  };
  $('.testimonial-widget__cta:has(.button)').addClass('testimonial-widget__cta--button');


});

