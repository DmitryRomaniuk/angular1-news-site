module.exports = function(config) {
    config.set({
  
      basePath: './',
  
      files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'public/*.js',
        'tests/*.js',
        // 'view*/**/*.js'
      ],

      browsers: ['Chrome'],
  
      autoWatch: true,
  
      frameworks: ['jasmine'],
  
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-junit-reporter'
      ],

      reporters: ['progress', 'coverage'],

      preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        'public/*.js': ['coverage']
      },

      coverageReporter: {
        type : 'html',
        dir : 'coverage/'
      },

      junitReporter: {
        outputFile: 'test_out/unit.xml',
        suite: 'unit'
      }
  
    });
  };