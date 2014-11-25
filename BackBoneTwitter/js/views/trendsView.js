define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'text!templates/trendsList.html'],
function($, _, Backbone, Tweets, templat){

    TrendsView = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function() {
            _.bindAll(this, 'render');
            
            // instancio collection con las trends de Arg
            this.collection = new Tweets('http://localhost:3000/trends?id=23424747');
            this.collection.fetch({async: false});
            
            this.render();
        },

        template: _.template( templat ),
            
        
        render: function() {
            // le paso al template la collection con las trends
            this.$el.empty();
            this.$el.html(this.template({trendss: this.collection.toJSON()}));
        }
    });
    
    return TrendsView;
});