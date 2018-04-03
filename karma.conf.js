var path = require('path');
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
        'karma-coverage',
        'karma-coverage-istanbul-reporter',
        'karma-html-reporter',
        'karma-junit-reporter'
      ],
      preprocessors: {
        'src/**/*.js': ['coverage']
      },
      coverageReporter: {
        type : 'html',
        dir : 'karma-coverage/'
      },
      reporters: ['progress', 'coverage', 'html', 'coverage-istanbul'],
      coverageReporter: {
        // specify a common output directory
        dir: 'karma-coverage',
        instrumenterOptions: {
          istanbul: { noCompact: true }
        },
        reporters: [
          // reporters not supporting the `file` property
          { type: 'html', subdir: 'report-html' },
          { type: 'lcov', subdir: 'report-lcov' },
          // reporters supporting the `file` property, use `subdir` to directly
          // output them in the `dir` directory
          { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
          { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
          { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
          { type: 'text', subdir: '.', file: 'text.txt' },
          { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
        ]
      },
      htmlReporter: {
        outputDir: 'karma-html', // where to put the reports  
        templatePath: null, // set if you moved jasmine_template.html 
        focusOnFailures: true, // reports show failures on start 
        namedFiles: false, // name files instead of creating sub-directories 
        pageTitle: null, // page title for reports; browser info by default 
        urlFriendlyName: false, // simply replaces spaces with _ for files/dirs 
        reportName: 'report-summary-filename', // report summary filename; browser info by default 
        
        
        // experimental 
        preserveDescribeNesting: false, // folded suites stay folded  
        foldAll: false, // reports start folded (only with preserveDescribeNesting) 
      },

      junitReporter: {
        outputFile: 'test_out/unit.xml',
        suite: 'unit'
      },

      browserConsoleLogOptions: {level: "DEBUG", format: "%b %T: %m", terminal: true},

      coverageIstanbulReporter: {

        // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
        reports: ['html', 'lcovonly', 'text-summary'],
  
        // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
        dir: path.join(__dirname, 'istanbul-reporter'),
  
        // Combines coverage information from multiple browsers into one report rather than outputting a report
        // for each browser.
        combineBrowserReports: true,
  
        // if using webpack and pre-loaders, work around webpack breaking the source path
        fixWebpackSourcePaths: true,
  
        // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
        skipFilesWithNoCoverage: true,
  
         // Most reporters accept additional config options. You can pass these through the `report-config` option
        'report-config': {
  
          // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
          html: {
            // outputs the report in ./coverage/html
            subdir: 'html'
          }
  
        },
  
         // enforce percentage thresholds
         // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
        thresholds: {
          emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
          global: { // thresholds for all files
            statements: 100,
            lines: 100,
            branches: 100,
            functions: 100
          },
          each: { // thresholds per file
            statements: 100,
            lines: 100,
            branches: 100,
            functions: 100,
            overrides: {
              'baz/component/**/*.js': {
                statements: 98
              }
            }
          }
        }
      }
    });
  };