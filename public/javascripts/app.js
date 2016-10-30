var app = angular.module("app",[]);

app.controller("MainCtrl",function($scope,userService){
    $scope.getUsers = function() {
        userService.getUsers()
            .then(
                function (result) {
                    $scope.listUser = result.data;
                }
            );
    };
    $scope.addUser = function(user){
        userService.addUser(user)
            .then(
              function(result){
                  console.log(result.data);
                  $scope.getUsers();
              }
            );
    };
    $scope.deleteUser = function(id){
        userService.deleteUser(id)
            .then(
                function(result){
                    console.log(result.data);
                    $scope.getUsers();
                }
            )
    };
    $scope.getUsers();
});