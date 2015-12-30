(function () {
    'use strict';

    angular.module('ima-app').factory('SolutionApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
      var models = $resource(API.solutions + "/:id",
        {id:'@id',idea_id:'@idea_id'},
        {
            get: {method: 'GET'},
            save: {method:'POST'},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
        }
      );

      var api = {
        request:models
      }

      return api;
    };

})();
