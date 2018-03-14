'use strict';

var expect = require('chai').expect;
var _      = require('lodash');
var logger = require('winston');

// Config for
var config = {
  load : {
    success : [
      {
        provider : 'facebook',
        config   : {
          id    : 'aaa1111aa',
          token : 'bbb11bb'
        }
      }
    ],
    failed : [
      {
        provider : 'facebook',
        config   : {
          id    : true,
          token : 'bbb11bb'
        }
      },
      {
        provider : 'twitter',
        config   : {
          id    : 'aaa1111aa',
          token : 'bbb11bb'
        }
      }
    ]
  }
};

// Test Schema "load"
describe('Test SocialNetworks module', function () {
  // Load
  describe('Test method < load > ', function () {
    // Test With valid value
    it('Test with valid value', function () {

      // Require module
      var socialNetworks = require('../../src/modules/socialnetworks/')(logger);

      // Return to async process
      return socialNetworks.load(config.success).then(function (data) {
        // Success
        expect(data).to.be.an('object');
      }).catch(function (e) { console.log(' --> e : ', e)} );
    });

    // Test with wrong value


    // Test With valid value
    it('Test with wrong value', function () {
      // Require module
      var socialNetworks = require('../../src/modules/socialnetworks/')(logger);
      // Return to async process
      return socialNetworks.load(config.failed).catch(function (data) {
        // Success
        expect(data).to.be.an('string');
      });
    });
  });
});
