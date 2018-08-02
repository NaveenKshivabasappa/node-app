"use strict";
var util = require('util');
var config = require(global.__base + 'config');

var stack_trace_codes = [6,7,8,9,10,15,53,500];

module.exports = function errHandler(err, req, res, next) {
  //TODO: check if err is an error object.

  var code = err.code || 500;
  var title = err.title || "App Error";
  var message = err.details || "An unexpected error has occured";

  var response = {
    status: {
      result: 'failure',
      message: {
        title: title,
        message: message,
      }
    },
    code: code
  };

  req.log.error("[Error] " + ", message " + err.message + ", code" + code+" title : "+title);

  if (config.isProduction) {
    if (stack_trace_codes.indexOf(code) > -1) {
      req.log.error(err.stack.split('\n')); // we only want stack trace if its a 500 error, or we are in dev mode
      if(code == 53)response.status.message.message = 'An unexpected error has occured';
    }
  } else {
    //response.stack = err.stack.split('\n');
    if (stack_trace_codes.indexOf(code) > -1) req.log.error(err.stack.split('\n'));
  }

  if (code == 16) code = 500;
  res.status(400).json(response);
};

// -- Test Code ---------------------------------------------------------
if (require.main === module) {
  (function () {
    var title = 'testing';
    var err = new Error('err testing');
    req.log.info("Error Handler: %s, message: %s, stacktrace: ", title, err && err.message, err && err.stack);
    req.log.info("Vola! Here's your error, Now go Debug :p")
  })();
}
