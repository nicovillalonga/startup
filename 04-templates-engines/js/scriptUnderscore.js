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
    
    
    var template = _.template( $('#template').html() );
    $('#templateContent').html( template(data) );
           
});