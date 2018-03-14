'use strict';

var _       = require('lodash');
var request = require('request');
var q       = require('q');

/**
 * Facebook module that implement graph api
 *
 * @module Facebook
 * @param {Object} logger Logger instance
 * @param  {Object} config Config of module
 */
var Facebook = function (logger, config) {
  /**
   * Config of provider
   * @type {Object}
   */
  this.config = config;

  /**
   * Logger instance
   * @type {Object}
   */
  this.logger = logger;
};

/**
* Methode to create post on facebook
*
* @param {Object} data the content of the post
* @return {Object} promise of this method
*/
Facebook.prototype.create = function (data) {
  // Create async process
  var deferred  = q.defer();

  // Create uri
  var uri = this.config.url + '/' + this.config.version + '/' + this.config.id + '/feed';

  this.logger.info('[ Facebook.create ] - Send new request to create post to uri : ' + uri +
  ' with data : ' + JSON.stringify(data));

  // Send HTTP Request
  request.post({
    uri : uri,
    qs  : _.merge({
      access_token : this.config.token
    }, data)
  }, function (error, response, body) {
    // Check if has error
    if (error || response.statusCode !== 200) {
      // Reject error
      return deferred.reject(error || body);
    }

    // Success so resolve response
    return deferred.resolve(body);
  });

  // Return result of promise
  return deferred.promise;
};

// Export module
module.exports = function (logger, config) {
  // Return new module
  return new Facebook(logger, config);
};
