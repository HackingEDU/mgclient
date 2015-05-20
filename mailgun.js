var mgkey   = require("./apikeys").mailgun.secretKey;
var Mailgun = new (require("mailgun").Mailgun)(mgkey);

module.exports.validateEmail = function(email) {
  /* Validate email address with regex (low priority)
   *    @email: An email address to check
   */
  //res.status(500).send({ error: "email invalid" });
  return true;
};

module.exports.sendEmail = function (sender, recipients, subject, html, callback) {
  /* Wrapper for Mailgun.sendText function
   * TODO: replace with sendRaw
   *    @sender: Set sender field
   *    @recipients: Set recipients field
   *    @subject: Set subject field
   *    @html: Currently only supports plain text
   *    @callback(err): Handle response (err is undefined if successful)
   */ 
  Mailgun.sendText(sender, recipients, subject, html, callback);
};
