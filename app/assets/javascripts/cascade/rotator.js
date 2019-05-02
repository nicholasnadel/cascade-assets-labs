$(function () {
  var SliderMastheadMixins = (function () {
    var SLIDER_CONTAINER_SELECTOR = 'div.slider.version-201611';
    var HEADER_SELECTOR = SLIDER_CONTAINER_SELECTOR + ' div.column.header div.aligned';
    var SUBHEADER_SELECTOR = HEADER_SELECTOR + ' div.subheader';
    var isSliderMasthead = $(SLIDER_CONTAINER_SELECTOR).length > 0;
    var $header = null;
    var $subheader = null;
    var onStart = function (slider) {
      if (!isSliderMasthead) {
        return;
      }
      $header = $(HEADER_SELECTOR);
      $subheader = $(SUBHEADER_SELECTOR);
    };
    var beforeSlideChange = function (slider) {
      if (!isSliderMasthead) {
        return;
      }
      $header.fadeTo("slow", 0);
    };
    var afterSlideChange = function (slider) {
      if (!isSliderMasthead) {
        return;
      }
      var currentSubtitle = currentSlideSubtitle(slider);
      $subheader.empty();
      if (currentSubtitle != '' && currentSubtitle !== undefined) {
        currentSubtitle = currentSubtitle.replace(/(\n)+/g, "<br/>");
        $subheader.append("<hr /><h3>" + currentSubtitle + "</h3>");
      }
      $header.fadeTo("slow", 1);
    };
    var currentSlideNumber = function (slider) {
      return slider.currentSlide;
    };
    var currentSlide = function (slider) {
      var currentSlide = slider.slides[currentSlideNumber(slider)];
      return $(currentSlide);
    };
    var currentSlideSubtitle = function (slider) {
      var $currentSlide = currentSlide(slider);
      return $currentSlide.find('input.slideSubtitle').val();
    }
    return {
      onStart: onStart,
      beforeSlideChange: beforeSlideChange,
      afterSlideChange: afterSlideChange
    };
  })();
  if ($(".rotatorContainer").parent(".mosaic").length > 0) {
    $('.flexslider').flexslider({
      animation: "slide",
      touchSwipe: true,
      controlNav: false,
      pauseOnHover: true,
      pauseOnAction: true,
      pausePlay: true,
      randomize: false,
      slideshowSpeed: (function () {
        var setting = $(".slideOptions .speed").text(),
          speed = 10000;
        if (setting > 0) {
          speed = 1000 * setting;
        }
        return speed;
      })(),
      slideToStart: (function () {
        var number = $(".slideOptions .startingSlideNumber").text();
        if (number > 0) {
          return (number - 1);
        } else {
          return 0;
        }
      })(),
      slideshow: (function () {
        var isAuto = $(".slideOptions .autoRotate").text() ? true : false;
        return isAuto;
      })(),
      animationLoop: true,
      start: function (slider) {
        g_mySlider = slider;
        var currentSlide = slider.slides[slider.currentSlide],
          $currentSlide = $(currentSlide);
      },
      before: function (slider) {},
      after: function (slider) {
        var currentSlide = slider.slides[slider.currentSlide],
          $currentSlide = $(currentSlide);
      }
    });
    $(".mosaic .info").each(function (index) {
      if (!$(this).attr("title")) {
        $(this).remove();
      }
    });
    $(".info").tipsy({
      fade: true,
      gravity: $.fn.tipsy.autoWE
    });
    $(".nameBar .slideDescription").remove();
  } else if ($(".rotatorContainer").parent(".rounded-slider").length > 0) {
    $('.rounded-slider').find('.red').html('<p>' + $(".rounded-slider .slide:first-child").attr('data-red') + '</p>');
    if ($(".rounded-slider .slide:first-child").attr('data-link')) {
      $('.rounded-slider').find('.red').append(
        $("<a>").attr({
          'href': $(".rounded-slider .slide:first-child").attr('data-link'),
          'title': 'Learn More'
        }).html("Learn More &raquo;")
      );
    } else {
      $('.rounded-slider').find('.red').addClass("no-link");
    }
    $('.flexslider').flexslider({
      animation: "slide",
      touchSwipe: true,
      directionNav: false,
      pauseOnHover: true,
      pauseOnAction: true,
      pausePlay: true,
      randomize: false,
      slideshowSpeed: (function () {
        var setting = $(".slideOptions .speed").text(),
          speed = 10000;
        if (setting > 0) {
          speed = 1000 * setting;
        }
        return speed;
      })(),
      slideToStart: (function () {
        var number = $(".slideOptions .startingSlideNumber").text();
        if (number > 0) {
          return (number - 1);
        } else {
          return 0;
        }
      })(),
      slideshow: (function () {
        var isAuto = $(".slideOptions .autoRotate").text() ? true : false;
        return isAuto;
      })(),
      animationLoop: true,
      start: function (slider) {
        g_mySlider = slider;
        var currentSlide = slider.slides[slider.currentSlide],
          $currentSlide = $(currentSlide),
          red = $('.rounded-slider').find('.red');
        var caption = $currentSlide.attr('data-red');
        var link = $currentSlide.attr('data-link');
        red.removeClass('no-link');
        if (caption) {
          red.html("<p>" + caption + "</p>");
        } else {
          red.hide();
        }
        if (link) {
          red.append(
            $("<a>").attr({
              'href': link,
              'title': 'Learn More'
            }).html("Learn More &raquo;")
          )
        } else {
          red.addClass('no-link');
        }
        SliderMastheadMixins.onStart(slider);
      },
      before: function (slider) {
        var red = $('.rounded-slider').find('.red');
        red.find('a').remove();
        red.find('p').animate({
          opacity: 0
        }, 500);
        SliderMastheadMixins.beforeSlideChange(slider);
      },
      after: function (slider) {
        g_mySlider = slider;
        var currentSlide = slider.slides[slider.currentSlide],
          $currentSlide = $(currentSlide),
          red = $('.rounded-slider').find('.red');
        var caption = $currentSlide.attr('data-red');
        var link = $currentSlide.attr('data-link');
        red.removeClass('no-link');
        if (caption) {
          red.find('p').html(caption);
          red.show('');
        } else {
          red.hide('');
        }
        if (link) {
          red.append(
            $("<a>").attr({
              'href': link,
              'title': 'Learn More'
            }).css('opacity', 0).html("Learn More &raquo;")
          )
        } else {
          red.addClass('no-link');
        }
        red.find('p, a').animate({
          opacity: 1
        }, 500);
        SliderMastheadMixins.afterSlideChange(slider);
      }
    });
  } else {
    $('.flexslider').flexslider({
      animation: "slide",
      touchSwipe: true,
      controlNav: false,
      pauseOnHover: true,
      pauseOnAction: true,
      pausePlay: true,
      randomize: false,
      slideshowSpeed: (function () {
        var setting = $(".slideOptions .speed").text(),
          speed = 10000;
        if (setting > 0) {
          speed = 1000 * setting;
        }
        return speed;
      })(),
      slideToStart: (function () {
        var number = $(".slideOptions .startingSlideNumber").text();
        if (number > 0) {
          return (number - 1);
        } else {
          return 0;
        }
      })(),
      slideshow: (function () {
        var isAuto = $(".slideOptions .autoRotate").text() ? true : false;
        return isAuto;
      })(),
      animationLoop: true,
      start: function (slider) {
        g_mySlider = slider;
        var currentSlide = slider.slides[slider.currentSlide],
          $currentSlide = $(currentSlide);
        $(".flexslider .slides .slide").removeClass("active");
        $currentSlide.addClass("active");
        $(".blockOut").fadeOut();
        $(".slideDescription .centeredContent").html($currentSlide.children(".dataDescription").html());
        if (!$(".slideDescription .centeredContent").html()) {
          $(".slideDescription").addClass("visuallyhidden");
        } else {
          $(".slideDescription").removeClass("visuallyhidden");
        }
      },
      before: function (slider) {
        $(".blockOut").stop().fadeIn();
        $(".slide").stop().fadeTo(250, .2, function () {});
      },
      after: function (slider) {
        var currentSlide = slider.slides[slider.currentSlide],
          $currentSlide = $(currentSlide);
        $(".blockOut").stop().fadeOut("slow");
        $(".slide").stop().fadeTo(500, 1, function () {});
        $(".flexslider .slides .slide").removeClass("active");
        $currentSlide.addClass("active");
        $(".slideDescription .centeredContent").html($currentSlide.children(".dataDescription").html());
        if (!$(".slideDescription .centeredContent").html()) {
          $(".slideDescription").addClass("visuallyhidden");
        } else {
          $(".slideDescription").removeClass("visuallyhidden");
        }
      }
    });
  }
  $(".flex-direction-nav li a").each(function () {});
  $(".flex-direction-nav li a").live("click", function (event) {
    g_mySlider.pause();
    console.log('pausing');
    g_mySlider.resume = function () {};
    console.log('resuming');
  });
  if ($(".miniRotator").length) {
    $(".miniRotatorContainer").jcarousel({
      start: (function () {
        var number = $(".slideOptions .startingSlideNumber").text();
        if (number == "") {
          number = 1;
        }
        return (number * 1);
      })(),
      auto: (function () {
        var speed = 10,
          speedSetting = $(".slideOptions .speed").text(),
          isAuto = $(".slideOptions .autoRotate").text() ? true : false;
        if (isAuto) {
          if (speedSetting > 0) {
            speed = speedSetting;
          }
        } else {
          speed = 0;
        }
        return speed;
      })(),
      scroll: 1,
      wrap: "circular",
      buttonNextHTML: null,
      buttonPrevHTML: null,
      initCallback: function (carousel) {
        carousel.clip.hover(function () {
          carousel.stopAuto();
        }, function () {
          carousel.startAuto();
        });

        function removeMargin() {
          // $('ul.miniRotator.clearfix.jcarousel-list.jcarousel-list-horizontal').css('overflow', 'visible');
          // $('ul.miniRotator.clearfix.jcarousel-list.jcarousel-list-horizontal').css('margin', '0px');
          // $('ul.miniRotator.clearfix.jcarousel-list.jcarousel-list-horizontal').css('left', '0');
        }
        $('.miniRotatorContainer').jcarousel({
          visible: 4,
        });
        $('.miniRotatorNav .next').bind('click', function () {
          carousel.next();
          $('.miniRotatorContainer.asdf.jcarousel-container.jcarousel-container-horizontal').addClass('flexing')
          return true;
        })
        $('.miniRotatorNav .prev').bind('click', function () {
          carousel.prev();
          return true;
        })
      }
    });

    function fast() {
      $('.miniRotatorContainer').jcarousel({
        animation: 500,
      });
    }
    $('a.prev').keydown(function (event) {
      var keyCode = (event.keyCode ? event.keyCode : event.which);
      if (keyCode == 13) {
        fast();
        $('a.prev').trigger('click');
      }
    });
    $('a.next').keydown(function (event) {
      var keyCode = (event.keyCode ? event.keyCode : event.which);
      if (keyCode == 13) {
        fast();
        $('a.next').trigger('click');
      }
    });
  }
});
var boxItemWidth = '-' + $('.jcarousel-list').outerWidth()
$(".miniRotator li").on('keydown', function (e) {
  if (e.shiftKey && e.keyCode === 9) {
    console.log('shift tab')
    var firstSlide = $('.miniRotator .jcarousel-item-1');
    var firstSlideFocus = $('.miniRotator .jcarousel-item-1').is(':focus');
    if ($(firstSlideFocus)) {
      console.log('first item')
      // resetSlideOrder();
    } else if (!$(firstSlideFocus)) {
      $('ul.miniRotator.clearfix.jcarousel-list.jcarousel-list-horizontal').css('left', "'" + boxItemWidth + "!important'")
    }
    $('.jcarousel-clip').focusout(function () {
      // $('.miniRotatorContainer').data('jcarousel').scroll(0);
    });
    defaultSettings();
    return true;
  } else if (e.keyCode === 9) {
    console.log('tab')
    $('ul.miniRotator.clearfix.jcarousel-list.jcarousel-list-horizontal').css('left', "unset")
    defaultSettings();
    return true;
  }
});

function resetSlideOrder() {
  // $('.miniRotatorContainer').data('jcarousel').scroll(0);
}

function defaultSettings() {
  console.log('resetting')
  $('.miniRotatorContainer').jcarousel({
    visible: 4,
    wrap: "circular",
    auto: 1,
    hoverPause: true,
    width: 160,
  })
  resetSlideOrder();
}
$(function () {
  // Trigger next on enter key
  $('a.next').keydown(function (event) {
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == 13) {
      $('a.next').trigger('click');
    }
  });
  // Trigger previous on enter key
  $('a.prev').keydown(function (event) {
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == 13) {
      $('a.prev').trigger('click');
      $('ul.miniRotator.clearfix.jcarousel-list.jcarousel-list-horizontal').css('left', 'unset', 'right', 'unset');
      pauseAutoScroll();
    }
  });

  function pauseAutoScroll() {
    $('.miniRotatorContainer').jcarousel({
      auto: 0,
    })
    console.log('pausing autoscroll')
  }

  function resumeAutoScroll() {
    console.log('resuming auto scroll')
    resetSlideOrder();
    $('.miniRotatorContainer').jcarousel({
      scroll: 1,
    })
    carousel.startAuto();
    // $('a.next').trigger('click');
  }
  // remove margin on shift-tab
  var boxItemWidth = '-' + $('.jcarousel-list').outerWidth()
  $(".miniRotator li").on('keydown', function (e) {
    // Shift tab
    if (e.shiftKey && e.keyCode === 9) {
      console.log('shift tab')
      return true;
    }
    // Tab
    else if (e.keyCode === 9) {
      console.log('tab')
      pauseAutoScroll();
      // return true;
    }
  });

  function defaultSettings() {
    console.log('resetting')
    $('.miniRotatorContainer').jcarousel({
      // visible: 4,
      wrap: "circular",
      auto: 1000,
      hoverPause: true,
    });
  }
  $("a.next").focusin(function () {
    pauseAutoScroll();
  });
  $("a.next").focusout(function () {
    resumeAutoScroll();
    var carousel = $('.miniRotatorContainer').jcarousel
    carousel.startAuto();
  });
  $("a.prev").focusin(function () {
    // resetSlideOrder();
  });
});