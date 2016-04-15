var app = angular.module("yellowApp", []);

app.controller("YellowController", ["$http", function($http) {
  var vm=this;
  vm.usersList = [];

  vm.getUsers = function() {
    $http.get("/users").then(function(response) {
     console.log('created users');
    }); //  $http.get
    vm.updateUsers();
  };  //  $scope.getUsers

  vm.updateUsers = function() {
    $http.get("/all").then(function(response) {
      vm.usersList = response.data;
    });
  };

  vm.deleteUser = function(user) {
    // console.log("Hello", user._id);
    // This will delete the user from the database, but not from the DOM -> use Array.splice()
    $http.delete("/deleteUsers/" + user._id).then(function(response) {
      console.log("Deleted");
    vm.updateUsers();
    }); //  $http.delete
  };  //  $scope.deleteUser

  vm.updateUsers();

}]); // controller
