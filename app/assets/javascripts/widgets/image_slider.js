$(document).ready(function() {
  $("#image-gallery").lightSlider({
    gallery: false,
    item: 1,
    thumbItem: 9,
    slideMargin: 0,
    speed: 500,
    auto: false,
    loop: true,
    keyPress: true,
    onSliderLoad: function() {
      $("#image-gallery").removeClass("cS-hidden");
    }
  });
});
