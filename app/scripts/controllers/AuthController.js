(function () {
    'use strict';

    angular.module('ima-app').controller('AuthController', Implementation);
    Implementation.$inject = ['$scope', '$state', '$stateParams', '$cookieStore', 'AuthService','UserService','$rootScope', '$location'];

    function Implementation($scope, $state, $stateParams, $cookieStore, AuthService, UserService, $rootScope, $location) {

      $scope.reset = null;
      $scope.register = null;
      $scope.login = {};
      $scope.password_check = "";

      $scope.cancel = function(modal){
        modal.$dismiss("Cancelled");
      }
	alert("hhhh:testing:1:1:3");
      $scope.loginUser = function (modal) {
        var params = $.param($scope.login);
        AuthService.login(params).then(function(response){
          if(response.token){
            $scope.message = "Success!";
            $scope.message_class = "has-success";
            ///ToDo remove this code while check-in
            $cookieStore.put('ima-app-token', response.token);
            $cookieStore.put('ima-app-usrid', response.user_id);
            $rootScope.currentUserId = response.user_id;
            if ($rootScope.currentUser)
            {
                $rootScope.currentUser.avatar_url = response.avatar_url;
            }            
            $state.go("imethodLite");

          }else{
            $scope.message_class = "has-error";
            $scope.message = response.message;
          }
        })
        .catch(function(error){
            $scope.message_class = "has-error";
            $scope.message = "There was a problem with your request.  Please try again";
        });
      };

      $scope.submitRegistration = function (modal) {
        $scope.register.company_id = 1;
        var params = $.param($scope.register);
        UserService.saveUser(params).$promise.then(function(response){
          if(response.id){
              //$scope.message = "Welcome!  Please log in...";
              $scope.login = { email: $scope.register.email, password: $scope.register.encrypted_password };
              $scope.register = {};
              $scope.loginUser();
          }
        })
        .catch(function (error) {
            $scope.message_class = "has-error";
            $scope.message = error.data;
        });
      }

      $scope.submitResetPassword = function(modal){
          AuthService.recoverPassword($scope.reset).then(function(response){
            if(response.success){
              $scope.message = response.message;
              $scope.reset.email = "";
            }
          })
          .catch(function (error) {
              $scope.message_class = "has-error";
              $scope.err_message = error.data;
          });
      }

		      $scope.submitChangePassword = function (modal) {          
          $scope.reset.reset_password_token = $location.search()["tk"];
          console.log("reset password:", $scope.reset);
          if ($scope.reset.encrypted_password != $scope.reset.confirm_password) {
              $scope.message = "New password does not match with confirm password";
          }
          else {
              AuthService.resetPassword($scope.reset).then(function (response) {
                  if (response.success) {
                      $scope.message = response.message;
                      $scope.reset = null;
                  }
              })
             .catch(function (error) {
                 $scope.message_class = "has-error";
                 $scope.message = error.data;
             });
          }         
      }
      $scope.initRegister = function(){
        $scope.register = {};
        $scope.login = null;
        $scope.reset = null;
      }

      $scope.initLogin = function(){
        $scope.reset = null;
        $scope.register = null;
        $scope.login = {};
      }

      $scope.initReset = function(){
        $scope.reset = {};
        $scope.register = null;
        $scope.login = null;
      }

    }

})();