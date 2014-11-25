define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'text!templates/trendTweets.html'],
function($, _, Backbone, Tweets, templat){

    Trendtweets = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function(trendQ) {
            _.bindAll(this, 'render');
            
            // tendria que ser el query, pero trae el name            
            console.log('asd');
            var qry = trendQ.trendQuery;
            
            
            
            ///////------- esto no va, es un parche para obtener el trend query -------///////
            
            var trendsList = new Tweets('http://localhost:3000/trends?id=23424747');
            trendsList.fetch({async: false});
            
            var trend = {};
            
            
            _.each(trendsList.toJSON(), function(tr){
                _.each(tr.trends, function(t){
                    if(t.name == qry){
                        trend = t;
                    }
                })
            });
            
            ///////-------  fin     -------///////


            // instancio una collection con url del trend, asi trae los tweets de esa trend
            this.collection = new Tweets('http://localhost:3000/search?q=' + trend.query);//iria qry
            this.collection.fetch({async: false});
            
            this.trendQuery = trend.query;
                        
            this.render();
        },

        template: _.template( templat ),
            
        
        render: function() {
            // le paso al template la collection que tiene los tweets de la trend y la query de la trend para poder hacer el link a un detailTrend
            this.$el.empty();
            this.$el.html(this.template({trends: this.collection.toJSON(), trendQuery: this.trendQuery}));
        }
    });
    
    return Trendtweets;
});