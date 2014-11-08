define('main', ['jquery', 'movie', 'director'], function($, Movie, Director){
    
    var alien = new Movie();
    alien.set('title', 'alien');
    
    var ridleyScott = new Director('Ridley Scott');
    ridleyScott.setQuotes(['Cast is everything.', 'Do what ...']);
    alien.set('director', ridleyScott); 
    console.log(alien.get('director').speak());
    
    $('#response').append(alien.get('director').speak());
});