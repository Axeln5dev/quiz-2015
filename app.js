var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

// Cargamos index.js donde esta la deficnicion de las rutas
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Semilla encriptado'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

/* Variable que se muestra en ell template */
var metadata = require('./package.json');
app.use(function (req, res, next) {
  res.locals = {
    title: metadata.name,
    version: metadata.version
  };
  next();
});

//Helpers dinamicos. Util para almacenar la ultima url antes de perder session
app.use(function(req, res, next) {
  // guardamos el path a redireccionar despues de login y logout
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // hacer visible la sesion en las vistas
  res.locals.session = req.session;
  next();
});


// MW que comprueba el tienmpo de inactividad
app.use(function(req, res, next) {
  var nowInMillis = (new Date).getTime();

  if (req.session.user && (nowInMillis - req.session.user.loginDate) > 120000) {
    delete req.session.user;
    res.redirect('/login');
  }

  next();
});


// Importamos nuestro enrutador
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
