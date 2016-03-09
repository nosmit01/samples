'use strict';

function DateRangeService($http, $q, $location, $firebaseAuth, $firebaseObject, $firebaseArray, AppSettings, moment, lodash) {
    const service = {};
    let queryString = $location.search();

    // set default date
    let date = moment().startOf('day').valueOf();

    service.dateRange = {
        type: 'year',
        min: 1420088400000,
        max: 1451624399999 // end at one day after (for firebase's 'endAt')
    };

    service.getDateRange = function(){
        let dateRangePromises = [];

        // if query string available, then set dateRange with query string
        lodash.each($location.search(), function(val, key){
            if(key.search('rangeType') !== -1){
                dateRangePromises.push(service.dateRange.type = val);
            }else if(key.search('rangeMin') !== -1){
                dateRangePromises.push(service.dateRange.min = val);
                date = val;
            }else if(key.search('rangeMax') !== -1){
                dateRangePromises.push(service.dateRange.max = val);
            }
        });

        return $q.all(service.dateRange);
    };


    // get and set dateRange
    service.setDateRange = function(type, mode, customDate, updateQueryString){
        if(updateQueryString){
            queryString = $location.search();
        }

        date = mode ? moment(date)[mode](1, type).valueOf() : parseInt(date);

        switch (type) {
            case 'day':
                service.dateRange = {
                    type: 'day',
                    min: date,
                    max: moment(date).add(1, 'day').valueOf()
                };
                break;
            case 'week':
            case 'month':
            case 'year':
                service.dateRange = {
                    type: type,
                    min: moment(date).startOf(type).valueOf(),
                    max: moment(date).endOf(type).valueOf()
                };
                break;
            case 'custom':
                if(customDate){
                    date = moment(customDate).valueOf();
                    service.dateRange = {
                        type: 'day',
                        min: moment(customDate).valueOf(),
                        max: moment(customDate).add(1, 'day').valueOf()
                    };
                }else{
                    service.dateRange = {
                        type: 'day',
                        min: date,
                        max: moment(date).add(1, 'day').valueOf()
                    };
                }
                break;
        }

        // update query strings
        $location.search(queryString)
        $location.search('rangeType', service.dateRange.type);
        $location.search('rangeMin', service.dateRange.min);
        $location.search('rangeMax', service.dateRange.max);

        return $q.when('done');
    };

    return service;
}

export default {
    name: 'DateRangeService',
    fn: DateRangeService
};

