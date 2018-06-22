$(function () {

	/* Left Nav 
  ------------------------------------------------------------------------------------------------*/

  $(".leftNav>ul>li:not(.active)>ul")
    .prev("a")
    .children(".plus")
    .css("visibility", "visible");

  $(".leftNav .plus").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("open").parent("a").toggleClass("is-open").siblings("ul").slideToggle().toggleClass("is-open");
  });

  $(".leftNav .plus").keydown(function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      $(this).toggleClass("open").parent("a").toggleClass("is-open").siblings("ul").slideToggle().toggleClass("is-open");
      return false
    }
    return true
  });

  $(".leftNav ul li .show, .leftNav ul li .hide").click(function () {
    $(this).parent("li").toggleClass("active");
  });

  $(".leftNav").on("click", ".newbutton a", function () {
    recordOutboundLink($(this)[0], "Outbound-link_" + document.title.replace(" | Chapman University", ''), $(this).attr("href"), $(this).text());     
  });

});