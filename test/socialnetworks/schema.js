'use strict';

var expect = require('chai').expect;
var _      = require('lodash');
var logger = require('winston');
var schema = require('../../src/modules/socialnetworks/schema')(logger);

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
      },
      {}
    ]
  },
  createPost : {
    success : [
      {
        provider : 'facebook',
        data     : {
          message : 'New post fb'
        }
      }
    ],
    failed : [
      {
        provider : 'facebook',
        data     : {
          message : true
        }
      }
    ]
  }
};

// Test Schema "load"
describe('Test SocialNetworks.Schema module', function () {

  describe('Test schema < load > ', function () {
    // Check each valids config
    _.each(config.load.success, function (c) {
        // test
        it('Test for provider < ' + c.provider + ' >  with valid value', function () {
        // Return to async process
        return schema.validate(c.config, 'load.' + c.provider).then(function (data) {
          // Success
          expect(data).to.be.an('object');
        });
      });
    });

    // Check each wrong config
    _.each(config.load.failed, function (c) {
        // test
        it('Test for provider < ' + c.provider + ' > with wrong value', function () {
        // Return to async process
        return schema.validate(c.config, 'load.' + c.provider).catch(function (data) {
          // Success
          expect(data).to.be.an('string');
        });
      });
    });
  });

  // Test Schema create
  describe('Test schema < create > ', function () {
    // Check each valids config
    _.each(config.createPost.success, function (c) {
        // test
        it('Test for provider < ' + c.provider + ' >  with valid value', function () {
        // Return to async process
        return schema.validate(c.data, 'create.' + c.provider).then(function (data) {
          // Success
          expect(data).to.be.an('object');
        });
      });
    });

    // Check each wrong config
    _.each(config.createPost.failed, function (c) {
        // test
        it('Test for provider < ' + c.provider + ' > with wrong value', function () {
        // Return to async process
        return schema.validate(c.data, 'create.' + c.provider).catch(function (data) {
          // Success
          expect(data).to.be.an('string');
        });
      });
    });
  });
});
