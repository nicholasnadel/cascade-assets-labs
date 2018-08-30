var byTheNumberscounted = false;
$(function () {
  checkDisplay();

  $(window).on('resize scroll',
    function () {
      checkDisplay();
    });
});

function checkDisplay() {

  $('.counter').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
        debugger
    if( $this.isOnScreen() && !byTheNumberscounted) {
      $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
      {
        duration: 2000,
        easing:'linear',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
          byTheNumberscounted = true;
        }
      });  
    }
  });
}