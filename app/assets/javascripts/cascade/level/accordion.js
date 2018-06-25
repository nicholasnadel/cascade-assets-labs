$(function () {
  $(".accordion .content").not(".accordion.active .content").css("display", "none");

	$(".accordion .header").click(function () {
		$(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
  });

  $(".accordion").children(".header").keydown(function(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      
      $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
      return false
    }
  })
});
