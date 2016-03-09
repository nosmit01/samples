'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('login', {
    url: '/login',
    controller: 'LoginCtrl as vm',
    templateUrl: 'login.html',
    title: 'Login'
  })
  .state('index', {
    url: '/',
    controller: 'MainCtrl as vm',
    template: '<ui-view/>',
    resolve:{
      userRole: function(UserService){
        return UserService.get().then(function(resp){
          return resp;
        });
      }
    }
  })
  .state('index.dashboard', {
    url: 'dashboard',
    controller: 'DashboardCtrl as vm',
    templateUrl: 'dashboard.html',
    title: 'Dashboard',
    resolve:{
      dateRange: function(DateRangeService){
        return DateRangeService.getDateRange().then(function(resp){
          return resp;
        });
      }
    }
  })
  .state('index.pricing', {
    url: 'pricing',
    controller: 'PricingCtrl as vm',
    templateUrl: 'pricing.html',
    title: 'Pricing'
  })
  .state('index.employees', {
    url: 'employees',
    controller: 'EmployeesCtrl as vm',
    templateUrl: 'employees.html',
    title: 'Employees'
  })
  .state('index.account', {
    url: 'account',
    controller: 'AccountCtrl as vm',
    templateUrl: 'account.html',
    title: 'Account'
  });

  $urlRouterProvider.otherwise('/');
}

export default OnConfig;