require.config({
    paths: {
        jquery: 'lib/jquery-2.1.1.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        text: 'lib/text',
        localStorage: 'lib/backbone.localStorage-min'
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


require(['views/collectionView'], function(CollectionView){
    
    var collectionView = new CollectionView();
    
//    movie.set({titulo: 'el titulo'});
//    console.log('la pelicula: ' + movie.get('titulo'));
});