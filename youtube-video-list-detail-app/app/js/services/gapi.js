'use strict';

function GapiService($window, $q) {

    // wait for google api to load
    var deferred = $q.defer();
    $window.initGapi = function(){
        deferred.resolve(gapi);
    };

    return deferred.promise;
}

export default {
    name: 'GapiService',
    fn: GapiService
};