'use strict';

var _       = require('lodash');
var Q       = require('q');
var async   = require('async');

/**
* SocialNetworks module to create post
*
* @module SocialNetworks
* @param {Object} logger Logger instance
*/
function SocialNetworks (logger) {
  /**
   * Will contain configs
   */
  this.configs = [];

  /**
   * Logger  instance
   */
  this.logger = logger;

  // Require module schema
  this.schema = require('./schema')(this.logger);

  /**
   * Will contains all provider configured
   */
  this.providers = [];
}

/**
 * Method that load config for this module
 *
 * @param  {Array} configs Configs of all provider
 * @return {Object} promise of this method
 */
SocialNetworks.prototype.load = function (configs) {
  // Create async process
  var deferred  = Q.defer();

  // Check if has config
  if (_.isUndefined(configs) || _.isEmpty(configs)) {
    // 0 config found
    deferred.reject('[ SocialNetworks.load ] - configs are empty so module was not loaded');

    // Return result of control flow
    return deferred.promise;
  }

  // Control flow to validate each provider config
  async.each(configs, function (c, next) {
    // Validate config
    this.schema.validate(c.config, 'load.' + c.name).then(function (value) {
      // Log
      this.logger.info('[ SocialNetworks.load ] - provider ' + c.name + ' was correctly' +
      'configured');

      // Add provider
      this.providers.push({
        name   : c.name,
        module : require('./providers/' + c.name + '.js')(this.logger, value)
      });

      // Success so continue to next provider
      next();
    }.bind(this)).catch(function (error) {
      // Log
      this.logger.error('[ SocialNetworks.load ] - error when check config, more details : ' +
      error);

      // Failed, so break control flow
      next(error);
    }.bind(this));
  }.bind(this), function (error) {
    // Check if has error
    if (error) {
      // Reject error
      return deferred.reject(error);
    }

    // Success config
    return deferred.resolve(true);
  });

  // Return result of control flow
  return deferred.promise;
};

/**
 * Create a post/tweet etc.
 * @param  {String} providerName name of the socialnetworks
 * @param  {Object} options options to create
 * @return {Object} promise of this method
 */
SocialNetworks.prototype.create = function (providerName, options) {
  // Create async process
  var deferred  = Q.defer();

  // Try to retrieve provider
  var provider = _.find(this.providers, {
    name : providerName
  });

  // Will contain response
  var response = {};

  // Syncrhone Control flow to handle create process
  async.series([
    // Check if has provider
    function (done) {
      // Check if found and enabled
      if (_.isUndefined(provider)) {
        // Not found so break control flow
        return done('provider not found for name : ' + providerName);
      }

      // Next step
      return done();
    },

    // Check schema of object to create action
    function (done) {
      // Validate schema
      this.schema.validate(options, 'create.' + providerName).then(function (value) {
        // Reassign options to get Default value of Joi
        options = value;

        // Next step
        done();
      }).catch(function (error) {
        // Validation Failed
        done(error);
      });
    }.bind(this),

    // Create post
    function (done) {
      // Create post/tweet
      provider.module.create(options).then(function (value) {
        // Set response
        response = value;

        // Next step
        done();
      }).catch(function (error) {
        // Create failed
        done(error);
      });
    }
  ], function (error) {
    // Check if has error
    if (error) {
      // Log
      this.logger.error('[ SocialNetworks.create ] - ' + error);

      // Reject error
      return deferred.reject(error);
    }

    // Resolve response
    return deferred.resolve(response);
  }.bind(this));

  // Return result of control flow
  return deferred.promise;
};

// Export module
module.exports = function (logger) {
  // Return new module
  return new SocialNetworks(logger);
};
