define(['backbone', 'models/blockedUser', 'localStorage'], function(Backbone, BlockedUser){
    
    BlockedUsers = Backbone.Collection.extend(
    {        
        model: BlockedUser,
        localStorage: new Backbone.LocalStorage('blockedUsers')
    });
    
    return BlockedUsers;
});