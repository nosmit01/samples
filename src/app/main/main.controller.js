(function() {
  'use strict';

  angular
    .module('samples')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.creationDate = 1441285031402;
    vm.awesomeThings = webDevTec.getTec();

    angular.forEach(vm.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  }
})();
