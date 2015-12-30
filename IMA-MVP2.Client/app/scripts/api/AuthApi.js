(function () {
    'use strict';

    angular.module('ima-app').factory('AuthApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
      var auth = $resource(API.login,
        {},
        {
            login: { 
                method: 'POST',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        }
      );

      var recoverPassword = $resource(API.recover,
        {},
        {
            recover: { 
                method: 'POST',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        }
      );

        var resetPassword = $resource(API.reset,
        {},
        {
            reset: {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        });


      var api = {
        authenticate:auth,
        recoverPassword: recoverPassword,
        resetPassword: resetPassword,
      }

      return api;
    };

})();
