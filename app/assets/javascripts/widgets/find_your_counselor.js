$(document).ready( function() {
  $('#find-your-counselor').on('click', function() {
    // debugger
    $('.find-counselor-intro').addClass('move-out-top inactive-top');
    $('#go-back').removeClass('hidden');
    $('.find-counselor-applicant-type').removeClass('hidden inactive-top position-above').addClass('active move-in-top');
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

    $currentActiveSection.some( function(cssClass) {
      if (sectionClasses.indexOf(cssClass) > -1) {
        currentSection = cssClass;
        return true;
      }
    });

  });
});