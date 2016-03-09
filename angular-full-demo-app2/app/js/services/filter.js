'use strict';

function FilterService($http, $q, $location, $firebaseAuth, $firebaseObject, $firebaseArray, DateRangeService, AppSettings, moment, lodash) {
    const service = {};

    // build filters for filters dropdown
    service.buildFilters = function(reservations){
        let filters = {
            options: {
                cars: {
                    id: 'car',
                    ref: 'carRef',
                    display: 'Car',
                    items: [
                        {
                            id: 'make',
                            roles: ['valet_co'],
                            display: 'Car Make',
                            items: []
                        },
                        {
                            id: 'color',
                            roles: ['admin', 'valet', 'valet_co'],
                            display: 'Car Color',
                            items:[]
                        },
                        {
                            id: 'bodyStyle',
                            roles: ['admin', 'valet'],
                            display: 'Car Body',
                            items:[]
                        },
                        {
                            id: 'registrationState',
                            roles: ['admin', 'valet', 'valet_co'],
                            display: 'Registration State',
                            items:[]
                        }
                    ]
                },
                locations: {
                    id: 'location',
                    ref: 'locationRef',
                    display: 'Location',
                    items: [
                        {
                            id: 'name',
                            roles: ['admin', 'valet', 'valet_co'],
                            display: 'Name',
                            items: []
                        },
                        {
                            id: 'category',
                            roles: ['admin', 'valet', 'valet_co'],
                            display: 'Category',
                            items:[]
                        }
                    ]
                }
            },
            selected: []
        };

        lodash.each(filters.options, function(option, key){
            lodash.each(option.items, function(items){
                lodash.each(reservations, function(reservation){
                    lodash.each(reservation, function(r, k){
                        if(k.split('_')[0] === key && k.split('_')[1] === items.id){
                            if(!lodash.find(items.items, {id: r})){
                                items.items.push({id: r, display: r});
                            }
                        }
                    });
                });
            });
        });

        return filters;
    };

    // set filter selected filters for display on filter bar
    service.setFilter = function(filterOptions){
        let filters = [];

        lodash.each($location.search(), function(val, key){
            if(key.search('range') === -1){ // don't add query string ranges to filters (rangeType, rangeMin, rangeMax)
                let category = key.split('.')[0] + ' ' + key.split('.')[1].replace(/([A-Z])/g, ' $1');
                lodash.find(filterOptions[key.split('.')[0] + 's'].items, {id: key.split('.')[1]}).items[key.split('.')[2]].selected = true;

                if(lodash.isArray(val)){
                    lodash.each(val, function(v){
                        filters.push({
                            id: key,
                            category: category,
                            display: v
                        });
                    });
                }else{
                    filters.push({
                        id: key,
                        category: category,
                        display: val
                    });
                }
            }
        });

        return filters;
    };

    // run filter on reservations when user selects or removes filter
    service.runFilter = function(reservation){
        //console.log(reservation);
        let bool = false;

        lodash.each($location.search(), function(val, key){
            if(key.split('.')[1]){ // ignore date ranges
                let field = key.split('.')[0] +'s_'+ key.split('.')[1]; // ie. cars_make
                //console.log(field, val)
                bool = reservation[field] === val;
                if(bool){ // if field matches query string, exit loop
                    return false;
                }
            }

        });

        return bool;
    };

    return service;
}

export default {
    name: 'FilterService',
    fn: FilterService
};

