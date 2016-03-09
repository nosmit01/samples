'use strict';

function NavCtrl($scope, $location, $timeout, lodash, AppSettings, FilterService, UserService) {
    'ngInject';

    // ViewModel
    const vm = this;
    UserService.get().then(function(resp){
        vm.userRole = resp.role;
    });

}

export default {
    name: 'NavCtrl',
    fn: NavCtrl
};