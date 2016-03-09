'use strict';

function MainCtrl($scope, $state, $location, $timeout, lodash, AppSettings, FilterService) {
    'ngInject';

    // ViewModel
    const vm = this;

    $state.go('index.dashboard');
}

export default {
    name: 'MainCtrl',
    fn: MainCtrl
};