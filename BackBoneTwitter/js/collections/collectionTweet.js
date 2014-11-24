define(['backbone', 'models/tweet'], function(Backbone, Tweet){
    
    Tweets = Backbone.Collection.extend(
    {        
        initialize: function(url){
            this.url = url;
        },
        
        model: Tweet,
        
        /*url: function(){
            return this.options
        }*/
    });
    
    return Tweets;
}); 