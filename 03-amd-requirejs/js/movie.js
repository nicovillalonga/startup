define('movie', ['director'], function (Director) {
    
    var Movie = function () {
    this.attributes = {'title': 'asd'};
    };
    
    Movie.prototype = Movie;
    
    Movie.prototype.set = function (attr, value) {
        this.attributes[attr] = value;
    };

    Movie.prototype.get = function (attr) {
        return this.attributes[attr];
    };

    Movie.prototype.play = function () {
        console.log('palying ' + this.attributes.title);
        //$.publish(MovieObserver, 'playMovie', {title: this.attributes.title});
    };

    Movie.prototype.stop = function () {
        console.log(this.attributes.title + 'stopped');
        //$.publish(MovieObserver, 'stopMovie', {title: attributes.title});
    },

    Movie.prototype.showActors = function () {        
        console.log(JSON.stringify(attributes.actors, null, 1));
    }
    
    return Movie;
});



/*
Movie.prototype = {

        constructor : Movie,

        set : function (attr, value) {
            this.attributes[attr] = value;
        },

        get : function (attr) {
            return this.attributes[attr];
        },    

        play : function () {
            console.log('palying ' + this.attributes.title);
            //$.publish(MovieObserver, 'playMovie', {title: this.attributes.title});
        },

        stop : function () {
            console.log(this.attributes.title + 'stopped');
            //$.publish(MovieObserver, 'stopMovie', {title: attributes.title});
        },

        showActors : function () {        
            console.log(JSON.stringify(attributes.actors, null, 1));
        }
    };
*/