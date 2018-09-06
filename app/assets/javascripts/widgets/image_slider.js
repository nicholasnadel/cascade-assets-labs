$(document).ready(function () {
  $(".widget-slides").lightSlider({
    gallery: false,
    item: 1,
    thumbItem: 9,
    slideMargin: 0,
    speed: 500,
    pause: 4000,
    auto: false,
    loop: true,
    keyPress: true,
    pauseOnHover: false,
    // useCSS: true,
    onSliderLoad: function () {
      $(".widget-slides").removeClass("cS-hidden");
    }
  });
});