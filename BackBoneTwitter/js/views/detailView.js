define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'text!templates/detailTweet.html'],
function($, _, Backbone, Tweets, templat){

    DetailView = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function(idTw) {
            _.bindAll(this, 'render');            
            
            var tweets = new Tweets('http://localhost:3000/timeline?count=50');
            tweets.fetch({async: false});
            console.log(tweets);
                        
            var idTweet = idTw.idTweet;
            console.log(idTweet);
            
            var detailTweet = {};
            _.each(tweets.toJSON(), function(tweet){
                if(tweet.id == idTweet){
                    detailTweet = tweet;
                    console.log(detailTweet);
                }
            });
            
            this.detailTweet = detailTweet;
            console.log(this.detailTweet);
            
            this.render();
        },

        template: _.template( templat ),

        render: function() {
            this.$el.empty();
            $(this.el).html(this.template({tweet: this.detailTweet}));
        }
    });
    
    return DetailView;
});