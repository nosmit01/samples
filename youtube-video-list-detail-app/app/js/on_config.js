'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('list', {
    url: '/',
    controller: 'ListCtrl as vm',
    templateUrl: 'list.html',
    title: 'Search'
  })
  .state('details', {
    url: '/details/:id/',
    controller: 'DetailsCtrl as vm',
    templateUrl: 'details.html',
    title: 'Details'
  });

  $urlRouterProvider.otherwise('/');
}

export default OnConfig;