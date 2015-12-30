(function () {
  'use strict';

  angular.module('ima-app').service('UserService', Implementation);
  Implementation.$inject = ['API', '$rootScope','$cookieStore','UserApi','AuthService','$location'];

  function Implementation(API, $rootScope,$cookieStore,UserApi,AuthService,$location) {
    var cachedUsers = []

    // Public Methods
    function GetUser(id) {
      return UserApi.get({id: id}).$promise;
    }

    function GetUsers() {
      return cachedUsers;
    }

    var handleAuthenticationResponse = function(user){
          $cookieStore.put('ima-app-token',user.token);
          $cookieStore.put('ima-app-usrid',user.user_id);
          $rootScope.currentUserId = user.user_id;
          GetCurrentUser();
    }

    var GetCurrentUser = function(){

      if(GetCurrentUserId()){
        $rootScope.currentUserId = GetCurrentUserId()
        UserApi.get({ id: $rootScope.currentUserId }).$promise.then(function (user) {
            $rootScope.currentUser = user;
            $rootScope.currentUser.avatar_url = user.avatar_url;
        })
      } else {
          if ($location.url().indexOf("reset-password") < 0) {
              $location.url("login");
          }          
        //AuthService.initLogin(handleAuthenticationResponse);
      }

    }

    var GetCurrentUserId = function(){
      return $cookieStore.get('ima-app-usrid') || 0;
    }

    var GetCurrentUserToken = function(){
      return $cookieStore.get('ima-app-token') || '';
    }

    function DeleteUser(id) {
      // Send request to remote server

      // if successful
      delete cachedUsers[id];
      return true;

      // if not
      // return false
    }

    function UpdateUser(data) {
        return UserApi.update(data);
    }

    function CreateUser(data) {

      users.post(data).then({
        resolve: function() {
          cachedUsers.push(data);
        },
        reject: function() { },
        always: function() { }
      });


      cachedUsers[data.id] = data;
      return data;
    }

    function SaveUser(params) {
      return UserApi.save(params);
    }

    return {
      getUser: GetUser,
      getCurrentUser: GetCurrentUser,
      getUsers: GetUsers,
      deleteUser: DeleteUser,
      updateUser: UpdateUser,
      createUser: CreateUser,
      getCurrentUserId:GetCurrentUserId,
      getCurrentUserToken:GetCurrentUserToken,
      saveUser: SaveUser
    }
  };

})()