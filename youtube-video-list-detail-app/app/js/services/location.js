'use strict';

function LocationService($q, $window) {

    const service = {};

    // get user position
    service.getPosition = function(search) {
        var deferred = $q.defer();
        // use user's location
        if(search.useMyLocation){
            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve({lat: position.coords.latitude, lng: position.coords.longitude});
                    },
                    function (err) {
                        deferred.reject(err);
                    });
            }
        }else{ // use user entered location
            var geocoder = new google.maps.Geocoder();
            var address = search.location;

            geocoder.geocode( { 'address': address}, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    deferred.resolve({lat: latitude, lng: longitude});
                }
            });
        }

        return deferred.promise;
    };

    return service;
}

export default {
    name: 'LocationService',
    fn: LocationService
};