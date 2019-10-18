


if ((navigator.appVersion.indexOf("MSIE ") !== -1) || !(CSS.supports("display: grid"))) {
  // $('.noscript').css('display', 'block');
  var $buoop = {
    required: {
      i: 11,
      e: 15,
      f: 52,
      o: 44,
      s: 10.1,
      c: 57
    },
    insecure: true,
    test: false,
    api: 2019.10,
    url: "https://www.chapman.edu/upgrade-browser.aspx",
  };

  function $buo_f() {
    var e = document.createElement("script");
    e.src = "//browser-update.org/update.min.js";
    document.body.appendChild(e);
  };
  try {
    document.addEventListener("DOMContentLoaded", $buo_f, false)
  } catch (e) {
    window.attachEvent("onload", $buo_f)
  }
}






var isIE10OrBelow = function()
{
   return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 11;
}
