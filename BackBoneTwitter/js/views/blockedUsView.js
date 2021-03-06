define(['jquery', 'underscore', 'backbone', 'models/blockedUser', 'collections/collectionBlocked', 'text!templates/blockedUsers.html', 'localStorage'],
function($, _, Backbone, Blocked, BlockedUs, templat){

    BlockedUsView = Backbone.View.extend({ 

        el: $('#displayTweets'),
        
        events: {
            'click #addBlock': 'addBlockUser',
            'click #removeBlock': 'removeBlock'
         },

        initialize: function() {            
            _.bindAll(this, 'render');
            
            // instancio una collection de usuarios blocked y le cargo los usuarios que estan en localStorage
            this.collection = new BlockedUs();
            this.collection.add(JSON.parse(localStorage.getItem('blockedUsers') || '[]'));
            this.render();
        },
        
        addBlockUser: function(e){
            
            // instancio un usuario y lo agrego a la lista
            var val = $('#nameUser').val();
            var block = new Blocked({name: val});
            this.collection.add(block);
            // actualizo la localStorage
            localStorage.setItem('blockedUsers', JSON.stringify(this.collection));
            
            this.render();
        },
        
        removeBlock: function(e){
            
            var val = e.target.value;
            if(val)
            {
                //elimina de la collection
                var name = this.collection.findWhere({name: val});
                if(name){
                    this.collection.remove(name);
                }
                
                //elimina de localStorage
                var names = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
                
                var i = names.map(function(x) {
                    return x.name;
                }).indexOf(val);
                names.splice(i, 1);
                localStorage.setItem('blockedUsers', JSON.stringify(names));                
            }
            
            this.render();
        },

        template: _.template( templat ),
        
        render: function() {
            // le paso al template la collection con los usuarios
            this.$el.empty();
            this.$el.html(this.template({blocks: this.collection.toJSON()}));
//            return this;
        }
    });
    
    return BlockedUsView;
});