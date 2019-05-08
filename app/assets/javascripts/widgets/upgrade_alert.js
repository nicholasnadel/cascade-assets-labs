function dismiss() {
  $('div.upgrade-browser-wrapper > a.dismiss, div.upgrade-browser-wrapper span.dismiss, div.upgrade-browser-wrapper label.upgrade-notice').click(function () {
    $('div.upgrade-browser-wrapper, #upgrade-browser').css('display', 'none')
  })
}

$(function() {
  dismiss();
});

