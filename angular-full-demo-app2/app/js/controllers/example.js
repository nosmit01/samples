'use strict';

function ExampleCtrl() {
  'ngInject';

  // ViewModel
  /*const vm = this;

  var userRef = new Firebase(AppSettings.firebaseURL).child('customers');
  var userObj = $firebaseObject(userRef);

  userObj.$loaded().then(function(resp){
    console.log(resp);
  });

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;
  let test = lodash.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 });
  vm.singleModel = 1;

  vm.radioModel = 'Middle';

  vm.checkModel = {
    left: false,
    middle: true,
    right: false
  };

  vm.checkResults = [];

  $scope.$watchCollection('checkModel', function () {
    vm.checkResults = [];
    angular.forEach(vm.checkModel, function (value, key) {
      if (value) {
        vm.checkResults.push(key);
      }
    });
  });

  vm.time = new Date ('01/13/15')*/
}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
