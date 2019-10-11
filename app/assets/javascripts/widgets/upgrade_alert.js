
if ((navigator.appVersion.indexOf("MSIE 9.") !== -1) || !(CSS.supports("display: grid"))) {
// if ((IElt10) || !(CSS.supports("display: grid"))) {

  var $buoop = {
    required: {
      e: -8,
      f: -6,
      o: -3,
      s: -1,
      c: -4
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




