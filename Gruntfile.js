
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.config.js',
                autoWatch: false,
                singleRun: true
            }
        }
    });

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['requirejs']);
    grunt.registerTask('default', ['test', 'build']);
};