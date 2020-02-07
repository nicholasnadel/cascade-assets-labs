$(function() {
  console.log("ready!");
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
    /// ON SUCCESS CALLBACK
    function onSuccess(data) {
 
      //  $(this)
      //   .find(".career-block-widget__text").addClass('fadeInUp');
      $(this).removeClass('career-block-widget--hidden');
      $(this).addClass('career-block-widget--reveal');
      $(this)
        .find(".career-block-widget__title")
        .text(data.title).addClass('fadeInUp');
      $(this)
        .find(".career-block-widget__body")
        .text(data.description).addClass('fadeInUp');
      

             
    }
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
        console.log(id + ' error');
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
    }); // SALARY
    // ON SUCCESS CALLBACK
    function onSalarySuccess(data) {
      var salary = formatMoney(data.salary.annual_median, 0);
      $(".career-block-widget__salary").text("$" + salary + " Median Salary");
      console.log(data);
    }
    var URLSalary =
      "https://services.onetcenter.org/ws/mnm/careers/" +
      careerCode +
      "/job_outlook?client=chapman";
    var salaryonSalarySuccess = onSalarySuccess.bind(this);
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
      success: salaryonSalarySuccess
    });
  });
  function formatMoney(number, decPlaces, decSep, thouSep) {
    (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
      (decSep = typeof decSep === "undefined" ? "." : decSep);
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(
      parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
    );
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      sign +
      (j ? i.substr(0, j) + thouSep : "") +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
      (decPlaces
        ? decSep +
          Math.abs(number - i)
            .toFixed(decPlaces)
            .slice(2)
        : "")
    );
  }
  document.getElementById("b").addEventListener("click", event => {
    document.getElementById("x").innerText =
      "Result was: " + formatMoney(document.getElementById("d").value);
  });

  function addErrorClass() {
            $(this).addClass('career-block-widget--ajax-error');
  }
});
