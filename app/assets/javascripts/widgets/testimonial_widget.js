$(function () {
  $('.testimonial-widget').slick({
    arrows: false,
    centerPadding: "0px",
    dots: true,
    slidesToShow: 1,
    infinite: true,
    variableWidth: false,
  });
  $('.testimonial-widget__button--left').click(function () {
    console.log('clicked')
    $(this).closest('.testimonial-widget').slick('slickPrev');
  });
  $('.testimonial-widget__button--right').click(function () {
    console.log('clicked')
    $(this).closest('.testimonial-widget').slick('slickNext');
  });

});