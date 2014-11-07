$(document).ready(function(){
    $('.divHidden').fadeIn(2000);
    
    $('.alias').focus();
    
    $('#btn').click(function(){
        var nombre = $('.alias').val();
        if (nombre !== "")
        {
            $.getJSON('http://botcamp.aws.af.cm/welcome/' + nombre, function(response){
                $('.response').append('<p>'+ response.response +'</p>');
                }).fail(function(){
                    var msg = 'Error fetching data';
                    $('.response').append('<p>'+ msg +'</p>').css("background-color", "red");
                    
                    //$('.alias').val('Error fetching data').css("background-color", "red");
                });
        }
        else
            alert('ingrese su nombre');
    });
    
    $.ajax({
        url: "http://localhost:3000/search?q=html5",
        type: "get"
    }).success(function(data){
            console.log(data);
            $.each(data.statuses, function(i, val){
                /*
                $.each(this, function(){
                    $('.sideBar').append('<div class="tweet">' 
                                         + '<label>' + this.text + '</label><br>' 
                                         + '<label>' + this.created_at + '</label><br>' 
                                         + '<a href="' + this.user.profile_image_url + '">http://pbs.twimg.com/profile...jpeg</a><br><br>'
                                         + '</div>');
                });
            });
        */
                        $('.sideBar').append('<div class="tweet">' 
                                                 + '<label>' + val.text + '</label><br>' 
                                                 + '<label>' + this.created_at + '</label><br>' 
                                                 + '<a href="' + this.user.profile_image_url + '">http://pbs.twimg.com/profile...jpeg</a><br><br>'
                                                 + '</div>');
               
                    });
    }).fail(function(){
        alert('error');
    });
});