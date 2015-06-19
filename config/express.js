var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');


module.exports = function(){
  var app = express();

  // Use logger in development and compression in prod
  if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  }
  else if(process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  // Legacy support for put/delete
  app.use(methodOverride());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  // Set up renderer
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  // Routes for index app
  require('../app/routes/index.js')(app);
  // User routes
  require('../app/routes/users.js')(app);

  // Set up the static path
  app.use(express.static('./public'));

  return app;
}
