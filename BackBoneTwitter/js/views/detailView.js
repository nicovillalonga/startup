define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'text!templates/detailTweet.html'],
function($, _, Backbone, Tweets, templat){

    DetailView = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function(idTw) {
            _.bindAll(this, 'render');            
            
            // recupero los tweets grales
            var tweets = new Tweets('http://localhost:3000/timeline?count=50');
            tweets.fetch({async: false});
                        
            // guardo el id del tweet que quiero mostrar, que viene por routes. recupero el tweet con el id
            var idTweet = idTw.idTweet;
            this.detailTweet = tweets.get(idTweet);
            
            this.render();
        },

        template: _.template( templat ),

        render: function() {
            // le paso al template el tweet
            this.$el.empty();
            var tweet = self.detailTweet;
            
            $(this.el).html(this.template({tweet: this.detailTweet}));
        }
    });
    
    return DetailView;
});