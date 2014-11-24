require.config({
    
    paths: {
        jquery: 'lib/jquery-2.1.1.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        text: 'lib/text',
//        bootstrap: 'lib/bootstrap.min',
        bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js',
        localStorage: 'lib/backbone.localStorage-min',
        swal: 'lib/sweet-alert.min',
        async: 'lib/async'
    },
    shim: {
        'underscore': {
            deps: [],
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});


require(['jquery', 'backbone', 'routers/router', 'location'], function($, Backbone, Router, Location){
    
    var router = new Router();
    Backbone.history.start();
    
    $('#btnGeo').click(function(){
        var location = new Location();
    });
});