'use strict';

var _      = require('lodash');
var q      = require('q');
var joi    = require('joi');

// Joi rules
const SCHEMA_JOI = {
  // Default load schema
  load : {
    facebook : joi.object().keys({
      id      : joi.string().required().empty(),
      token   : joi.string().required().empty(),
      version : joi.string().optional().default('v2.12'),
      url     : joi.string().optional().default('https://graph.facebook.com')
    })
  },
  create : {
    facebook : joi.object().keys({
      message : joi.string().required().empty()
    }).required()
  }
};

/**
 * Joi schema Module fot object validation
 *
 * @module Schema
 * @param {Object} logger Logger instance
 */
function Schema (logger) {
  /**
  * Default logger instance
  *
  * @property logger
  * @type Object
  */
  this.logger = logger;
}

/**
 * Check if object is conform
 *
 * @param  {Object} data the object to check
 * @param  {Object} name the name of the schema to use
 * @return {Object} promise of this method
 */
Schema.prototype.validate = function (data, name) {
  // Create async process
  var deferred  = q.defer();

  this.logger.debug('[ Schema.validate ] - validate schema for name = ' +
  name);

  // Check if has schema
  if (!_.has(SCHEMA_JOI, name)) {
    // Reject because schema was not found
    deferred.reject('Schema was not found for name ' + name);

    // Return result of promise
    return deferred.promise;
  }

  // Make joi validation
  var result = joi.validate(data, _.get(SCHEMA_JOI, name));

  // Check if joi validation failed
  if (_.isEmpty(result.error)) {
    // Success
    deferred.resolve(result.value);
  } else {
    // Log error
    this.logger.error('[ Schema.validate ] - error when validate schema : < ' +
    name + ' >, more details : ' + result.error);

    // Reject error
    deferred.reject(result.error.toString());
  }

  // Return result of promise
  return deferred.promise;
};

// Export module
module.exports = function (logger) {
  // Return new module
  return new Schema(logger);
};
