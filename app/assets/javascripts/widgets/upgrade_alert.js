function dismiss() {
  $('a.dismiss, span.dismiss, div.dismiss, input.dismiss').click(function () {
    $('#upgrade-browser').css('display', 'none')
  })
}

$(function() {
  dismiss();
});

