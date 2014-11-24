define(['backbone', 'localStorage'], function(Backbone){

    BlockedUser = Backbone.Model.extend({
        defaults: {
            name: 'Jorgensen'
        },
        localStorage: new Backbone.LocalStorage('blockedUsers')
    });
    
    return BlockedUser;
});