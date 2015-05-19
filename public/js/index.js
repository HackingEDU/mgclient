$(document).ready(function() {
  $("#form-email-input").jqte();

  $("#form-email").on('submit', function(ev) {
    ev.preventDefault();

    $.post(
      "/send",
      {
        input: $("#form-email-input").val()
      },
      function(res) {
        // Function callback
        console.log(res);
      }
    );
  });
});
