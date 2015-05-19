var parse   = require("./parse");
var mailgun = require("./mailgun");

// Routes.js handles all get and post requests
module.exports.index  = function(req, res) {
  res.render( "index", { message: "." } );
};

module.exports.send = function(req, res) {
  if(!req.xhr) { // if request is not ajax
    res.status(404).end();
    return;
  }

  var sender     = '';
  var recipients = '';
  var subject    = '';
  var html       = '';

  if(req.body.sender)
    sender     = req.body.sender;
  if(req.body.recipients)
    recipients = req.body.recipients;
  if(req.body.subject)
    subject    = req.body.subject;
  if(req.body.html)
    html       = req.body.html;

  Mailgun.sendText(sender, recipients, subject, html, function(err) {
    // TODO: proper response
    res.send(err);
  });
};

module.exports.receive = function(req, res) { res.status(204).end(); };

module.exports.remove = function(req, res) { res.status(204).end(); };




module.exports.getClassNames = function(req, res) {
  if(!req.xhr) { // if request is not ajax
    res.status(404).end();
    return;
  }

  parse.getClassNames(function(json) {
    res.send(json);
  });
};

module.exports.getClass = function(req, res) {
  if(!req.xhr) { // if request is not ajax
    res.status(404).end();
    return;
  }

  parse.getClass(req.body.className, function(json) {
    res.send(json);
  });
};


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
