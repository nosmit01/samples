'use strict';

function AccountCtrl($scope, $location, $timeout, lodash, AppSettings, FilterService, userRole) {
    'ngInject';

    // ViewModel
    const vm = this;
    vm.userRole = userRole;
}

export default {
    name: 'AccountCtrl',
    fn: AccountCtrl
};