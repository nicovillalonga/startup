define(['backbone', 'views/timelineView', 'views/blockedUsView', 'views/detailView', 'views/trendsView', 'views/trendTweets', 'views/detailTrend'],
function(Backbone, TimelineView, BlockedUsView, DetailView, TrendsView, TrendTweets, DetailTrend){

    var Router = Backbone.Router.extend({
                
        routes: {
            // arranca en el blockUser porque no tiene que pedir data... en realidad arranca en timeline
            '' : 'timeline',
            'timeline' : 'timeline',
            'blockedUsers' : 'blockedUsers',
            'detail/:id' : 'detail',
            'detailTrend/:id/:trend' : 'detailTrend',
//            'detail/:id(/:trend)' : 'detailTrend',
            'trendList(/:trendQry)' : 'trendList'
        },
       
        timeline: function(){
            this.view = new TimelineView();
        },
        
        blockedUsers : function(){
            this.view = new BlockedUsView();
        },
        
        /*detail: function(id, trend){
            this.view = new DetailView({idTweet: id, trend: trend});
        },*/
        
        detail: function(id){
            this.view = new DetailView({idTweet: id});
        },
        
        detailTrend: function(id, trend){
            this.view = new DetailTrend({idTweet: id, trendQuery: trend});
        },
        
        trendList: function(trendQry){
            if(trendQry)
                this.view = new TrendTweets({trendQuery: trendQry});
            else
                this.view = new TrendsView();
        }

    });
    
    return Router;
});