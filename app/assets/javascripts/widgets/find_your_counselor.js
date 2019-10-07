$(document).ready( function() {
  $('#find-your-counselor').on('click', function() {
    // debugger
    // var inAnimation = $('.find-counselor-applicant-type').hasClass('inactive-top') ? ''
    $('.find-counselor-intro').addClass('move-out-top inactive-top');
    $('#go-back').removeClass('hidden');
    $('.find-counselor-applicant-type').removeClass('hidden inactive-top position-above move-out-bottom').addClass('active move-in-top');
  });

  $('#domestic-student-type').on('click', function() {
    $('.find-counselor-applicant-type').removeClass('active').addClass('move-out-top inactive-top');
    $('.find-counselor-intro').removeClass('active')
    $('.find-counselor-school').removeClass('hidden inactive-top position-above').addClass('active move-in-top');
  });

  $('#domestic-transfer-student-type').on('click', function() {
    $('.find-counselor-applicant-type').removeClass('active').addClass('move-out-top inactive-top');
    $('.find-counselor-intro').removeClass('active')
    $('.find-counselor-transfer').removeClass('hidden inactive-top position-above').addClass('active move-in-top');
  });

  $('#international-transfer-student-type').on('click', function() {
    $('.find-counselor-applicant-type').removeClass('active').addClass('move-out-top inactive-top');
    $('.find-counselor-intro').removeClass('active')
    $('.find-counselor-international').removeClass('hidden inactive-top position-above').addClass('active move-in-top');
  });

  $('#go-back').on('click',  function() {
    var sectionClasses                = ['find-counselor-intro', 'find-counselor-applicant-type',
                                        'find-counselor-transfer', 'find-counselor-international', 'find-counselor-school'];
    var sectionPostion                = ['inactive-top', 'inactive-bottom'];
    var $currentActiveSectionClasses  = $('.find-counselor-container').find('.active').attr('class').split(' ')
    var currentSection                = null;

    $currentActiveSectionClasses.some( function(cssClass) {
      if (sectionClasses.indexOf(cssClass) > -1) {
        currentSection = cssClass;
        return true;
      }
    });

    switch(currentSection) {
      case 'find-counselor-applicant-type':
          $('.find-counselor-applicant-type').removeClass('active').addClass('move-out-bottom inactive-top');
          $('.find-counselor-intro').removeClass('inactive inactive-top move-out-top').addClass('move-in-bottom active');
          $('#go-back').addClass('hidden');
          break
    }
    // debugger
  });
});