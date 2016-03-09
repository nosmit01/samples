'use strict';

function PricingCtrl($scope, $location, $timeout, lodash, AppSettings, FilterService, userRole) {
    'ngInject';

    // ViewModel
    const vm = this;
    vm.userRole = userRole;
}

export default {
    name: 'PricingCtrl',
    fn: PricingCtrl
};
