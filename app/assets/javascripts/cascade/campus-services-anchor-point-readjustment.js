$('a').click(function(){    
  divId = $(this).attr('href');
   $('html, body').animate({
    scrollTop: $(divId).offset().top - 65
  }, 100);
});