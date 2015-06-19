process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Require our configured express and mongoose
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server running at http://%s:%s", host, port);
});

module.exports = app;
