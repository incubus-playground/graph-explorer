require.config({
    baseUrl: '../',
    paths: {
        backbone: 'bower_components/backbone/backbone',
        jquery: 'bower_components/jquery/dist/jquery',
        vis: 'bower_components/vis/dist/vis',
        underscore: 'bower_components/underscore/underscore'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});