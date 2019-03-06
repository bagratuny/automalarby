(function() {
  $(".input__confidential-title").on("click", function(e) {
    var checked = document.querySelector(".input__confidential-checkbox").checked;
    checked === false ? (checked = true) : (checked = false);
  });

  $("form").submit(function(e) {
    e.preventDefault();

    var request;

    if (
      $(this)
        .find(".input__name")
        .val() == ""
    ) {
      $(this)
        .find(".input__name")
        .addClass("input--alert");
    } else {
      $(this)
        .find(".input__name")
        .removeClass("input--alert");
    }

    if (
      $(this)
        .find(".input__number")
        .val() == ""
    ) {
      $(this)
        .find(".input__number")
        .addClass("input--alert");
    } else {
      $(this)
        .find(".input__number")
        .removeClass("input--alert");
    }

    if (
      !$(this)
        .find(".input__confidential-checkbox")
        .prop("checked")
    ) {
      $(this)
        .find(".input__confidential")
        .addClass("input__confidential--alert");
    } else {
      $(this)
        .find(".input__confidential")
        .removeClass("input__confidential--alert");
    }

    if (
      !$(this)
        .find(".input__name")
        .val() ||
      !$(this)
        .find(".input__number")
        .val() ||
      !$(this)
        .find(".input__confidential-checkbox")
        .prop("checked")
    ) {
      return;
    }

    if (request) {
      request.abort();
    }

    var $form = $(this);

    var serializedData = $form.serialize();

    request = $.ajax({
      url: "callback.php",
      type: "post",
      data: serializedData
    });

    request.done(function(response, textStatus, jqXHR) {
      alert("Заявка на звонок отправлена");
    });
  });
})();
