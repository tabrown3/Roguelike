// Karma configuration
// Generated on Thu Jul 27 2017 21:07:03 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['systemjs', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      //'node_modules/systemjs/dist/system.js',
      //'systemjs.config.js',
      //{ pattern: 'test/*.test.js', included: false, watched: false, served: true },
      //{ pattern: 'test/*.test.ts', included: false, watched: false, served: true },
      //{ pattern: 'test/*.map', included: false, watched: false, served: true },
      //'test/systemjs.bootstrap.js'
      'test/main.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: { '**/!(*.d).ts': ['typescript'] },
    preprocessors: {  },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    systemjs: {

      // Path to your SystemJS configuration file
      configFile: 'systemjs.config.js',

      // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries.
      serveFiles: [
        'test/**/*.test.js',
        'test/**/*.test.ts',
        'test/**/*.map',
        'src/**/*.js',
        'src/**/*.ts',
        'src/**/*.map'
      ],

      // SystemJS configuration specifically for tests, added after your config file.
      // Good for adding test libraries and mock modules
      config: {
        paths: {
        }
      }
    }
  })
}
