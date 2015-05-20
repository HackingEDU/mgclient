var FormRecipient = function(jclass, jcolumn) {
  /* FormRecipient class
   *    @jclass: jQuery of <select>
   *    @jcolumn: jQuery of <select>
   */
  this.form_class  =  jclass;
  this.form_column = jcolumn;
  this.active_class = "";
  this.classes     = {};

  this.addClass    = function(pclass) {
    /* Adds this class into selectable classes
     */
    this.classes[pclass.className] = pclass;
    this.form_class.append("<option>" + pclass.className + "</option>");
  };

  this.switchClass = function(name) {
    /* Reset form_column to new class
     *    @name: name of class as string
     */
    var pclass = this.classes[name];
    this.active_class = name;

    this.form_column.empty();
    for(var i = 0; i < pclass.classFields.length; i++) {
      this.form_column.append(
        "<option>" + pclass.classFields[i] + "</option>"
      );
    }
  };
}

var ParseClass = function(name) {
  this.className   = name;
  this.classFields = [];
  this.json        = {};

  this.init    = function() {
    /* Initialize classFields and json
     *    @callback(fields, json):
     *      fields - list of fieldNames
     *      json   - json object of parse class
     */

    var _this = this; // In order to keep scope, we have to reassign 'this'

    $.ajax("/class", {
      method: "POST",
      data: { "className" : _this.className },
      dataType: "json",
      success: function(json) {
        // The "this" in this scope refers to the jQuery object
        _this.json = json;

        // Extract fields
        _this.classFields = Object.keys(json[0]); // TODO: exception
      }
    });
  }

  this.getColumn = function(name) {
    // Return column as comma-seperated strings
    var retval = [];

    // TODO: check if column name exists
    for(var i = 0; i < this.json.length; i++) {
      retval.push(this.json[i][name]);
    }
    retval = retval.join(",");

    return retval;
  };
}



$(document).ready(function() {

  var form_recipient = new FormRecipient(
    $("#form-recipient-class"), $("#form-recipient-column")
  );

  // Populate form-recipient selections
  $.ajax("/class", {
    method: "GET",
    dataType: "json",
    success: function(data) {
      for(var i = 0; i < data.length; i++) {
        var pclass = new ParseClass(data[i]);
        pclass.init();
        form_recipient.addClass(pclass);
      }
    }
  });
  // When updating selection...
  form_recipient.form_class.on("change", function() {
    form_recipient.switchClass( $(this).val() );
  });


  // When submitting form-email...
  $("#form-email").on('submit', function(ev) {
    ev.preventDefault();

    $.post(
      "/send",
      {
        recipients: (function(fc) {
          var pc = fc.classes[fc.active_class];
          console.log( pc.getColumn(fc.form_column.val()) );
          return pc.getColumn(fc.form_column.val());
        }(form_recipient)),
        sender: $("#form-email-sender").val(),
        subject: $("#form-email-subject").val(),
        html: $("#form-email-html").val()
      },
      function(res) {
        // res returns 'undefined' on success
        // Don't do anything with it

      }
    );
  });

  // Create text input field
  $("#form-email-html").jqte();
});
