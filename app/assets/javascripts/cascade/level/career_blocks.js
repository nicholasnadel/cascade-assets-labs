$(function() {
  console.log("ready!");
  if ($(".career-block-widget__container").children().length > 1) {
    $(".career-block-widget__container").addClass(
      "career-block-widget__container--3-or-more-items"
    );
  }

  $.each($(".career-block-widget"), function(ind) {
    $(this).attr("id", "career-block-widget__" + parseInt(ind + 1));
    var id = $(this).attr("id");
    console.log("current id: " + id);
    console.log("this " + id);
    var careerCode = $(this)
      .find(".career-block-widget__career-code")
      .text()
      .replace(/\s/g, "");
    console.log("careerCode " + careerCode);
    var URL =
      "https://services.onetcenter.org/ws/online/occupations/" +
      careerCode +
      "?client=chapman";
    console.log("url: " + URL);

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
      error: function(jqxhr, statustext, err) {
        console.log(id + " error");
        if (jqxhr.status === 422) {
          console.log(JSON.parse(jqxhr.responseText));
        } else if (jqxhr.status) {
          console.log({
            error: "Call to " + url + " failed with error code " + jqxhr.status
          });
        } else if (statustext === "timeout") {
          console.log({
            error: "Call to " + url + " failed with no response from server"
          });
        } else if (err) {
          console.log({
            error: "Call to " + url + " failed with reason: " + err
          });
        } else {
          console.log({
            error: "Call to " + url + " failed with unknown reason"
          });
        }
      },
      success: bindedOnSuccess
    });

    /// ON SUCCESS CALLBACK
    function onSuccess(data) {
      $(this)
        .find(".career-block-widget__text")
        .addClass("fadeInUp");
      $(this).removeClass("career-block-widget--hidden");
      $(this).addClass("career-block-widget--reveal");
      $(this)
        .find(".career-block-widget__title")
        .text(data.title)
        .addClass("fadeInUp");
      $(this)
        .find(".career-block-widget__body")
        .text(data.description)
        .addClass("fadeInUp");
      $(this)
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
      error: function(jqxhr, statustext, err) {
        console.log(id + " error");
        if (jqxhr.status === 422) {
          console.log(JSON.parse(jqxhr.responseText));
        } else if (jqxhr.status) {
          console.log({
            error: "Call to " + url + " failed with error code " + jqxhr.status
          });
        } else if (statustext === "timeout") {
          console.log({
            error: "Call to " + url + " failed with no response from server"
          });
        } else if (err) {
          console.log({
            error: "Call to " + url + " failed with reason: " + err
          });
        } else {
          console.log({
            error: "Call to " + url + " failed with unknown reason"
          });
        }
      },
      success: bindSalary
    });

    /// ON SUCCESS CALLBACK
    function setSalary(data) {
      console.log("salary: " + salary);
      var salary = data.salary.annual_median;
      var salaryMedianOver = data.salary.annual_median_over;

      if (typeof salary != "undefined") {
        $(this)
          .find(".career-block-widget__salary")
          .html(
            '<span class="career-block-widget__bold">' +
              cashmoney.format(salary) +
              "</span>" +
              " Median Salary"
          );
      } else {
        try {
          $(this)
            .find(".career-block-widget__salary")
            .html(
              '<span class="career-block-widget__bold">' +
                cashmoney.format(salaryMedianOver) +
                "</span>" +
                " Median Salary"
            );
        } finally {
          console.log($(this).prop(salary));
        }
      }
    }

    var cashmoney = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
  });
});

$(function() {
  scrollHintTutorial();
});

function scrollHintTutorial() {
  var alreadyRanAnimation = true;

  $(".career-block-widget__scroll-indicator").mouseenter(function() {
    if (alreadyRanAnimation) {
      $(".career-block-widget__body").animate({ scrollTop: 50 }, 500);
      $(".career-block-widget__body").animate({ scrollTop: 0 }, 500);
      // $(".career-block-widget__scroll-indicator").addClass("fadeOut");
      alreadyRanAnimation = false;
    }
  });
}

function addEllipsis() {
  $(".career-block-widget").each(function() {
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
  // TODO: improve really bad performance if this hack is even needed after widget redesign
  $(overflowText).on("scroll", function() {
    if (
      $(this).scrollTop() + $(this).innerHeight() >=
      $(this)[0].scrollHeight
    ) {
      $(this).addClass("career-block-widget__body--remove-line-clamp");
      // $(".career-block-widget__scroll-indicator").addClass("fadeOut");
      console.log("end reached");
    } else {
      $(this).removeClass("career-block-widget__body--remove-line-clamp");
      $(this).addClass("career-block-widget__body--line-clamp");
      console.log("adding line-clamp again");
    }
  });
}
