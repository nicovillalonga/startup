define(['backbone'], function(Backbone){
    var Movie = Backbone.Model.extend({
         defaults: {
             title: 'blank'
         }
     });
    return Movie;
});