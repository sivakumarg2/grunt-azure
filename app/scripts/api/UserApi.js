(function () {
    'use strict';

    angular.module('ima-app').factory('UserApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
      var users = $resource(API.users + "/:id",
        { id: '@id' },
        {
            get: { method: 'GET' },
            save: { method: 'POST',headers : {'Content-Type': 'application/x-www-form-urlencoded'} },
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: true },
            remove: { method: 'DELETE' }
        }
      );

      return users;
    };

})();