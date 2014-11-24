define(['jquery', 'async!http://maps.google.com/maps/api/js?sensor=false'], function() {
    
    var geo = function(){        

        var geocoder = new google.maps.Geocoder();

            x = navigator.geolocation;
            x.getCurrentPosition(succes, fail);

            function succes(position){            
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                codeLatLng(lat, long);
            }

            function fail(){
                alert('error');
            }

            function codeLatLng(lat, lng) {

                var latlng = new google.maps.LatLng(lat, lng);

                geocoder.geocode({'latLng': latlng}, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $('#geo').html(results[1].formatted_address);
                    }   else { // result [1] == null
                            alert("No results found");
                        }

                }   else { // status != OK
                            alert("Geocoder failed due to: " + status);
                            }
                });
            }
    }
    
    return geo;
});