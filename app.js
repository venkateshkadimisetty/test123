var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var VerifyToken = require('./middleware/auth/VerifyToken');

var mongoose = require('mongoose');
require('./models/member')(mongoose);
require('./models/book')(mongoose);
require('./models/bookIssue')(mongoose);
require('./models/bookLog')(mongoose);
require('./models/user')(mongoose);


var http = require('http');
var app = express();
//var config = require('./Config/config.js');
//var mongodb_connection_string = config.MONGO_SERVER_URL;
mongoose.connect("mongodb://lbmanager:idontknow@ds131258.mlab.com:31258/lbmanager");
//mongoose.connect("mongodb://localhost:27017");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    "use strict";
    console.log("mongo connected");
});


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users',VerifyToken);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
