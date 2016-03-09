'use strict';

function DashboardCtrl($scope, $state, $location, $timeout, $firebaseObject, $firebaseArray, AppSettings, DateRangeService, ReservationsService, FilterService, ExportService, dateRange, userRole, moment, lodash) {
    'ngInject';

    let baseRef = new Firebase(AppSettings.firebaseURL);

    // ViewModel
    const vm = this;
    vm.loading = true;
    vm.userRole = userRole.role;
    vm.reservations = '';
    vm.view = 'list';
    vm.exportHeader = ExportService.exportHeader;
    vm.filters = {
        selected: []
    };

    // set date range
    DateRangeService.setDateRange(dateRange.type);
    vm.dateRange = dateRange;

    // watch for changes in reservations and update UI items (groupedReservations, customerProfilePics, exportArray)
    $scope.$watch('vm.reservations', function( newValue, oldValue ) {
        if(newValue !== oldValue){
            vm.groupedReservations = ReservationsService.reservationsGrouped(newValue);
            ReservationsService.customerProfilePics(newValue).then(function(resp){
                vm.customerProfilePics = lodash.object(lodash.pluck(resp, '$id'), resp);
            });

            // export settings
            vm.exportArray = ExportService.exportArray(newValue);
            vm.loading = false;
        }
    });

    // check user role
    vm.checkRole = function(rolesArray){
        if(rolesArray){
            if(rolesArray.indexOf(vm.userRole) > -1){
                return true;
            }
        }
        return false;
    };

    // get all valets by valet company regardless of date range
    vm.valets = $firebaseObject(baseRef.child('valets').orderByChild('valetCompanyRef').equalTo(AppSettings.valetCoRef));
    vm.valets.$loaded().then(function(resp){
        return ReservationsService.valetProfilePics(resp)
    }).then(function(resp){
        vm.valetProfilePics = lodash.object(lodash.pluck(resp, '$id'), resp);
    });

    // get filters and reservations
    //let filters = new ReservationsService.reservationsList(ReservationsService.reservationsQuery(dateRange, 0).ref());
    let filters = $firebaseArray(ReservationsService.reservationsQuery(dateRange, 0).ref());
    filters.$loaded().then(function(resp) {
        vm.filters = FilterService.buildFilters(resp);
        vm.filters.selected = FilterService.setFilter(vm.filters.options);

        // get reservations by date range
        //vm.reservations = new ReservationsService.reservationsList(ReservationsService.reservationsQuery(dateRange).ref());
        vm.reservations = $firebaseArray(ReservationsService.reservationsQuery(dateRange, vm.filters.selected.length).ref());
    });

    // when user adds filters
    vm.runFilter = function(index, item, subItem, subSubItem){
        vm.loading = true;
        if(item){ // update filters
            $location.search(item.id +'.'+ subItem.id +'.'+ index, subSubItem.id);
            vm.filters.selected = FilterService.setFilter(vm.filters.options);
            lodash.find(vm.filters.options[item.id + 's'].items, {id: subItem.id}).items[index].selected = true;
        }

        // update reservations
        vm.reservations = $firebaseArray(ReservationsService.reservationsQuery(dateRange).ref());
    };

    // when user removes filter
    vm.removeFilter = function(index, item){
        vm.loading = true;
        // update filters
        $location.search(item.id, null);
        vm.filters.selected.splice(index, 1);
        lodash.find(vm.filters.options[item.id.split('.')[0] + 's'].items, {id: item.id.split('.')[1]}).items[item.id.split('.')[2]].selected = false;

        // update reservations
        vm.reservations = $firebaseArray(ReservationsService.reservationsQuery(dateRange, vm.filters.selected.length).ref());
    };

    // when user changes dates
    vm.setDateRange = function(type, mode, customDate){
        vm.loading = true;
        DateRangeService.setDateRange(type, mode, customDate, true);
        vm.dateRange = DateRangeService.dateRange;

        // update reservations
        vm.reservations = $firebaseArray(ReservationsService.reservationsQuery(vm.dateRange, vm.filters.selected.length).ref());
    };
}

export default {
    name: 'DashboardCtrl',
    fn: DashboardCtrl
};
