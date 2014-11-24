define(['jquery', 'underscore', 'backbone', 'collections/collectionTweet', 'collections/collectionBlocked', 'text!templates/tweets.html'],
function($, _, Backbone, Tweets, BlockedUs, templat){

    TimelineView = Backbone.View.extend({ 

        el: $('#displayTweets'),

        initialize: function() {
            _.bindAll(this, 'render');
            
            this.collection = new Tweets('http://localhost:3000/timeline?count=50');
            this.collection.fetch({async: false});
            
            var blockedUsers = new BlockedUs();
            blockedUsers.add(JSON.parse(localStorage.getItem('blockedUsers') || '[]'));

            var self = this;
            
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
            this.$el.empty();
            this.$el.html(this.template({tweets: this.collection.toJSON()}));
        }
    });
    
    return TimelineView;
});