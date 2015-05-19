$(document).ready(function() {
  $("#form-email-html").jqte();

  $("#form-email").on('submit', function(ev) {
    ev.preventDefault();

    $.post(
      "/send",
      {
        recipients: $("#form-recipient-post").val(),
        sender: $("#form-email-sender").val(),
        subject: $("#form-email-subject").val(),
        html: $("#form-email-html").val()
      },
      function(res) {
        // res returns 'undefined' on success
      }
    );
  });
});
