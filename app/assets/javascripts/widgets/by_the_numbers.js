var byTheNumberscounted = false;
var counterStarted = false;
$(function () {
  checkDisplay();

  $(window).on('resize scroll',
    function () {
      if (counterStarted) return
      checkDisplay();
    });
});

function checkDisplay() {

  $('.counter').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    if( $this.isOnScreen() && !byTheNumberscounted) {
      counterStarted = true;
      $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
      {
        duration: 2500,
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