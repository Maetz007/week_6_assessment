var myApp = angular.module('myApp', []);

myApp.controller('deptOfHeroes', ['$scope', '$http', function($scope, $http){

  $scope.powerTypes = ['Invisibility', 'Flight', 'Super Speed', 'Heat Vision', 'Super Strength', 'Accelerated Healing', 'Power Blast', 'Animal Affinity'];
  $scope.showHeroes = [];

  $scope.displayHeroes = function(){
  $http({
    method: 'GET',
    url: '/getHeroes',}).then(function(response){
      $scope.showHeroes = response.data;
    }); // end http GET
  }; // end display heroes

  $scope.addHero = function(){
      var heroObject = {
        hero_alias: $scope.aliasInput,
        hero_firstName: $scope.firstNameInput,
        hero_lastName: $scope.lastNameInput,
        hero_city: $scope.cityInput,
        hero_power: $scope.powerTypeInput
      }; // end addHero

      $http({
        method: 'POST',
        url: '/heroAdded',
        data: heroObject
      }); // end POST

    $scope.aliasInput = '';
    $scope.firstNameInput = '';
    $scope.lastNameInput = '';
    $scope.cityInput = '';
    $scope.powerTypeInput = '';
  }; // end addHero

  $scope.deleteHero = function(index){
  var heroId = {
    id: $scope.showHeroes[index]._id
  }; // end heroId
  console.log("in $scope.deleteHero ", heroId.id);
    $http({
      method: 'POST',
      url: '/heroRemove',
      data: heroId
    }); // end http delete
    $scope.showHeroes.splice(index, 1);
}; // end deleteHero

}]);  // end controller deptOfHeroes
