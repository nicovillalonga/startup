define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'text!templates/detailTweet.html'],
function($, _, Backbone, Tweets, templat){

    DetailTrend = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function(data) {
            _.bindAll(this, 'render');            
                        
            // recupero el id del tweet y el query del trend que quiero mostrar, vienen por routes
            var idTweet = data.idTweet;
            // tendria que ser trend query pero trae el ternd name!
            var trendQuery = data.trendQuery;
            
            
            ///////------- lo mismo que terndTweets no va, es un parche para obtener el trend query -------///////
            
            var trendsList = new Tweets('http://localhost:3000/trends?id=23424747');
            trendsList.fetch({async: false});
            var trend = {};
            
            _.each(trendsList.toJSON(), function(tr){
                _.each(tr.trends, function(t){
                    if(t.name == trendQuery){
                        trend = t;
                    }
                })
            });
            
            ///////-------  fin     -------///////
            
            
            
            // recupero los tweets de la trend que me pasa routes
            var tweets = new Tweets('http://localhost:3000/search?q=' + trend.query);
            tweets.fetch({async: false});
            
            //recupero el tweet de los trends con el id que se pasa.
            //es undefined porque el fetch trae 15 tweets, para cuando se busca ya se actualizaron y no esta mas en esos 15!
            var detailTweet = tweets.get(idTweet);                        
            
            this.render();
        },

        template: _.template( templat ),

        render: function() {
            // le paso al template el tweet a mostrar
            var self = this;
            this.$el.empty();
            $(this.el).html(this.template({tweet: self.detailTweet}));
        }
    });
    
    return DetailTrend;
});