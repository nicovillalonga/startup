define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'text!templates/trendTweets.html'],
function($, _, Backbone, Tweets, templat){

    Trendtweets = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function(trendQ) {
            _.bindAll(this, 'render');
            
            // tendria que ser el query, pero trae el name
            
            console.log('asd');
            var qry = trendQ.trendQuery;
            console.log(qry);
            
            
            
            ///////------- esto no va, es un parche para obtener el trend query -------///////
            
            var trendsList = new Tweets('http://localhost:3000/trends?id=23424747');
            trendsList.fetch({async: false});
            console.log(trendsList);
            var trend = {};
            
            _.each(trendsList.toJSON(), function(tr){
                _.each(tr.trends, function(t){
                    if(t.name == qry){
                        trend = t;
                    }
                })
            });
            
            ///////-------  fin     -------///////
            

            
            this.collection = new Tweets('http://localhost:3000/search?q=' + trend.query);//iria qry
            this.collection.fetch({async: false});
            
            
            
            
            
            ///////-------       -------///////

            
            
            /*var self = this;
                        
            _.each(self.collection.toJSON(), function (trend) {
                _.each(trend, function(tweets){
                    _.each(tweets, function(tweet){
                        if(tweet.id) {
                            console.log(tweet);
                        }
                    });
                });
            });*/
            
            ///////-------       -------///////
            
            
            this.trendQuery = trend.query;
            console.log(trend.query);
            console.log('asd');
            console.log(this.trendQuery);
                        
            this.render();
        },

        template: _.template( templat ),
            
        
        render: function() {
            var query = this.trendQuery;
            this.$el.empty();
            this.$el.html(this.template({trends: this.collection.toJSON(), trendQuery: query}));
        }
    });
    
    return Trendtweets;
});