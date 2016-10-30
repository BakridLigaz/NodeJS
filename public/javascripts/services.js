var app = angular.module("app");
app.service("userService",function($http){
   return {
       getUsers: function(){
          return $http.get("/users");
       },
       deleteUser: function(id){
           return $http.delete("/user/"+id);
       },
       addUser: function(user){
           return $http.post("/user/",user);
       }
   }
});
