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
    
    
    var compile = dust.compile( $('#template').html(), 'template' );
    dust.loadSource(compile);
    dust.render('template', data, function(err, out){
        $('#templateContent').html(out);
    });
    
});