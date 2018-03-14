'use strict';

module.exports = function (grunt) {
  // init config
  grunt.initConfig({
    // default package
    pkg       : grunt.file.readJSON('package.json'),
    // hint our app
    yoctohint : {
      json : [
        'package.json'
      ],
      node : [
        'src/***'
      ],
      options : {
        compatibility : false
      }
    },
    // unit testing
    mochaTest : {
      // Test all unit test
      all  : {
        options : {
          reporter : 'spec',
        },
        src     : [ 'test/*.js' ]
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('yocto-hint');

  grunt.registerTask('hint', 'yoctohint');
  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('default', 'hint');
};
