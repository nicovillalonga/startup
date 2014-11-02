$(document).ready(function(){
    $('#divHidden').fadeIn(2000);
    
    $('.alias').focus();
    
    $('#btn').click(function(){
        $.getJSON('http://bootcamp.aws.af.cm/welcome/Nicolas', function(response){
            $('.alias').val(response.response);
        }).fail(function(){
            $('.alias').val('Error fetching data').css("background-color", "red");
        });
    });
    
    $.ajax({
        url: "http://localhost:3000/search?q=html5",
        type: "get"
    }).success(function(data){
            console.log(data);
            $.each(data, function(){
                $.each(this, function(){
                    $('.sideBar').append('<div class="tweet">' 
                                         + '<label>' + this.text + '</label><br>' 
                                         + '<label>' + this.created_at + '</label><br>' 
                                         + '<a href="' + this.user.profile_image_url + '">http://pbs.twimg.com/profile...jpeg</a><br><br>'
                                         + '</div>');
                });
            });
    }).fail(function(){
        alert('error');
    });
});