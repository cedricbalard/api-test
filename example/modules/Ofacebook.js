'use strict';

var winston = require('winston');
var socialNetworks = require('../../src/modules/socialnetworks/')(winston);

var provider = 'facebook';

// Config module for provider
var configs = [
  {
    name : provider,
    config : {
      id    : process.env.ID_PROVIDER,
      token : process.env.TOKEN_PROVIDER
    }
  }
];

// Post data
var dataToCreate = {
  message : 'New post'
};

// Load config
socialNetworks.load(configs).then(function () {
  // Success so send post
  socialNetworks.create(provider, dataToCreate).then(function (response) {
    // Success create
    winston.info(' Post created, response : ', response);
  }).catch(function (error) {
    // Failed
    winston.error( ' --> Error create post : ' + error);
  });
}).catch(function (error) {
  // Failed
  winston.error( ' --> Error when load module : ' + error);
});
