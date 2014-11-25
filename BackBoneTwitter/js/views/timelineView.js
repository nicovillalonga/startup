define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'collections/collectionBlocked', 'text!templates/tweets.html'],
function($, _, Backbone, Tweets, BlockedUs, templat){

    TimelineView = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function() {
            _.bindAll(this, 'render');
            
            // recupero los tweets grales, con count 50 asi no es tan pesado
            this.collection = new Tweets('http://localhost:3000/timeline?count=50');
            this.collection.fetch({async: false});
            
            // instancio una collection de usuarios blocked y le cargo los usuarios que estan en localStorage
            var blockedUsers = new BlockedUs();
            blockedUsers.add(JSON.parse(localStorage.getItem('blockedUsers') || '[]'));

            // guardo la referencia this para poder usar dentro del each
            var self = this;
            // recorro el array usuarios block y por cada usuario voy borrando los tweets que le pertenecen
            _.each(blockedUsers.toJSON(), function(block){
                _.each(self.collection.toJSON(), function(tweet){
                    if(tweet.user.name == block.name){
                        self.collection.remove(self.collection.get({'id': tweet.id}));
                    }
                })
            });
            
            this.render();
        },

        template: _.template( templat ),

        render: function() {
            // le paso al template la collection con los tweets ya filtrados
            this.$el.empty();
            this.$el.html(this.template({tweets: this.collection.toJSON()}));
        }
    });
    
    return TimelineView;
});