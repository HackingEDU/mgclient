var mgkey   = require("./apikeys").mailgun.secretKey;
var Mailgun = new (require("mailgun").Mailgun)(mgkey);
var MailComposer = require("mailcomposer").MailComposer;

module.exports.validateEmail = function(email) {
  /* Validate email address
   *    @email: An email address to check
   */
  //res.status(500).send({ error: "email invalid" });
  return true;
};

module.exports.sendEmail = function (sender, recipients, subject, fhtml, callback) {
  /* Wrapper for Mailgun.sendText function
   *    @sender: Set sender field
   *    @recipients: Set recipients field
   *    @subject: Set subject field
   *    @fhtml: Set html field
   *    @callback(err): Handle response (err is undefined if successful)
   */ 
  var mailcomposer = new MailComposer({
    "keepBcc": true,
    "forceEmbeddedImages": true
  });

  mailcomposer.setMessageOption({
    from: sender,
    to: recipients,
    html: fhtml
  });

  mailcomposer.buildMessage(function(err, messageSource) {
    /* sendRaw(sender, recipients, rawBody, [servername], [callback(err)])
     *   @sender - Sender of the message; this should be a full email address
     *            (e.g. example@example.com)
     *   @recipients - A string (example@example.com) or array of strings
     *            (['a@example.com', 'b@example.com']) of recipients;
     *            these can be email addresses or HTTP URLs.
     *   @rawBody - MIME message to send
     *   @servername - The name of the Mailgun server. If you only have one
     *            server on your Mailgun account, this can be omitted.
     *            Otherwise, it should be set to the server you want to send from.
     *   @callback - Callback to be fired when the email is done being sent.
     *            This should take a single parameter, err, that will be set to
     *            the status code of the API HTTP response code if the email
     *            failed to send; on success, err will be undefined.
     */
    console.log(err || messageSource);

    //Mailgun.sendText(sender, recipients, subject, html, callback);
    Mailgun.sendRaw(sender, recipients, messageSource, callback);
  });

};
