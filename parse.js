// Wrapper module for Parse
var Parse = require("parse").Parse;
Parse.initialize("appID", "jsKey");

var DATASET = "datasets"; // Name of Parse Class containing class names
var DATACOL = "setName";  // Column name containing class names

module.exports.getClassNames = function(callback) {
  /* Queries Parse for fields located in DATASET under DATACOL
   *    @callback(json)
   */

  var cdatasets = Parse.Object.extend(DATASET);
  var qdatasets = new Parse.Query(cdatasets);

  qdatasets.find({
    success: function(res) {
      // Retrieve list of class names
      var retval = [];
      for(var i = 0; i < res.length; i++) {
        retval.push(res[i].get(DATACOL));
      }

      callback(JSON.stringify(retval));
    },
    error: function(err) {
      // Return empty json
      callback({});
    }
  });
};

module.exports.getClass = function(class_name, callback) {
  /* Queries Parse for entire class
   *    @callback(json)
   */
  var cdatasets = Parse.Object.extend(class_name);
  var qdatasets = new Parse.Query(cdatasets);

  qdatasets.find({
    success: function(res) {
      // Retrieve list of class names
      callback(JSON.stringify(res));
    },
    error: function(err) {
      // Return empty json
      callback([{}]);
    }
  });
};
