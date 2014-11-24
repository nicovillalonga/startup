define(['jquery', 'underscore', 'backbone', 'collections/movieCollection', 'views/movieView', 'models/movie'],
function($, _, Backbone, MovieCollection, MovieView, Movie){
    
    var CollectionView = Backbone.View.extend({
    
        el: $('body'),
         events: {
             'click #add': 'insertItem',
         },

        initialize: function () {                    
            var movieCollection = new MovieCollection();            
            this.collection = movieCollection;
            movieCollection.fetch();
            movieCollection.toJSON();
//            this.render();
            this.collection.on("add", this.renderMovie, this);
         },
         insertItem: function (e) {
             newTitle = $('input').val();
             newMovie = new Movie({
                 title: newTitle
             });
             this.collection.add(newMovie);
             newMovie.save();
             console.log(this.collection.length);
         },
         render: function () {
             _.each(this.collection, function (movs) {
                 this.renderMovie(movs);
             }, this);
         },
         renderMovie: function (movs) {
             var movieView = new MovieView({
                 model: movs
             });
             this.$el.append(movieView.render().el);
         }
    });
        return CollectionView;
});