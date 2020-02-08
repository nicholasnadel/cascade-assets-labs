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
          .text("$" + salary + " Median Salary");
      } else {
        try {
          $(this)
            .find(".career-block-widget__salary")
            .text("$" + salaryMedianOver + " Median Salary");
        } catch {
          console.log($(this).prop(salary));
        }
      }
    }
  });
});
