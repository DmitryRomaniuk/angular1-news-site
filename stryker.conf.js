module.exports = function (config) {
    config.set({
        testRunner: 'karma',
        testFramework: 'jasmine', // <-- add your testFramework here
        karmaConfigFile: 'karma.conf.js', // <-- add your karma.conf.js file here
        mutate: [
            'public/**/*.js' // <-- mark files for mutation here
        ]
    });
}