function dismiss() {
  $('div.upgrade-browser-wrapper > a.dismiss, div.upgrade-browser-wrapper span.dismiss, div.upgrade-browser-wrapper label.upgrade-notice, div.upgrade-browser-wrapper label.label-dismiss, div.upgrade-browser-wrapper div.dismiss').click(function () {
    $('div.upgrade-browser-wrapper, #upgrade-browser').css('display', 'none')
  })
}

function localStorageAvailable() {
  if (typeof (Storage) !== "undefined") {
    $('#persistence input').click(function () {
      if ($("#persistence input").is(':checked')) {
        if (localStorageAvailable())
          localStorage.DoNotShowMessageAgain = "true";
      }
    })
    return true;

  } else {
    return false;
  }
}

function cacheDismissal() {
  $('#persistence').click(function () {
    if ($('#persistence').attr('checked')) {
      if (localStorageAvailable())
        localStorage.DoNotShowMessageAgain = "true";
    }
  })
}

function checkPref() {
  if (localStorageAvailable()) {
    if (localStorage.DoNotShowMessageAgain && localStorage.DoNotShowMessageAgain === "true") {
      $('div.upgrade-browser-wrapper, #upgrade-browser').css('display', 'none')
    }
  };
}
$(function () {
  checkPref();
  dismiss();
  cacheDismissal();
});