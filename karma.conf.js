module.exports = function(config) {
    config.set({
  
      basePath: './',
  
      files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'public/*.js',
        // 'view*/**/*.js'
      ],
  
      autoWatch: true,
  
      frameworks: ['jasmine'],
  
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-junit-reporter'
      ],
  
      junitReporter: {
        outputFile: 'test_out/unit.xml',
        suite: 'unit'
      }
  
    });
  };