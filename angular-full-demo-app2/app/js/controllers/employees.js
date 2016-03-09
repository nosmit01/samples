'use strict';

function EmployeesCtrl($scope, $location, $timeout, lodash, AppSettings, FilterService, userRole) {
    'ngInject';

    // ViewModel
    const vm = this;
    vm.userRole = userRole;
}

export default {
    name: 'EmployeesCtrl',
    fn: EmployeesCtrl
};
