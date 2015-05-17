/*
 * Mailgun API Module
 */

// Module Globals
var API_URL = "https://api.mailgun.net/v3";
var MSG_ENCODING = "multipart/form-data";

var API_KEY;
var URL_DOMAIN;

module.exports.Packet = function (json) {
  /* Packet class
   * Used for create an HTTP packet for sending
   *    @json: (optional)
   */

  // Public
  this.json = json;
  if(json === undefined) {
    this.json = {
      'recipients'          : '',
      'sender'              : '',
      'from'                : '',
      'subject'             : '',
      'body-plain'          : '',
      'stripped-text'       : '',
      'stripped-signature'  : '',
      'body-html'           : '',
      'stripped-html'       : '',
      'attachments'         : '',
      'message-url'         : '',
      'content-id-map'      : '',
      'message-headers'     : ''
    };
  }

  // Methods
  this.setRecipient = function(email) { };
  this.setSender    = function(email) { };
  this.setFrom      = function(email) { };
  this.setSubject   = function(sub)   { };
  this.setBodyHTML  = function(html)  { };

  this.attach = function(file) { };  // low priority
  this.inline = function(image) { }; // low priority
};




// Module methods
module.exports.initialize = function(domain_name, api_key) {
  /* initialize(domain_name, api_key)
   * Sets global variables for this module
   *    @domain_name: url for the mailgun account you want to use
   *                  leave blank if you want to use your account's
   *                  default domain
   *    @api_key    : mailgun secret API key
   *                  Located at https://mailgun.com/app/dashboard
   */
};

module.exports.error = function(code) {
  /* error(code)
   * Logs a status error based on the code given
   *    @code: HTTP error codes (200, 400, 401, 402, 404, 500, 502, 503, 504)
   *
   * Returns: true or false depending on error code
   */
};


module.exports.send = function(packet, callback) {
  /* Send emails to recipients in packet with body
   *    @packet: Packet object you want to send
   *    @callback: function to handle response
   */
};

module.exports.receive = function(url, callback) {
  /* Retrieve an inbound stored message
   *    @url: location of message
   *          (e.g. api.mailgun.net/v3/messages/WyJhOTM4NDk1ODA3Iiw)
   *    @callback: function to handle response
   *
   * Returns: a Packet object
   */
};

module.exports.remove = function(url, callback) {
  /* Removes a stored message
   *    @url: location of message
   *          (e.g. api.mailgun.net/v3/messages/WyJhOTM4NDk1ODA3Iiw)
   *    @callback: function to handle response
   */
};
