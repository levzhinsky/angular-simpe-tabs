module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      // libs
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // directives
      'dist/simple-tabs.js',

      // tests
      './test/*.js'
    ],

    autoWatch: true,
    browsers: ['Chrome']
  });
};