const util = require('util');

function ExpectedError(message = 'Some expected error') {
  this.name = 'ExpectedError';
  this.message = message;

  Error.captureStackTrace(this, ExpectedError);
}

util.inherits(ExpectedError, Error);

exports.ExpectedError = ExpectedError;
