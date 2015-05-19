// Routes.js handles all get and post requests
module.exports.index  = function(req, res) {
  res.render( "index", { message: "." } );
};

module.exports.send = function(req, res) {
  if(!req.xhr) { // if request is not ajax
    res.status(404).end();
    return;
  }

  var mg = new (require("mailgun").Mailgun)("key-eaf8a2206a04906b26355253061d2e34");
  var packet = req.body.data; // Data should be a JSON string...

  var sender     = 'dook@stardust.red';
  var recipients = 'dook@stardust.red';
  var subject    = 'Subject';
  var html       = 'Some <b>awesome</b> html';

  if(req.body.sender)
    sender     = req.body.sender;
  if(req.body.recipients)
    recipients = req.body.recipients;
  if(req.body.subject)
    subject    = req.body.subject;
  if(req.body.html)
    html       = req.body.html;

  function validateEmail(email) {
    /* Validate email address with regex
     * TODO
     *    @email: An email address to check
     */
    //res.status(500).send({ error: "email invalid" });
    return true;
  }

  // TODO: replace with sendRaw
  // sendText(sender, recipients, subject, text,
  //          [servername=''], [options={}], [callback(err)])
  mg.sendText(sender, recipients, subject, html, function(err) {
    res.send(err);
  });
};

module.exports.receive = function(req, res) { res.status(204).end(); };

module.exports.remove = function(req, res) { res.status(204).end(); };

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });
