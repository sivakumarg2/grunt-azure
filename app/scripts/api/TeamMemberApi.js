(function () {
    'use strict';

    angular.module('ima-app').factory('TeamMemberApi', Implementation);
    Implementation.$inject = ['$resource', 'API'];

    function Implementation($resource, API) {
      var models = $resource(API.teamMembers + '/:id',
        {idea_id:'@idea_id', id: '@id'},
        {
            query: {method: 'GET', isArray:true},
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