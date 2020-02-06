$(function() {
  $.ajax({
    type: "GET",
    url:
      "https://services.onetcenter.org/ws/online/occupations/17-2051.00?client=chapman",
    data: { get_param: "value" },
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
    success: function(data) {
      $(".career-block-widget__title").html(
        $("<div>", {
          text: data.title
        })
      );

      $(".career-block-widget__body").html(
        $("<div>", {
          text: data.description
        })
      );

      console.log(data);
    }
  });

  $.ajax({
    type: "GET",
    url:
      "https://services.onetcenter.org/ws/mnm/careers/17-2051.00/job_outlook?client=chapman",
    data: { get_param: "value" },
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
    success: function(data) {
      $(".career-block-widget__bold").html(
        $("<span>", {
          text: formatMoney(data.salary.annual_median)
        })
      );
      console.log(data.salary.annual_median);
    }
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
});
