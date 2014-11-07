// class Movie //

function Movie () {
    this.attributes = {};
}

Movie.prototype = {
    
    constructor : Movie,
    
    set : function (attr, value) {
        this.attributes[attr] = value;
    },
    
    get : function (attr) {
        return this.attributes[attr];
    },    
    
    play : function () {
        $.publish(MovieObserver, 'playMovie', {title: this.attributes.title});
    },
    
    stop : function () {
        $.publish(MovieObserver, 'stopMovie', {title: this.attributes.title});
    },
    
    showActors : function () {        
        console.log(JSON.stringify(this.attributes.actors, null, 1));
    }
};



/*
// class Movie modulo //

var Movie = (function () {
    var attributes = {};
    
    var proto = function(){
        Movie.prototype = {
            constructor : Movie
        };
    }
    
    var set = function (attr, value) {
        attributes[attr] = value;
    };
    
    var get = function (attr) {
        return attributes[attr];
    };    
    
    var play = function () {
        $.publish(MovieObserver, 'playMovie', {title: attributes.title});
    };
    
    var stop = function () {
        $.publish(MovieObserver, 'stopMovie', {title: attributes.title});
    };
    
    var showActors = function () {        
        console.log(JSON.stringify(attributes.actors, null, 1));
    }
    
    return {
        proto : proto,
        set : set,
        get : get,
        play : play,
        stop : stop,
        showActors : showActors
    };
    
})();
*/



// class MovieObserver //

function MovieObserver() {
    $.subscribe( "playMovie", this, this.playHandle );
    $.subscribe( "stopMovie", this, this.stopHandle );
    $.subscribe( "downloadMovie", this, this.downloadHandle );
};

MovieObserver.prototype = {
    
    playHandle : function(e){
        console.log('Playing ' + e.data.title);
    },
    
    stopHandle : function(e){
        console.log(e.data.title + ' Stopped');
    },
    
    downloadHandle : function(e){
        console.log( 'Downloading ' + e.data.title );
    }
};



// class Actor //

function Actor (name, lName) {
    this.name = name;
    this.lName = lName;
};

Actor.prototype = {
    
    getName : function(){
        return this.name;
    },
    
    getLName : function() {
        return this.lName;
    }
};



// class DownloadableMovie //

function DownloadableMovie() {
    Movie.call(this);
}

inheritPrototype(DownloadableMovie, Movie.prototype);

DownloadableMovie.prototype.download = function () {
    $.publish(MovieObserver, 'downloadMovie', {title: this.attributes.title});
};



// class Social //

function Social() {
}

Social.prototype = {
    
    share : function (friendName) {
        return 'Sharing ' + this.attributes.title + ' with ' + friendName;
    },
    
    like : function () {
        return this.attributes.title + ' rules!';
    }
};




// implementacion herencia, mixins

Object.create = function (o) {
    
    function F() {
    }
    
    F.prototype = o;
    return new F();
};


function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject);
    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;
}


function extend(destination, source) {
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            destination[prop] = source[prop];
        }
    }
};






// implementacion del pub/sub //

var subscriptions = [];

$.subscribe = function(eventType, subscriber, callback){
    
    if (!(eventType in subscriber)){
        subscriptions[ eventType ] = [];        
    }
    
    subscriptions[ eventType ].push({
        subscriber: subscriber,
        callback: callback
    });
};


$.publish = function( publisher, eventType, data ){

    var event = {
        type: eventType,
        target: publisher,
        data: (data || []),
        result: null
    };
    
    var eventArguments = [ event ].concat( event.data );
    
    $.each(
            subscriptions[ eventType ],
            function( index, subscription ){
                event.result = subscription.callback.apply(
                    subscription.subscriber,
                    eventArguments
                );
                
                return( event.result );
            }
    );
    
    return ( event );
};










// instancia pelicula, prueba publish play y stop

var movieObs = new MovieObserver();

var movie = new Movie();
movie.set('title', 'terminator');
movie.play();
movie.stop();
console.log(movie.get('title'));


// instancia dmovie (hereda de movie)

var dMovie = new DownloadableMovie();
dMovie.set('title', 'Terminator2');
dMovie.download();


// instancia movie y hace uso de interfaz social

var ironMan2 = new Movie();
extend(ironMan2, Social.prototype);

ironMan2.set('title', 'Iron Man 2');
console.log(ironMan2.share('Carlos'));
console.log(ironMan2.like());


//

var Avengers = new Movie();
Avengers.set('title', 'Avengers');

var Captain = new Actor('Cristopher', 'Evans'),
    IronMan = new Actor('Robert', 'Downey'),
    Hulk =new Actor('Mark', 'Ruffalo');

Avengers.set('actors', [Captain, IronMan, Hulk]);
console.log('Actors: ');
console.log(Avengers.showActors());