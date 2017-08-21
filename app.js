var
    express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler');

var app = express();

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(errorhandler());
app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  console.log(err.stack);

  res.status(err.status || 500);

  res.json({'errors': {
    message: err.message,
    error: err
  }});
});


// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// lets start the server...here we go
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
