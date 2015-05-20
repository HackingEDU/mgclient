var FormRecipient = function(jclass, jcolumn) {
  /* FormRecipient class
   *    @jclass: jQuery of <select>
   *    @jcolumn: jQuery of <select>
   */
  this.form_class  =  jclass;
  this.form_column = jcolumn;
  this.list_class  = [];

  this.addClass    = function(pclass) {
    this.list_class.push(pclass);
  };
  this.activeClass = function(nclass) { };
}

var ParseClass = function(name) {
  this.className   = name;
  this.classFields = [];
  this.json        = {};

  this.init    = function(callback) {
    /* Initialize classFields and json
     *    @callback(fields, json):
     *      fields - list of fieldNames
     *      json   - json object of parse class
     */
    $.ajax("/class", {
      method: "POST",
      data: { "className" : this.className },
      dataType: "json",
      success: function(json) {
        this.json = json;

        // Extract fields
        this.classFields = Object.keys(json[0]); // TODO: exception

        callback(this.json, this.classFields);
      }
    });
  }
}



$(document).ready(function() {

  var form_recipient = new FormRecipient(
    $("#form-recipient-class"), $("#form-recipient-class")
  );

  // Populate form-recipient selections
  $.ajax("/class", {
    method: "GET",
    dataType: "json",
    success: function(data) {
      for(var i = 0; i < data.length; i++) {
        var pclass = new ParseClass(data[i]);
        pclass.init(function(fields, json) {
        });
        form_recipient.addClass(pclass);
        console.log(form_recipient);
      }
    }
  });
  // When updating selection...


  // When submitting form-email...
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

  // Create text input field
  $("#form-email-html").jqte();
});
