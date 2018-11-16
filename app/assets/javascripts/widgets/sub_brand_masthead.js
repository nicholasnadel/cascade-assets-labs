// $(document).ready(function() {
//     var trigger = $('.dropbtn');
//     var list = $('.dropdown-content');
//     var highlighted;

//     var highlight = function(i) {
//         highlighted = $(i);
//         highlighted.addClass('selected').siblings('.selected').removeClass('selected');
//     };

//     trigger.on('click', function() {
//         // trigger.toggleClass('active');
//         list.slideToggle(200);
//     });

//     $('.dropdown-content li').on('hover', function() {
//         highlight(this);
//     });

//     $(document).on('click', function(event) {
//         if (trigger[0] !== event.target && !list.has(event.target).length) {
//             list.slideUp(200);
//         }
//     });
// });

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownToggle() {
  document.getElementById("mastheadDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropdown-inner')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
