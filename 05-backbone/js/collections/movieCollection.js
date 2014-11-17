define(['backbone', 'models/movie', 'localStorage'], function(Backbone, Movie){
    var MovieCollection = Backbone.Collection.extend({
         model: Movie,
         localStorage: new Backbone.LocalStorage("movieStore")
     });
    return MovieCollection;
});