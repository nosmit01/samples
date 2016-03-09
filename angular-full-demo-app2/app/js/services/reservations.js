'use strict';

function ReservationsService($http, $q, $state, $location, $firebaseAuth, $firebaseObject, $firebaseArray, AppSettings, FilterService, DateRangeService, moment, lodash) {
    const service = {};
    let baseRef = new Firebase(AppSettings.firebaseURL);

    service.reservationsQuery = function(dateRange, filter){
        let reservations = new Firebase.util.NormalizedCollection(
            [baseRef.child("/reservationsArchive").orderByChild('createTime').startAt(parseInt(dateRange.min)).endAt(parseInt(dateRange.max)), "reservations"],
            [baseRef.child("/cars"), "cars", "reservations.carRef"],
            [baseRef.child("/customers"), "customers", "reservations.customerRef"],
            [baseRef.child("/customersProfilePictures"), "customerProfilePicture", "reservations.customerRef"],
            [baseRef.child("/locations"), "locations", "reservations.locationRef"]
        ).select(
            {key: "reservations.createTime", alias: "reservations_createTime"},
            {key: "reservations.extendedStorageFee", alias: "reservations_extendedStorageFee"},
            {key: "reservations.finalPrice", alias: "reservations_finalPrice"},
            {key: "reservations.status", alias: "reservations_status"},
            {key: "reservations.greetValetRef", alias: "reservations_greetValetRef"},
            {key: "reservations.parkValetRef", alias: "reservations_parkValetRef"},
            {key: "reservations.returnValetRef", alias: "reservations_returnValetRef"},
            {key: "reservations.surveyValetRef", alias: "reservations_surveyValetRef"},
            "reservations.carRef",
            {key: "cars.color", alias: "cars_color"},
            {key: "cars.make", alias: "cars_make"},
            {key: "cars.bodyStyle", alias: "cars_bodyStyle"},
            {key: "cars.licensePlate", alias: "cars_licensePlate"},
            "reservations.customerRef",
            {key: "customers.firstName", alias: "customers_firstName"},
            {key: "customers.lastName", alias: "customers_lastName"},
            "reservations.locationRef",
            {key: "locations.name", alias: "locations_name"},
            {key: "locations.address", alias: "locations_address"}
        );

        if(filter !== 0){
            reservations.filter(function(data, key, priority) {
                return FilterService.runFilter(data)
            });
        }

        return reservations;
    };

    service.reservationsGrouped = function(resp){
        let reservations = resp;
        let type, group, sort = lodash.sortBy(reservations, function(r){
            return r.reservations_createTime;
        });

        switch (DateRangeService.dateRange.type) {
            case 'day':
                type = 'hour';
                break;
            case 'week':
                type = 'day';
                break;
            case 'month':
                type = 'week';
                break;
            case 'year':
                type = 'month';
                break;
            case 'custom':
                type = 'day';
                break;
        }

        group = lodash.groupBy(sort, function(s) {
            return moment(s.reservations_createTime).startOf(type).valueOf();
        });

        return group;
    };

    service.customerProfilePics = function(reservations){
        let customerPromises = [];
        lodash.each(reservations, function(r){
            let customerPic = $firebaseObject(baseRef.child('customersProfilePictures/' + r.customerRef));
            customerPromises.push(
                customerPic.$loaded().then(function(resp){
                    return resp
                })
            )
        });

        return $q.all(customerPromises);
    };

    service.valetProfilePics = function(valets){
        let valetPromises = [];
        lodash.each(valets, function(v, k){
            if(k.indexOf('$') === -1){
                let valetPic = $firebaseObject(baseRef.child('valetsProfilePictures/' + k));
                valetPromises.push(
                    valetPic.$loaded().then(function(resp){
                        return resp
                    })
                )
            }
        });

        return $q.all(valetPromises);
    };

    /*service.reservationsList = $firebaseArray.$extend({
        valet: function() {
            let reservations = this.$list;

            let type, group, sort = lodash.sortBy(reservations, function(r){
                return r.reservations_createTime;
            });

            switch (DateRangeService.dateRange.type) {
                case 'day':
                    type = 'hour';
                    break;
                case 'week':
                    type = 'day';
                    break;
                case 'month':
                    type = 'week';
                    break;
                case 'year':
                    type = 'month';
                    break;
                case 'custom':
                    type = 'day';
                    break;
            }

            group = lodash.groupBy(sort, function(s) {
                return moment(s.reservations_createTime).startOf(type).valueOf();
            });

            return group;
        }
    });*/


    return service;
}

export default {
    name: 'ReservationsService',
    fn: ReservationsService
};

