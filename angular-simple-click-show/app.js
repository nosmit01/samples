angular.module('sample', [])

.controller('LibraryCtrl', ['$scope', function($scope) {
    $scope.categories = categories;
    $scope.selectedCategories = [];
    $scope.inputString = '';
    $scope.searchString = '';

    $scope.showProps = function(category){
      $scope.category = category;
    };

    $scope.addCategory = function(category){
      $scope.selectedCategories.push(category);
    };

    $scope.searchCategories = function(){
      $scope.searchString = $scope.inputString;
    };
}]);



