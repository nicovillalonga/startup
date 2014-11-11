$(document).ready(function(){
    
    var data;
    
    $.ajax({
        type: "get",
        url: "/js/profile.json",
        dataType: "json",
        async: false,
        success: function(prof) {
            data = prof;
        },
        error: function(err){
            console.log(err);
        }
    });
    
    Handlebars.registerHelper('location', function(locationn){
        return locationn.pais + ' - ' + locationn.ciudad;
    });
    
    var template = Handlebars.compile( $('#template').html() );
    $('#templateContent').html( template(data) );
        
});