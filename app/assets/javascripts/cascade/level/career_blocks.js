$(function () {
  if ($(".career-block-widget__container").children().length > 1) {
    $(".career-block-widget__container").addClass(
      "career-block-widget__container--3-or-more-items"
    );
  }
  $.each($(".career-block-widget"), function (ind) {
    $(this).attr("id", "career-block-widget__" + parseInt(ind + 1));
    var id = $(this).attr("id");
    var careerCode = $(this)
      .find(".career-block-widget__career-code")
      .text()
      .replace(/\s/g, "");
    var URL =
      "https://services.onetcenter.org/ws/online/occupations/" +
      careerCode +
      "?client=chapman";
    var bindedOnSuccess = onSuccess.bind(this);
    $.ajax({
      type: "GET",
      url: URL,
      data: {
        get_param: "value"
      },
      async: true,
      dataType: "json",
      timeout: 10000,
      success: bindedOnSuccess
    });

    function onSuccess(data) {
      var $this = $(this);
      $this
        .find(".career-block-widget__text")
        .addClass("fadeInUp");
      $this.removeClass("career-block-widget--hidden");
      $this.addClass("career-block-widget--reveal");
      $this
        .find(".career-block-widget__title")
        .text(data.title)
        .addClass("fadeInUp");
      $this
        .find(".career-block-widget__body")
        .text(data.description)
        .addClass("fadeInUp");
      $this
        .find(".career-block-widget__scroll-indicator")
        .addClass("fadeInUp");
      addEllipsis();
      removeEllipsis();
    }
    // salary
    var bindSalary = setSalary.bind(this);
    var URLSalary =
      "https://services.onetcenter.org/ws/mnm/careers/" +
      careerCode +
      "/job_outlook?client=chapman";
    $.ajax({
      type: "GET",
      url: URLSalary,
      data: {
        get_param: "value"
      },
      async: true,
      dataType: "json",
      timeout: 10000,
      success: bindSalary
    });

    function setSalary(data) {
      var salary = data.salary.annual_median;
      var salaryMedianOver = data.salary.annual_median_over;
      var $this = $(this);
      if (typeof salary != "undefined") {
        $this
          .find(".career-block-widget__salary")
          .html(
            '<span class="career-block-widget__bold">' +
            cashmoney.format(salary) +
            "</span>" +
            " Median Salary"
          );
      } else {
        try {
          $this
            .find(".career-block-widget__salary")
            .html(
              '<span class="career-block-widget__bold">' +
              cashmoney.format(salaryMedianOver) +
              "</span>" +
              " Median Salary"
            );
        } finally { }
      }
    }
    var cashmoney = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
  });
});
$(function () {
  scrollHintTutorial();
});

function scrollHintTutorial() {
  var alreadyRanAnimation = true;
  $(".career-block-widget__scroll-indicator").mouseenter(function () {
    if (alreadyRanAnimation) {
      $(".career-block-widget__body").animate({
        scrollTop: 50
      }, 500);
      $(".career-block-widget__body").animate({
        scrollTop: 0
      }, 500);
      // $(".career-block-widget__scroll-indicator").addClass("fadeOut");
      alreadyRanAnimation = false;
    }
  });
}

function addEllipsis() {
  $(".career-block-widget").each(function () {
    $this = $(this).find(".career-block-widget__body");
    if ($this.text().length > 260) {
      $this.addClass("career-block-widget__body--scrollable");
      $this.addClass("career-block-widget__body--line-clamp");
    } else {
      $this.addClass("career-block-widget__body--no-scroll");
    }
  });
}

function removeEllipsis() {
  var overflowText = $(".career-block-widget__body");
  // TODO: improve scroll listener performance if this hack is even needed after widget redesign... a modal/expanding text/something else is probably a more elegant design solution for this recurring overflowing text problem on widgets
  $(overflowText).on("scroll", function () {
    if ($(this).scrollTop() >= 1) {
      $(this).addClass("career-block-widget__body--remove-line-clamp");
    } else {
      $(this).removeClass("career-block-widget__body--remove-line-clamp");
      $(this).addClass("career-block-widget__body--line-clamp");
    }
  });
}