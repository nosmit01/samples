'use strict';

function UserService($q, AppSettings) {

    const service = {};

    let firebaseRef = new Firebase(AppSettings.firebaseURL);

    service.get = function() {
        let defer = $q.defer();
        firebaseRef.child('/dashboardUsers/' + AppSettings.userId).on('value', function(user) {
            let val = user.val();
            defer.resolve(val);
        });

        return defer.promise;
    };

    return service;

}

export default {
    name: 'UserService',
    fn: UserService
};