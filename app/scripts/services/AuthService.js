(function () {
    'use strict';

    angular.module('ima-app').service('AuthService', Implementation);
    Implementation.$inject = ['$uibModal', '$rootScope','$cookieStore', 'AuthApi'];

    function Implementation($uibModal,$rootScope,$cookieStore,AuthApi) {
      
      var InitLogin = function(callback){
        var instance = $uibModal.open({
            templateUrl:'views/partials/login-modal.html',
            controller:'AuthController',
            size:'login'
        });
        return instance.result.then(callback);
      }

      var Login = function(credentials){
        console.log("Login User",credentials);
        return AuthApi.authenticate.login(credentials).$promise;
      }

      var RecoverPassword = function(params){
        return AuthApi.recoverPassword.recover($.param(params)).$promise;
      }

      var ResetPassword = function (params) {
          return AuthApi.resetPassword.reset($.param(params)).$promise;
      }

      var api = {
        login:Login,
        recoverPassword:RecoverPassword,
        initLogin: InitLogin,
        resetPassword: ResetPassword
      }

      return api;

    };

})();