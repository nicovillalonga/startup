define('director', function (){
    
    var Director = function(name){
        this.name = name;
        this.quotes = [];
    }
    
    
    Director.prototype = Director;
    
    Director.prototype.setQuotes = function (args) {
        for(var i in args){
            this.quotes.push(args[i]);
        }
    };
    
    Director.prototype.speak = function () {
        return this.quotes.toString();
    };
    
    
    return Director;
});