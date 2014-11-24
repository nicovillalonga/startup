define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'text!templates/detailTweet.html'],
function($, _, Backbone, Tweets, templat){

    DetailTrend = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function(data) {
            _.bindAll(this, 'render');            
            
            var idTweet = data.idTweet;  
            var trendQuery = data.trendQuery;
            console.log(idTweet);
            console.log(trendQuery);
            
            
            ///////------- lo mismo que terndTweets no va, es un parche para obtener el trend query -------///////
            
            var trendsList = new Tweets('http://localhost:3000/trends?id=23424747');
            trendsList.fetch({async: false});
            console.log(trendsList);
            var trend = {};
            
            _.each(trendsList.toJSON(), function(tr){
                _.each(tr.trends, function(t){
                    if(t.name == trendQuery){
                        trend = t;
                    }
                })
            });
            
            ///////-------  fin     -------///////
            
            
            var tweets = new Tweets('http://localhost:3000/search?q=' + trend.query);
            tweets.fetch({async: false});
            console.log(tweets);
            
            this.detailTweet = {};
            var self = this;
            
            _.each(tweets.toJSON(), function(tweet){
                if(tweet.id == idTweet){
                    self.detailTweet = tweet;
                    console.log(detailTweet);
                }
            });
            
            console.log(this.detailTweet);
            
            this.render();
        },

        template: _.template( templat ),

        render: function() {
            var self = this;
            this.$el.empty();
            $(this.el).html(this.template({tweet: self.detailTweet}));
        }
    });
    
    return DetailTrend;
});