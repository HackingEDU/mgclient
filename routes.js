// Routes.js handles all get and post requests
module.exports.index  = function(req, res) {
  res.render( "index", { message: "." } );
};

module.exports.send = function(req, res) {
  var mg = new (require("mailgun").Mailgun);
  var packet = req.body.input; // Data should be a JSON object...

  console.warn(packet);
  res.render(packet);

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
  //mg.sendText(req.body. 
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
