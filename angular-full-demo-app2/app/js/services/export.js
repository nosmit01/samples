'use strict';

function ExportService($http, lodash, moment) {
    const service = {};

    service.exportHeader = [
        'Car Color',
        'Car Make',
        'Car Bodystyle',
        'License Plate',
        'Create Time',
        'First Name',
        'Last Name',
        'Storage Fee',
        'Final Price',
        'Location',
        'Status'
    ];

    service.exportArray = function(reservations){
        let exportArr = [];
        lodash.each(reservations, function(r){
            exportArr.push({
                carColor: r.cars_color,
                carMake: r.cars_make,
                carBodyStyle: r.cars_bodyStyle,
                carLicensePlate: r.cars_licensePlate,
                createTime: r.reservations_createTime,
                customerFirst: r.customers_firstName,
                customerLast: r.customers_lastName,
                extendedStorageFee: formatData(r.reservations_extendedStorageFee, 'currency'),
                finalPrice: formatData(r.reservations_finalPrice, 'currency'),
                location: r.locations_address,
                status: formatData(r.reservations_status)
            })
        });

        return exportArr;
    };

    function formatData(data, type){
        if(data){
            if(type === 'currency'){
                return data /100;
            }else{
                return data.charAt(0).toUpperCase() + data.slice(1);
            }
        }else{
            return '--';
        }
    };

    return service;

}

export default {
    name: 'ExportService',
    fn: ExportService
};