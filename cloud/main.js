// Entry point for Cloud Code

var express = require("express");
var app = express();
var routes = require("cloud/routes");

// Global app configuration section
app.set("views", "cloud/views"); // Specify the folder to find templates
app.set("view engine", "jade");  // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// Set up routes
app.get('/index', routes.index);

// Attach the Express app to Cloud Code.
app.listen();
